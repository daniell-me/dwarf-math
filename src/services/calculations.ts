import type { Upgrade, Rarity, CharacterStats, ClassMod, MetaUpgrade, Stat } from '@/data/types'
import { getUpgradeValue } from '@/utils/weaponFunctions'

export function calculateDPS(
  dmg: number,
  fireRate: number,
  reloadTime: number,
  clipSize: number,
  critChance: number,
  critDmg: number
): number {
  if (reloadTime === 0) {
    throw new Error('calculateDPS: reloadTime cannot be 0')
  }

  const dmgPerShot = dmg * (1 + critChance * (critDmg - 1))
  // shots fire immediately on reload
  const cycleTime = reloadTime + (clipSize - 1) / fireRate
  const dps = (dmgPerShot * clipSize) / cycleTime
  // round to 1dp
  return Math.round(dps * 10) / 10
}

export function calculateDPSWithUpgrade(
  dmg: number,
  fireRate: number,
  reloadTime: number,
  clipSize: number,
  critChance: number,
  critDmg: number,
  upgrade: Upgrade,
  rarity: Rarity,
  characterDamageMultiplier: number = 1.0,
  characterReloadSpeedMultiplier: number = 1.0
): number {
  const upgradeValue = getUpgradeValue(upgrade, rarity)
  if (upgradeValue === undefined) {
    throw new Error(`calculateDPSWithUpgrade: upgrade '${upgrade.name}' does not have a value for rarity '${rarity}'`)
  }

  // Apply character stat bonuses first (these are multipliers)
  const baseDmgWithCharStats = dmg * characterDamageMultiplier
  const baseReloadTimeWithCharStats = reloadTime / characterReloadSpeedMultiplier

  // Apply upgrade to the appropriate stat
  let modifiedDmg = baseDmgWithCharStats
  let modifiedFireRate = fireRate
  let modifiedReloadTime = baseReloadTimeWithCharStats

  switch (upgrade.stat) {
    case 'dmg':
      modifiedDmg = baseDmgWithCharStats * (1 + upgradeValue)
      break
    case 'fireRate':
      modifiedFireRate = fireRate * (1 + upgradeValue)
      break
    case 'reloadSpeed':
      // Reload speed upgrade reduces reload time
      modifiedReloadTime = baseReloadTimeWithCharStats * (1 - upgradeValue)
      break
    // Add other cases as needed
  }

  return calculateDPS(
    modifiedDmg,
    modifiedFireRate,
    modifiedReloadTime,
    clipSize,
    critChance,
    critDmg
  )
}

/**
 * Calculate current character stats using the bucket formula:
 * FinalStat = ((Base * Skill) + Flat) * Meta
 *
 * Where:
 * - Base: Class base stats
 * - Skill: Sum of all skill upgrades (currently 1.0)
 * - Flat: Flat bonuses from gear
 * - Meta: Meta Upgrades * Class Mod multipliers
 *
 * TODO: Add support for Overclocks and Artifacts
 */
export function calculateCurrentStats(
  baseStats: Partial<CharacterStats>,
  classMod: ClassMod | null,
  metaUpgrades: MetaUpgrade[],
  metaUpgradeLevels: Record<string, number>,
  flatGearBonuses: Partial<CharacterStats> = {},
  percentGearBonuses: Partial<CharacterStats> = {}
): CharacterStats {
  // Initialize all stats with defaults
  const currentStats: CharacterStats = {
    health: 0,
    lifeRegen: 0,
    armor: 0,
    dodgeChance: 0,
    moveSpeed: 0,
    damage: 1.0, // Default multiplier (1.0 = no bonus)
    fireRate: 1.0, // Default multiplier
    reloadSpeed: 1.0, // Default multiplier (1.0 = no bonus)
    critChance: 0,
    critDamage: 1.0, // Default multiplier
    statusDamage: 0,
    pickupRadius: 0,
    xpGain: 0,
    miningSpeed: 0,
    lifetime: 0,
    weaponRange: 0,
    explosionRadius: 0
  }

  // Weapon multiplier stats that start at 1.0 and multiply bonuses
  const weaponMultiplierStats: Array<keyof CharacterStats> = ['damage', 'reloadSpeed', 'fireRate']

  // For each stat, layer on all the sources
  const statKeys = Object.keys(currentStats) as Array<keyof CharacterStats>

  for (const statKey of statKeys) {
    // For weapon multiplier stats, multiply all percentage bonuses together
    if (weaponMultiplierStats.includes(statKey)) {
      let multiplier = 1.0

      // Apply meta upgrade bonuses multiplicatively
      for (const metaUpgrade of metaUpgrades) {
        if (metaUpgrade.stat === statKey && metaUpgrade.bonusType === 'percentage') {
          const level = metaUpgradeLevels[metaUpgrade.id] ?? 0
          if (level > 0) {
            const bonus = metaUpgrade.bonusValues[level - 1] ?? 0
            multiplier *= (1 + bonus)
          }
        }
      }

      // Apply class mod bonuses multiplicatively
      if (classMod?.statMultipliers?.[statKey] !== undefined) {
        multiplier *= (1 + classMod.statMultipliers[statKey]!)
      }

      // Apply gear bonuses multiplicatively
      if (percentGearBonuses[statKey]) {
        multiplier *= (1 + percentGearBonuses[statKey]!)
      }

      currentStats[statKey] = multiplier as any
      continue
    }

    // For regular stats, use the bucket formula
    const baseValue = baseStats[statKey] ?? 0
    if (baseValue === undefined) continue

    // Skill bucket (currently 1.0, no skill upgrades yet)
    const skillMultiplier = 1.0

    // Flat bucket (from gear)
    const flatBonus = flatGearBonuses[statKey] ?? 0

    // Meta bucket = Meta Upgrades * Class Mod multipliers
    let metaMultiplier = 1.0

    // Apply meta upgrades (percentage only)
    for (const metaUpgrade of metaUpgrades) {
      if (metaUpgrade.stat === statKey && metaUpgrade.bonusType === 'percentage') {
        const level = metaUpgradeLevels[metaUpgrade.id] ?? 0
        if (level > 0) {
          const bonus = metaUpgrade.bonusValues[level - 1] ?? 0
          metaMultiplier *= (1 + bonus)
        }
      }
    }

    // Apply class mod multipliers to meta bucket
    if (classMod?.statMultipliers?.[statKey] !== undefined) {
      const classModValue = classMod.statMultipliers[statKey]!
      metaMultiplier *= (1 + classModValue)
    }

    // Percent gear bonuses also multiply
    const gearMultiplier = 1 + (percentGearBonuses[statKey] ?? 0)

    // Final calculation: ((Base * Skill) + Flat) * Meta * Gear
    const calculatedValue = ((baseValue * skillMultiplier) + flatBonus) * metaMultiplier * gearMultiplier

    currentStats[statKey] = calculatedValue as any
  }

  // Handle flat bonuses from meta upgrades (like Getting Fit: +10 HP per level)
  for (const metaUpgrade of metaUpgrades) {
    if (metaUpgrade.bonusType === 'flat') {
      const level = metaUpgradeLevels[metaUpgrade.id] ?? 0
      if (level > 0 && metaUpgrade.stat in currentStats) {
        const statKey = metaUpgrade.stat as keyof CharacterStats
        const currentValue = currentStats[statKey]
        if (typeof currentValue === 'number') {
          const bonus = metaUpgrade.bonusValues[level - 1] ?? 0
          currentStats[statKey] = (currentValue + bonus) as any
        }
      }
    }
  }

  return currentStats
}

/**
 * Calculate DPS with all mid-dive upgrades applied to the weapon.
 * Uses the bucket system: Base × (1 + midDiveUpgrades) × characterStatMultipliers
 *
 * @param baseDmg - Base weapon damage
 * @param fireRate - Base weapon fire rate
 * @param reloadTime - Base weapon reload time
 * @param clipSize - Weapon clip size
 * @param characterStats - Character stats (includes meta upgrades, class mods, etc.)
 * @param aggregatedUpgrades - Mid-dive upgrades aggregated by stat (additive bonuses)
 * @returns The calculated DPS with all upgrades applied
 */
export function calculateDPSWithAllUpgrades(
  baseDmg: number,
  fireRate: number,
  reloadTime: number,
  clipSize: number,
  characterStats: CharacterStats,
  aggregatedUpgrades: Partial<Record<Stat, number>>
): number {
  // Apply mid-dive upgrade bucket (additive) to base stats
  const midDiveDmgBonus = aggregatedUpgrades['dmg'] ?? 0
  const midDiveFireRateBonus = aggregatedUpgrades['fireRate'] ?? 0
  const midDiveReloadSpeedBonus = aggregatedUpgrades['reloadSpeed'] ?? 0

  const dmgWithMidDive = baseDmg * (1 + midDiveDmgBonus)
  const fireRateWithMidDive = fireRate * (1 + midDiveFireRateBonus)
  // Reload speed bonus reduces reload time
  const reloadTimeWithMidDive = reloadTime * (1 - midDiveReloadSpeedBonus)

  // Apply character stat multipliers (includes meta upgrades, class mods, etc.)
  const characterDamageMultiplier = characterStats.damage ?? 1.0
  const characterReloadSpeedMultiplier = characterStats.reloadSpeed ?? 1.0

  const finalDmg = dmgWithMidDive * characterDamageMultiplier
  const finalFireRate = fireRateWithMidDive
  const finalReloadTime = reloadTimeWithMidDive / characterReloadSpeedMultiplier

  // Calculate final DPS with crit stats
  return calculateDPS(
    finalDmg,
    finalFireRate,
    finalReloadTime,
    clipSize,
    characterStats.critChance,
    characterStats.critDamage
  )
}