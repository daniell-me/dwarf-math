import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RarityHeader from './RarityHeader.vue'
import { rarities } from '@/data/types'

describe('RarityHeader', () => {
  it('should render the component', () => {
    const wrapper = mount(RarityHeader)
    expect(wrapper.exists()).toBe(true)
  })

  it('should display "Weapon Upgrades" title', () => {
    const wrapper = mount(RarityHeader)
    expect(wrapper.find('h2').text()).toBe('Weapon Upgrades')
  })

  it('should display "Upgrade" column header', () => {
    const wrapper = mount(RarityHeader)
    const upgradeHeader = wrapper.find('.upgrade-name-spacer')
    expect(upgradeHeader.exists()).toBe(true)
    expect(upgradeHeader.text()).toBe('Upgrade')
  })

  it('should display all rarity headers in correct order', () => {
    const wrapper = mount(RarityHeader)
    const rarityHeaders = wrapper.findAll('.rarity-header')

    expect(rarityHeaders.length).toBe(rarities.length)

    rarities.forEach((rarity, index) => {
      const expectedText = rarity.charAt(0).toUpperCase() + rarity.slice(1)
      expect(rarityHeaders[index].text()).toBe(expectedText)
    })
  })

  it('should apply correct CSS classes to rarity headers', () => {
    const wrapper = mount(RarityHeader)

    rarities.forEach((rarity) => {
      const header = wrapper.find(`.rarity-${rarity}`)
      expect(header.exists()).toBe(true)
      expect(header.classes()).toContain('rarity-header')
      expect(header.classes()).toContain(`rarity-${rarity}`)
    })
  })

  it('should have table with correct structure', () => {
    const wrapper = mount(RarityHeader)
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
