import { describe, it, expect } from 'vitest'
import { calculateDPS, calculateDPSWithUpgrade } from './calculations'
import { Rarity, Stat, WeaponTag } from '@/data/types'
import type { Upgrade } from '@/data/types'

describe('calculateDPS', () => {
  it('should calculate DPS with no critical hits', () => {
    // 100 damage, 1 shot per second, 1 second reload, 1 clip size, 0% crit chance, 2x crit damage
    // cycleTime = 1 + (1-1)/1 = 1 second
    // DPS = 100 * 1 / 1 = 100
    const result = calculateDPS(100, 1, 1, 1, 0, 2)
    expect(result).toBe(100)
  })

  it('should throw error when reloadTime is 0', () => {
    expect(() => calculateDPS(100, 1, 0, 1, 0, 2)).toThrow('calculateDPS: reloadTime cannot be 0')
  })
})

describe('calculateDPSWithUpgrade', () => {
  it('should calculate DPS with 0.10 damage upgrade (common)', () => {
    // Base: 100 damage, 1 shot per second, 1 second reload, 1 clip size, 0% crit chance, 2x crit damage
    // Base DPS = 100
    // With 0.10 (10%) damage upgrade: 110 damage
    // Expected DPS = 110
    const damageUpgrade: Upgrade = {
      name: 'Bigger Cogs',
      stat: Stat.dmg,
      tags: [WeaponTag.all],
      values: {
        [Rarity.common]: 0.10
      }
    }

    const result = calculateDPSWithUpgrade(100, 1, 1, 1, 0, 2, damageUpgrade, Rarity.common)
    expect(result).toBe(110)
  })

  it('should throw error when upgrade does not have value for rarity', () => {
    const damageUpgrade: Upgrade = {
      name: 'Bigger Cogs',
      stat: Stat.dmg,
      tags: [WeaponTag.all],
      values: {
        [Rarity.common]: 0.10
      }
    }

    expect(() => calculateDPSWithUpgrade(100, 1, 1, 1, 0, 2, damageUpgrade, Rarity.legendary))
      .toThrow("calculateDPSWithUpgrade: upgrade 'Bigger Cogs' does not have a value for rarity 'legendary'")
  })
})
