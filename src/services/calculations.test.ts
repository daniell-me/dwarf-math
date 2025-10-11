import { describe, it, expect } from 'vitest'
import { calculateDPS, calculateDPSWithUpgrade, calculateDPSWithAllUpgrades } from './calculations'
import { Rarity, Stat, WeaponTag } from '@/data/types'
import type { Upgrade, CharacterStats } from '@/data/types'

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

describe('calculateDPSWithAllUpgrades', () => {
  const baseCharacterStats: CharacterStats = {
    health: 100,
    critChance: 0,
    critDamage: 2.0,
    damage: 1.0,
    reloadSpeed: 1.0
  }

  it('should calculate DPS with no upgrades', () => {
    // Base: 100 damage, 1 shot per second, 1 second reload, 1 clip size
    // No upgrades, no character bonuses
    // Expected DPS = 100
    const result = calculateDPSWithAllUpgrades(100, 1, 1, 1, baseCharacterStats, {})
    expect(result).toBe(100)
  })

  it('should calculate DPS with damage mid-dive upgrade only', () => {
    // Base: 100 damage, 1 shot per second, 1 second reload, 1 clip size
    // Mid-dive: +0.50 (50%) damage
    // Expected: 100 * 1.50 = 150 damage, DPS = 150
    const aggregated = { [Stat.dmg]: 0.50 }
    const result = calculateDPSWithAllUpgrades(100, 1, 1, 1, baseCharacterStats, aggregated)
    expect(result).toBe(150)
  })

  it('should calculate DPS with fire rate mid-dive upgrade only', () => {
    // Base: 100 damage, 2 shots per second, 2 second reload, 2 clip size
    // Mid-dive: +0.50 (50%) fire rate
    // Fire rate: 2 * 1.50 = 3 shots/s
    // Cycle time: 2 + (2-1)/3 = 2 + 0.333 = 2.333s
    // DPS = 100 * 2 / 2.333 = 85.7
    const aggregated = { [Stat.fireRate]: 0.50 }
    const result = calculateDPSWithAllUpgrades(100, 2, 2, 2, baseCharacterStats, aggregated)
    expect(result).toBe(85.7)
  })

  it('should calculate DPS with reload speed mid-dive upgrade only', () => {
    // Base: 100 damage, 1 shot per second, 2 second reload, 1 clip size
    // Mid-dive: +0.50 (50%) reload speed = 50% faster reload = reload time * 0.50
    // Reload time: 2 * (1 - 0.50) = 1 second
    // Cycle time: 1 second
    // DPS = 100 * 1 / 1 = 100
    const aggregated = { [Stat.reloadSpeed]: 0.50 }
    const result = calculateDPSWithAllUpgrades(100, 1, 2, 1, baseCharacterStats, aggregated)
    expect(result).toBe(100)
  })

  it('should stack multiple mid-dive upgrades additively', () => {
    // Base: 100 damage, 1 shot per second, 1 second reload, 1 clip size
    // Mid-dive: +0.25 damage + +0.25 damage = +0.50 total
    // Expected: 100 * 1.50 = 150 damage, DPS = 150
    const aggregated = { [Stat.dmg]: 0.50 } // Pre-summed
    const result = calculateDPSWithAllUpgrades(100, 1, 1, 1, baseCharacterStats, aggregated)
    expect(result).toBe(150)
  })

  it('should apply mid-dive upgrades and character stats multiplicatively', () => {
    // Base: 100 damage, 1 shot per second, 1 second reload, 1 clip size
    // Mid-dive: +0.50 (50%) damage
    // Character: 1.30x damage multiplier
    // Expected: 100 * 1.50 * 1.30 = 195 damage, DPS = 195
    const characterStats: CharacterStats = {
      ...baseCharacterStats,
      damage: 1.30
    }
    const aggregated = { [Stat.dmg]: 0.50 }
    const result = calculateDPSWithAllUpgrades(100, 1, 1, 1, characterStats, aggregated)
    expect(result).toBe(195)
  })

  it('should apply mid-dive reload speed and character reload speed multiplicatively', () => {
    // Base: 100 damage, 1 shot per second, 4 second reload, 1 clip size
    // Mid-dive: +0.50 (50%) reload speed -> reload time * 0.50 = 2 seconds
    // Character: 2.0x reload speed multiplier -> 2 / 2.0 = 1 second
    // Final reload time: 1 second
    // DPS = 100 * 1 / 1 = 100
    const characterStats: CharacterStats = {
      ...baseCharacterStats,
      reloadSpeed: 2.0
    }
    const aggregated = { [Stat.reloadSpeed]: 0.50 }
    const result = calculateDPSWithAllUpgrades(100, 1, 4, 1, characterStats, aggregated)
    expect(result).toBe(100)
  })

  it('should apply critical hit stats correctly', () => {
    // Base: 100 damage, 1 shot per second, 1 second reload, 1 clip size
    // Character: 0.50 (50%) crit chance, 3.0x crit damage
    // Average damage per shot: 100 * (1 + 0.50 * (3.0 - 1)) = 100 * 2.0 = 200
    // DPS = 200
    const characterStats: CharacterStats = {
      ...baseCharacterStats,
      critChance: 0.50,
      critDamage: 3.0
    }
    const result = calculateDPSWithAllUpgrades(100, 1, 1, 1, characterStats, {})
    expect(result).toBe(200)
  })

  it('should apply all bonuses together correctly (complex scenario)', () => {
    // Base: 50 damage, 5 shots/s, 2 second reload, 10 clip size
    // Mid-dive: +0.40 damage, +0.20 fire rate, +0.30 reload speed
    // Character: 1.20x damage, 1.15x reload speed, 0.10 crit chance, 2.5x crit damage

    // Damage calculation:
    // - Mid-dive: 50 * 1.40 = 70
    // - Character: 70 * 1.20 = 84

    // Fire rate calculation:
    // - Mid-dive: 5 * 1.20 = 6 shots/s

    // Reload time calculation:
    // - Mid-dive: 2 * (1 - 0.30) = 1.4s
    // - Character: 1.4 / 1.15 = 1.217s

    // Crit damage:
    // - Average dmg per shot: 84 * (1 + 0.10 * (2.5 - 1)) = 84 * 1.15 = 96.6

    // Cycle time: 1.217 + (10-1)/6 = 1.217 + 1.5 = 2.717s
    // DPS = 96.6 * 10 / 2.717 = 355.5

    const characterStats: CharacterStats = {
      ...baseCharacterStats,
      damage: 1.20,
      reloadSpeed: 1.15,
      critChance: 0.10,
      critDamage: 2.5
    }
    const aggregated = {
      [Stat.dmg]: 0.40,
      [Stat.fireRate]: 0.20,
      [Stat.reloadSpeed]: 0.30
    }
    const result = calculateDPSWithAllUpgrades(50, 5, 2, 10, characterStats, aggregated)
    expect(result).toBe(355.5)
  })
})
