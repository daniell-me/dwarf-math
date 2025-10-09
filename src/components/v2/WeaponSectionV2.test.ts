import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import WeaponSectionV2 from './WeaponSectionV2.vue'
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
      [Rarity.common]: 0.10
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

const mockAvailableWeapons: Weapon[] = [
  {
    id: 'weapon-1',
    name: 'Weapon One',
    baseDmg: 100,
    fireRate: 5,
    clipSize: 30,
    reloadTime: 2.5,
    class: Class.gunner,
    tags: [WeaponTag.all]
  }
]

const mockGetUpgradedDPS = (): number => 500
const mockGetCurrentDPS = (): number => 450

describe('WeaponSectionV2', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render the component', () => {
    const wrapper = mount(WeaponSectionV2, {
      props: {
        weapon: null,
        slotIndex: 0,
        characterStats: mockCharacterStats,
        availableWeapons: mockAvailableWeapons,
        upgrades: mockUpgrades,
        getUpgradedDPS: mockGetUpgradedDPS,
        getCurrentDPS: mockGetCurrentDPS
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should display EmptyWeaponSlotV2 when weapon is null', () => {
    const wrapper = mount(WeaponSectionV2, {
      props: {
        weapon: null,
        slotIndex: 0,
        characterStats: mockCharacterStats,
        availableWeapons: mockAvailableWeapons,
        upgrades: mockUpgrades,
        getUpgradedDPS: mockGetUpgradedDPS,
        getCurrentDPS: mockGetCurrentDPS
      }
    })

    expect(wrapper.findComponent({ name: 'EmptyWeaponSlotV2' }).exists()).toBe(true)
    expect(wrapper.find('.weapon-row').exists()).toBe(false)
  })

  it('should display WeaponStatsV2 and UpgradeTableV2 when weapon is provided', () => {
    const wrapper = mount(WeaponSectionV2, {
      props: {
        weapon: mockWeapon,
        slotIndex: 0,
        characterStats: mockCharacterStats,
        availableWeapons: mockAvailableWeapons,
        upgrades: mockUpgrades,
        getUpgradedDPS: mockGetUpgradedDPS,
        getCurrentDPS: mockGetCurrentDPS
      }
    })

    expect(wrapper.find('.weapon-row').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'WeaponStatsV2' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'UpgradeTableV2' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'EmptyWeaponSlotV2' }).exists()).toBe(false)
  })

  it('should emit selectWeapon event from EmptyWeaponSlotV2', async () => {
    const wrapper = mount(WeaponSectionV2, {
      props: {
        weapon: null,
        slotIndex: 0,
        characterStats: mockCharacterStats,
        availableWeapons: mockAvailableWeapons,
        upgrades: mockUpgrades,
        getUpgradedDPS: mockGetUpgradedDPS,
        getCurrentDPS: mockGetCurrentDPS
      }
    })

    const emptySlot = wrapper.findComponent({ name: 'EmptyWeaponSlotV2' })
    await emptySlot.vm.$emit('selectWeapon', mockAvailableWeapons[0])

    expect(wrapper.emitted('selectWeapon')).toBeTruthy()
    expect(wrapper.emitted('selectWeapon')?.[0][0]).toEqual(mockAvailableWeapons[0])
  })

  it('should emit removeWeapon event from WeaponStatsV2', async () => {
    const wrapper = mount(WeaponSectionV2, {
      props: {
        weapon: mockWeapon,
        slotIndex: 1, // Not slot 0, so removable
        characterStats: mockCharacterStats,
        availableWeapons: mockAvailableWeapons,
        upgrades: mockUpgrades,
        getUpgradedDPS: mockGetUpgradedDPS,
        getCurrentDPS: mockGetCurrentDPS
      }
    })

    const weaponStats = wrapper.findComponent({ name: 'WeaponStatsV2' })
    await weaponStats.vm.$emit('remove')

    expect(wrapper.emitted('removeWeapon')).toBeTruthy()
  })

  it('should pass removable=false to WeaponStatsV2 for slot 0', () => {
    const wrapper = mount(WeaponSectionV2, {
      props: {
        weapon: mockWeapon,
        slotIndex: 0,
        characterStats: mockCharacterStats,
        availableWeapons: mockAvailableWeapons,
        upgrades: mockUpgrades,
        getUpgradedDPS: mockGetUpgradedDPS,
        getCurrentDPS: mockGetCurrentDPS
      }
    })

    const weaponStats = wrapper.findComponent({ name: 'WeaponStatsV2' })
    expect(weaponStats.props('removable')).toBe(false)
  })

  it('should pass removable=true to WeaponStatsV2 for slots > 0', () => {
    const wrapper = mount(WeaponSectionV2, {
      props: {
        weapon: mockWeapon,
        slotIndex: 1,
        characterStats: mockCharacterStats,
        availableWeapons: mockAvailableWeapons,
        upgrades: mockUpgrades,
        getUpgradedDPS: mockGetUpgradedDPS,
        getCurrentDPS: mockGetCurrentDPS
      }
    })

    const weaponStats = wrapper.findComponent({ name: 'WeaponStatsV2' })
    expect(weaponStats.props('removable')).toBe(true)
  })
})
