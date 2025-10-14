import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MetaUpgradesPanel from './MetaUpgradesPanel.vue'
import { useMetaUpgradesStore } from '@/stores/metaUpgrades'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('MetaUpgradesPanel', () => {
  beforeEach(() => {
    localStorageMock.clear()
    setActivePinia(createPinia())
  })

  it('should render the component', () => {
    const wrapper = mount(MetaUpgradesPanel)
    expect(wrapper.exists()).toBe(true)
  })

  it('should display overlay and panel', () => {
    const wrapper = mount(MetaUpgradesPanel)
    expect(wrapper.find('.meta-upgrades-overlay').exists()).toBe(true)
    expect(wrapper.find('.meta-upgrades-panel').exists()).toBe(true)
  })

  it('should display "Meta Upgrades" title', () => {
    const wrapper = mount(MetaUpgradesPanel)
    expect(wrapper.find('.panel-header h2').text()).toBe('Meta Upgrades')
  })

  it('should display close button', () => {
    const wrapper = mount(MetaUpgradesPanel)
    const closeButton = wrapper.find('.close-button')
    expect(closeButton.exists()).toBe(true)
    expect(closeButton.text()).toBe('×')
  })

  it('should display reset all button', () => {
    const wrapper = mount(MetaUpgradesPanel)
    const resetButton = wrapper.find('.reset-button')
    expect(resetButton.exists()).toBe(true)
    expect(resetButton.text()).toBe('Reset All')
  })

  it('should emit close event when close button is clicked', async () => {
    const wrapper = mount(MetaUpgradesPanel)
    await wrapper.find('.close-button').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('close')?.length).toBe(1)
  })

  it('should emit close event when clicking overlay', async () => {
    const wrapper = mount(MetaUpgradesPanel)
    await wrapper.find('.meta-upgrades-overlay').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('should not emit close event when clicking inside panel', async () => {
    const wrapper = mount(MetaUpgradesPanel)
    await wrapper.find('.meta-upgrades-panel').trigger('click')
    expect(wrapper.emitted('close')).toBeFalsy()
  })

  it('should display all meta upgrades', () => {
    const wrapper = mount(MetaUpgradesPanel)
    const store = useMetaUpgradesStore()

    const upgradeItems = wrapper.findAll('.upgrade-item')
    expect(upgradeItems.length).toBe(store.upgradeLevels.length)
  })

  it('should display upgrade names', () => {
    const wrapper = mount(MetaUpgradesPanel)
    const store = useMetaUpgradesStore()

    const upgradeNames = wrapper.findAll('.upgrade-name')
    upgradeNames.forEach((nameEl, index) => {
      expect(nameEl.text()).toBe(store.upgradeLevels[index].name)
    })
  })

  it('should display current level and max level', () => {
    const wrapper = mount(MetaUpgradesPanel)
    const store = useMetaUpgradesStore()

    const firstUpgrade = store.upgradeLevels[0]
    const levelDisplays = wrapper.findAll('.level-display')

    expect(levelDisplays[0].text()).toBe(`${firstUpgrade.currentLevel} / ${firstUpgrade.maxLevel}`)
  })

  it('should increment level when + button is clicked', async () => {
    const wrapper = mount(MetaUpgradesPanel)
    const store = useMetaUpgradesStore()

    const firstUpgradeId = store.upgradeLevels[0].id
    const initialLevel = store.levels[firstUpgradeId]

    const incrementButtons = wrapper.findAll('.level-button').filter(btn => btn.text() === '+')
    await incrementButtons[0].trigger('click')

    expect(store.levels[firstUpgradeId]).toBe(initialLevel + 1)
  })

  it('should decrement level when - button is clicked', async () => {
    const wrapper = mount(MetaUpgradesPanel)
    const store = useMetaUpgradesStore()

    // First increment to have something to decrement
    const firstUpgradeId = store.upgradeLevels[0].id
    store.incrementLevel(firstUpgradeId)
    await wrapper.vm.$nextTick()

    const currentLevel = store.levels[firstUpgradeId]

    const decrementButtons = wrapper.findAll('.level-button').filter(btn => btn.text() === '−')
    await decrementButtons[0].trigger('click')

    expect(store.levels[firstUpgradeId]).toBe(currentLevel - 1)
  })

  it('should disable - button when level is 0', () => {
    const wrapper = mount(MetaUpgradesPanel)
    const store = useMetaUpgradesStore()

    // Ensure first upgrade is at level 0
    const firstUpgradeId = store.upgradeLevels[0].id
    store.setLevel(firstUpgradeId, 0)

    const decrementButtons = wrapper.findAll('.level-button').filter(btn => btn.text() === '−')
    expect((decrementButtons[0].element as HTMLButtonElement).disabled).toBe(true)
  })

  it('should disable + button when level is at max', async () => {
    const wrapper = mount(MetaUpgradesPanel)
    const store = useMetaUpgradesStore()

    // Set first upgrade to max level
    const firstUpgrade = store.upgradeLevels[0]
    store.setLevel(firstUpgrade.id, firstUpgrade.maxLevel)
    await wrapper.vm.$nextTick()

    const incrementButtons = wrapper.findAll('.level-button').filter(btn => btn.text() === '+')
    expect((incrementButtons[0].element as HTMLButtonElement).disabled).toBe(true)
  })

  it('should display bonus when upgrade level is greater than 0', async () => {
    const wrapper = mount(MetaUpgradesPanel)
    const store = useMetaUpgradesStore()

    // Find an upgrade with percentage bonus
    const upgradeWithBonus = store.upgradeLevels.find(u => u.bonusValues.length > 0 && u.bonusType === 'percentage')
    if (!upgradeWithBonus) return // Skip if no suitable upgrade found

    // Set it to level 1
    store.setLevel(upgradeWithBonus.id, 1)
    await wrapper.vm.$nextTick()

    const bonuses = wrapper.findAll('.upgrade-bonus')
    expect(bonuses.length).toBeGreaterThan(0)

    // Check that the bonus is formatted correctly (e.g., "+4%")
    const bonusText = bonuses[0].text()
    expect(bonusText).toMatch(/^\+\d+%?$/)
  })

  it('should not display bonus when upgrade level is 0', () => {
    const wrapper = mount(MetaUpgradesPanel)
    const store = useMetaUpgradesStore()

    // Ensure all upgrades are at 0
    store.resetAll()

    const bonuses = wrapper.findAll('.upgrade-bonus')
    expect(bonuses.length).toBe(0)
  })

  it('should reset all upgrades when reset button is clicked', async () => {
    const wrapper = mount(MetaUpgradesPanel)
    const store = useMetaUpgradesStore()

    // Set some levels
    const firstUpgrade = store.upgradeLevels[0]
    const secondUpgrade = store.upgradeLevels[1]
    store.setLevel(firstUpgrade.id, 5)
    store.setLevel(secondUpgrade.id, 3)

    // Click reset
    await wrapper.find('.reset-button').trigger('click')

    // All levels should be 0
    expect(store.levels[firstUpgrade.id]).toBe(0)
    expect(store.levels[secondUpgrade.id]).toBe(0)
  })

  it('should format stat names correctly', () => {
    const wrapper = mount(MetaUpgradesPanel)
    const store = useMetaUpgradesStore()

    // Find an upgrade without description (will use stat name)
    const upgradeWithoutDesc = store.upgradeLevels.find(u => !u.description)
    if (!upgradeWithoutDesc) return // Skip if all have descriptions

    // The stat name should be formatted (e.g., "damage" -> "Damage", "moveSpeed" -> "Move Speed")
    const descriptions = wrapper.findAll('.upgrade-description')
    const hasFormattedName = descriptions.some(desc => {
      const text = desc.text()
      return text[0] === text[0].toUpperCase() // First letter is uppercase
    })
    expect(hasFormattedName).toBe(true)
  })

  it('should display description when provided', () => {
    const wrapper = mount(MetaUpgradesPanel)
    const store = useMetaUpgradesStore()

    // Find an upgrade with description
    const upgradeWithDesc = store.upgradeLevels.find(u => u.description)
    if (!upgradeWithDesc) return // Skip if none have descriptions

    const descriptions = wrapper.findAll('.upgrade-description')
    const hasDescription = descriptions.some(desc => desc.text().includes(upgradeWithDesc.description!))
    expect(hasDescription).toBe(true)
  })
})
