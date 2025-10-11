import { describe, it, expect } from 'vitest'
import { aggregateMidDiveUpgrades, doesUpgradeApplyToWeapon } from './upgradeAggregation'
import { Stat, WeaponTag, Class, UpgradeCategory } from '@/data/types'
import type { Weapon, Upgrade } from '@/data/types'
import type { SelectedUpgrade } from '@/stores/selectedUpgrades'

describe('doesUpgradeApplyToWeapon', () => {
  const projectileWeapon: Weapon = {
    id: 'test-gun',
    name: 'Test Gun',
    baseDmg: 50,
    fireRate: 5,
    clipSize: 10,
    reloadTime: 2,
    tags: [WeaponTag.projectile, WeaponTag.kinetic],
    class: Class.scout
  }

  const beamWeapon: Weapon = {
    id: 'test-beam',
    name: 'Test Beam',
    baseDmg: 30,
    fireRate: 10,
    clipSize: 1,
    reloadTime: 4,
    tags: [WeaponTag.beam, WeaponTag.fire],
    class: Class.driller
  }

  it('should return true for "all" tag upgrades', () => {
    const upgrade: Upgrade = {
      name: 'Bigger Cogs',
      stat: Stat.dmg,
      tags: [WeaponTag.all],
      category: UpgradeCategory.weapon,
      values: [0.10, 0.15, 0.25, 0.35, 0.50]
    }

    expect(doesUpgradeApplyToWeapon(upgrade, projectileWeapon)).toBe(true)
    expect(doesUpgradeApplyToWeapon(upgrade, beamWeapon)).toBe(true)
  })

  it('should return true when weapon has matching tag', () => {
    const projectileUpgrade: Upgrade = {
      name: 'Tighten Springs',
      stat: Stat.fireRate,
      tags: [WeaponTag.projectile],
      category: UpgradeCategory.weapon,
      values: [0.10, 0.15, 0.25, 0.35, 0.50]
    }

    expect(doesUpgradeApplyToWeapon(projectileUpgrade, projectileWeapon)).toBe(true)
    expect(doesUpgradeApplyToWeapon(projectileUpgrade, beamWeapon)).toBe(false)
  })

  it('should return true when weapon has any of the upgrade tags', () => {
    const multiTagUpgrade: Upgrade = {
      name: 'Tweak Potency',
      stat: Stat.statusPotency,
      tags: [WeaponTag.acid, WeaponTag.electrical, WeaponTag.fire],
      category: UpgradeCategory.weapon,
      values: [0.15, 0.25, 0.35, null, null]
    }

    expect(doesUpgradeApplyToWeapon(multiTagUpgrade, beamWeapon)).toBe(true) // has fire tag
    expect(doesUpgradeApplyToWeapon(multiTagUpgrade, projectileWeapon)).toBe(false) // no matching tags
  })

  it('should return false for player-only upgrades (empty tags)', () => {
    const playerUpgrade: Upgrade = {
      name: 'Extra Rations',
      stat: Stat.maxHealth,
      tags: [],
      category: UpgradeCategory.player,
      values: [10, 20, 35, 50, 70]
    }

    expect(doesUpgradeApplyToWeapon(playerUpgrade, projectileWeapon)).toBe(false)
    expect(doesUpgradeApplyToWeapon(playerUpgrade, beamWeapon)).toBe(false)
  })
})

describe('aggregateMidDiveUpgrades', () => {
  const testWeapon: Weapon = {
    id: 'zhukov',
    name: 'Zhukov NUK17',
    baseDmg: 22,
    fireRate: 6.67,
    clipSize: 20,
    reloadTime: 1,
    tags: [WeaponTag.kinetic, WeaponTag.projectile],
    class: Class.scout
  }

  const allUpgrades: Upgrade[] = [
    {
      name: 'Bigger Cogs',
      stat: Stat.dmg,
      tags: [WeaponTag.all],
      category: UpgradeCategory.weapon,
      values: [0.10, 0.15, 0.25, 0.35, 0.50]
    },
    {
      name: 'Tighten Springs',
      stat: Stat.fireRate,
      tags: [WeaponTag.projectile],
      category: UpgradeCategory.weapon,
      values: [0.10, 0.15, 0.25, 0.35, 0.50]
    },
    {
      name: 'Loosen Bolts',
      stat: Stat.reloadSpeed,
      tags: [WeaponTag.all],
      category: UpgradeCategory.weapon,
      values: [0.10, 0.15, 0.25, 0.35, 0.50]
    }
  ]

  it('should aggregate weapon-specific upgrades only', () => {
    const selectedUpgrades: SelectedUpgrade[] = [
      { weaponId: 'zhukov', upgradeName: 'Bigger Cogs', rarity: 'common', value: 0.10 },
      { weaponId: 'zhukov', upgradeName: 'Bigger Cogs', rarity: 'uncommon', value: 0.15 }
    ]

    const result = aggregateMidDiveUpgrades('zhukov', testWeapon, selectedUpgrades, {}, allUpgrades)

    expect(result[Stat.dmg]).toBe(0.25) // 0.10 + 0.15
  })

  it('should aggregate global upgrades only', () => {
    const globalUpgrades = {
      'Bigger Cogs-all-common': 2, // 2x 0.10 = 0.20
      'Tighten Springs-projectile-rare': 1 // 1x 0.25 = 0.25
    }

    const result = aggregateMidDiveUpgrades('zhukov', testWeapon, [], globalUpgrades, allUpgrades)

    expect(result[Stat.dmg]).toBe(0.20) // 2 * 0.10
    expect(result[Stat.fireRate]).toBe(0.25) // 1 * 0.25
  })

  it('should aggregate both weapon-specific and global upgrades', () => {
    const selectedUpgrades: SelectedUpgrade[] = [
      { weaponId: 'zhukov', upgradeName: 'Bigger Cogs', rarity: 'common', value: 0.10 }
    ]

    const globalUpgrades = {
      'Bigger Cogs-all-uncommon': 1, // 1x 0.15 = 0.15
      'Tighten Springs-projectile-common': 2 // 2x 0.10 = 0.20
    }

    const result = aggregateMidDiveUpgrades('zhukov', testWeapon, selectedUpgrades, globalUpgrades, allUpgrades)

    expect(result[Stat.dmg]).toBe(0.25) // 0.10 + 0.15
    expect(result[Stat.fireRate]).toBe(0.20) // 2 * 0.10
  })

  it('should only include upgrades for the specified weapon', () => {
    const selectedUpgrades: SelectedUpgrade[] = [
      { weaponId: 'zhukov', upgradeName: 'Bigger Cogs', rarity: 'common', value: 0.10 },
      { weaponId: 'other-weapon', upgradeName: 'Bigger Cogs', rarity: 'uncommon', value: 0.15 }
    ]

    const result = aggregateMidDiveUpgrades('zhukov', testWeapon, selectedUpgrades, {}, allUpgrades)

    expect(result[Stat.dmg]).toBe(0.10) // Only zhukov's upgrade
  })

  it('should ignore global upgrades that do not apply to weapon', () => {
    const beamWeapon: Weapon = {
      id: 'flamethrower',
      name: 'CRSPR Flamethrower',
      baseDmg: 28,
      fireRate: 5,
      clipSize: 1,
      reloadTime: 6,
      tags: [WeaponTag.fire, WeaponTag.beam],
      class: Class.driller
    }

    const globalUpgrades = {
      'Tighten Springs-projectile-common': 2 // Doesn't apply to beam weapon
    }

    const result = aggregateMidDiveUpgrades('flamethrower', beamWeapon, [], globalUpgrades, allUpgrades)

    expect(result[Stat.fireRate]).toBeUndefined()
  })

  it('should handle empty upgrades', () => {
    const result = aggregateMidDiveUpgrades('zhukov', testWeapon, [], {}, allUpgrades)

    expect(result).toEqual({})
  })

  it('should sum multiple instances of the same stat additively', () => {
    const selectedUpgrades: SelectedUpgrade[] = [
      { weaponId: 'zhukov', upgradeName: 'Bigger Cogs', rarity: 'common', value: 0.10 },
      { weaponId: 'zhukov', upgradeName: 'Bigger Cogs', rarity: 'common', value: 0.10 },
      { weaponId: 'zhukov', upgradeName: 'Bigger Cogs', rarity: 'rare', value: 0.25 }
    ]

    const result = aggregateMidDiveUpgrades('zhukov', testWeapon, selectedUpgrades, {}, allUpgrades)

    expect(result[Stat.dmg]).toBe(0.45) // 0.10 + 0.10 + 0.25
  })
})
