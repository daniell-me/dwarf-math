import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RarityHeaderV2 from './RarityHeaderV2.vue'
import { rarities } from '@/data/types'

describe('RarityHeaderV2', () => {
  it('should render the component', () => {
    const wrapper = mount(RarityHeaderV2)
    expect(wrapper.exists()).toBe(true)
  })

  it('should display "Weapon Upgrades" title', () => {
    const wrapper = mount(RarityHeaderV2)
    expect(wrapper.find('h2').text()).toBe('Weapon Upgrades')
  })

  it('should display "Upgrade" column header', () => {
    const wrapper = mount(RarityHeaderV2)
    const upgradeHeader = wrapper.find('.upgrade-name-spacer')
    expect(upgradeHeader.exists()).toBe(true)
    expect(upgradeHeader.text()).toBe('Upgrade')
  })

  it('should display all rarity headers in correct order', () => {
    const wrapper = mount(RarityHeaderV2)
    const rarityHeaders = wrapper.findAll('.rarity-header')

    expect(rarityHeaders.length).toBe(rarities.length)

    rarities.forEach((rarity, index) => {
      const expectedText = rarity.charAt(0).toUpperCase() + rarity.slice(1)
      expect(rarityHeaders[index].text()).toBe(expectedText)
    })
  })

  it('should apply correct CSS classes to rarity headers', () => {
    const wrapper = mount(RarityHeaderV2)

    rarities.forEach((rarity) => {
      const header = wrapper.find(`.rarity-${rarity}`)
      expect(header.exists()).toBe(true)
      expect(header.classes()).toContain('rarity-header')
      expect(header.classes()).toContain(`rarity-${rarity}`)
    })
  })

  it('should have table with correct structure', () => {
    const wrapper = mount(RarityHeaderV2)
    const table = wrapper.find('table')

    expect(table.exists()).toBe(true)
    expect(table.classes()).toContain('rarity-headers-table')

    const thead = table.find('thead')
    expect(thead.exists()).toBe(true)

    const tr = thead.find('tr')
    expect(tr.exists()).toBe(true)

    const allHeaders = tr.findAll('th')
    expect(allHeaders.length).toBe(rarities.length + 1) // +1 for "Upgrade" column
  })
})
