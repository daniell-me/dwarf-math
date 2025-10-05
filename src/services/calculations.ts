import type { Weapon, CharacterStats } from '@/data/types'
import { Stat } from '@/data/types'

function mapStatToProperty(stat: Stat): keyof (Weapon & CharacterStats) {
  switch (stat) {
    case Stat.dmg:
      return 'baseDmg'
    case Stat.reloadSpeed:
      return 'reloadTime'
    case Stat.fireRate:
      return 'fireRate'
    default:
      throw new Error(`Unknown stat: ${stat}`)
  }
}

export function calculateDPS(weapon: Weapon, characterStats: CharacterStats): number {
  const { baseDmg, fireRate, clipSize, reloadTime } = weapon
  const { critChance, critDamage } = characterStats

  const avgDamagePerShot = baseDmg * (1 + critChance * (critDamage - 1))
  const timeToEmptyClip = clipSize / fireRate
  const totalCycleTime = timeToEmptyClip + reloadTime
  const dps = (avgDamagePerShot * clipSize) / totalCycleTime

  return Math.round(dps * 100) / 100
}

export function calculateDPSWithUpgrade(
  weapon: Weapon,
  characterStats: CharacterStats,
  upgradeStat: keyof (Weapon & CharacterStats),
  upgradeValue: number
): number {
  const modifiedWeapon = { ...weapon }
  const modifiedCharacterStats = { ...characterStats }

  if (upgradeStat === 'critChance') {
    modifiedCharacterStats[upgradeStat] = characterStats[upgradeStat] + (upgradeValue / 100)
  } else if (upgradeStat === 'critDamage') {
    modifiedCharacterStats[upgradeStat] = characterStats[upgradeStat] * (1 + upgradeValue / 100)
  } else {
    // Handle weapon-specific stats
    if (upgradeStat === 'baseDmg' || upgradeStat === 'fireRate' || upgradeStat === 'reloadTime' || upgradeStat === 'clipSize') {
      (modifiedWeapon as any)[upgradeStat] = (weapon as any)[upgradeStat] * (1 + upgradeValue / 100)
    }
  }

  return calculateDPS(modifiedWeapon, modifiedCharacterStats)
}

export function calculateDPSWithStatUpgrade(
  weapon: Weapon,
  characterStats: CharacterStats,
  upgradeStat: Stat,
  upgradeValue: number
): number {
  try {
    const propertyName = mapStatToProperty(upgradeStat)
    return calculateDPSWithUpgrade(weapon, characterStats, propertyName, upgradeValue)
  } catch {
    // If stat doesn't map to a weapon property, return base DPS
    return calculateDPS(weapon, characterStats)
  }
}