import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import UpgradeTableV2 from './UpgradeTableV2.vue'
import type { Weapon, Upgrade, CharacterStats } from '@/data/types'
import { WeaponTag, Class, Stat, Rarity } from '@/data/types'

const mockWeapon: Weapon = {
  id: 'test-weapon',
  name: 'Test Weapon',
  baseDmg: 100,
  fireRate: 5,
  clipSize: 30,
  reloadTime: 2.5,
  class: Class.gunner,
  tags: [WeaponTag.all]
}

const mockUpgrades: Upgrade[] = [
  {
    name: 'Damage Boost',
    stat: Stat.dmg,
    tags: [WeaponTag.all],
    values: {
      [Rarity.common]: 0.10,
      [Rarity.uncommon]: 0.20,
      [Rarity.rare]: 0.30,
      [Rarity.epic]: 0.40,
      [Rarity.legendary]: 0.50
    }
  },
  {
    name: 'Fire Rate Boost',
    stat: Stat.fireRate,
    tags: [WeaponTag.all],
    values: {
      [Rarity.common]: 0.05,
      [Rarity.uncommon]: 0.10
    }
  }
]

const mockCharacterStats: CharacterStats = {
  damage: 1.0,
  critChance: 0.05,
  critDamage: 2.0,
  reloadSpeed: 1.0,
  health: 100
}

const mockGetUpgradedDPS = (_weapon: Weapon, upgrade: Upgrade, rarity: Rarity): number | null => {
  const value = upgrade.values[rarity]
  if (value === undefined) return null
  return 500 + value * 1000 // Mock calculation
}

describe('UpgradeTableV2', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render the component', () => {
    const wrapper = mount(UpgradeTableV2, {
      props: {
        upgrades: mockUpgrades,
        weapon: mockWeapon,
        characterStats: mockCharacterStats,
        getUpgradedDPS: mockGetUpgradedDPS
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should display upgrade rows for each upgrade', () => {
    const wrapper = mount(UpgradeTableV2, {
      props: {
        upgrades: mockUpgrades,
        weapon: mockWeapon,
        characterStats: mockCharacterStats,
        getUpgradedDPS: mockGetUpgradedDPS
      }
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(mockUpgrades.length)
  })

  it('should format stat names correctly', () => {
    const wrapper = mount(UpgradeTableV2, {
      props: {
        upgrades: mockUpgrades,
        weapon: mockWeapon,
        characterStats: mockCharacterStats,
        getUpgradedDPS: mockGetUpgradedDPS
      }
    })

    const upgradeNames = wrapper.findAll('.upgrade-name')
    expect(upgradeNames[0].text()).toBe('Dmg')
    expect(upgradeNames[1].text()).toBe('Fire Rate')
  })

  it('should display DPS values for each rarity', () => {
    const wrapper = mount(UpgradeTableV2, {
      props: {
        upgrades: [mockUpgrades[0]],
        weapon: mockWeapon,
        characterStats: mockCharacterStats,
        getUpgradedDPS: mockGetUpgradedDPS
      }
    })

    const dpsCells = wrapper.findAll('.dps-cell')
    expect(dpsCells.length).toBe(5) // 5 rarities

    // Check values match mockGetUpgradedDPS output
    expect(dpsCells[0].find('.dps-value').text()).toBe('600') // 500 + 0.10 * 1000
    expect(dpsCells[1].find('.dps-value').text()).toBe('700') // 500 + 0.20 * 1000
  })

  it('should display "-" for unavailable rarity values', () => {
    const wrapper = mount(UpgradeTableV2, {
      props: {
        upgrades: [mockUpgrades[1]], // Fire Rate has only common and uncommon
        weapon: mockWeapon,
        characterStats: mockCharacterStats,
        getUpgradedDPS: mockGetUpgradedDPS
      }
    })

    const dpsCells = wrapper.findAll('.dps-cell')
    expect(dpsCells[2].find('.dps-value').text()).toBe('-') // rare
    expect(dpsCells[3].find('.dps-value').text()).toBe('-') // epic
    expect(dpsCells[4].find('.dps-value').text()).toBe('-') // legendary
  })

  it('should handle click on DPS cell', async () => {
    const wrapper = mount(UpgradeTableV2, {
      props: {
        upgrades: [mockUpgrades[0]],
        weapon: mockWeapon,
        characterStats: mockCharacterStats,
        getUpgradedDPS: mockGetUpgradedDPS
      }
    })

    const firstCell = wrapper.find('.dps-cell')
    await firstCell.trigger('click')

    // Cell should have selected class after click
    expect(firstCell.classes()).toContain('selected')
  })
})
