/**
 * Stat system - single source of truth for every stat the game models.
 *
 * StatId is the vocabulary shared by weapon base stats, upgrades, class mods,
 * meta upgrades, gear, and overclocks. Aggregation: collect every contribution
 * for a stat key, run them through that stat's bucketing function.
 */

// Bucketing function type - combines multiple stat values
export type BucketingFunction = (values: number[]) => number

// Bucketing functions
export const bucketingFunctions = {
  // Additive: sum all values
  additive: (values: number[]): number => {
    return values.reduce((sum, val) => sum + val, 0)
  },

  // Multiplicative: multiply all (1 + value) factors together, then subtract 1
  // e.g., [0.1, 0.2] -> (1.1 * 1.2) - 1 = 0.32 (32% total)
  multiplicative: (values: number[]): number => {
    const multiplier = values.reduce((product, val) => product * (1 + val), 1)
    return multiplier - 1
  }
} as const

export type BucketingFunctionName = keyof typeof bucketingFunctions

// Stat definition interface
export interface StatDefinition {
  id: string // Code reference (e.g., 'health', 'damage')
  name: string // Display name (e.g., 'Max HP', 'Damage')
  displayFormat: string // Format string with {value} placeholder (e.g., '+{value}%', '{value}')
  bucketingFunction: BucketingFunctionName // How to combine multiple values
}

// Format a stat value for display
export function formatStatValue(stat: StatDefinition, value: number): string {
  // Round based on the value magnitude
  let formattedValue: string

  if (Math.abs(value) >= 100) {
    formattedValue = Math.round(value).toString()
  } else if (Math.abs(value) >= 10) {
    formattedValue = value.toFixed(1)
  } else if (Math.abs(value) >= 1) {
    formattedValue = value.toFixed(2)
  } else {
    formattedValue = value.toFixed(3)
  }

  return stat.displayFormat.replace('{value}', formattedValue)
}

// All stat definitions
export const statDefinitions: Record<string, StatDefinition> = {
  // Health and survivability
  health: {
    id: 'health',
    name: 'Max HP',
    displayFormat: '{value}',
    bucketingFunction: 'additive'
  },
  lifeRegen: {
    id: 'lifeRegen',
    name: 'Life Regen',
    displayFormat: '{value}/s',
    bucketingFunction: 'additive'
  },
  armor: {
    id: 'armor',
    name: 'Armor',
    displayFormat: '{value}',
    bucketingFunction: 'additive'
  },
  dodgeChance: {
    id: 'dodgeChance',
    name: 'Dodge',
    displayFormat: '{value}%',
    bucketingFunction: 'additive'
  },

  // Movement
  moveSpeed: {
    id: 'moveSpeed',
    name: 'Move Speed',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },

  // Damage / firing
  damage: {
    id: 'damage',
    name: 'Damage',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  fireRate: {
    id: 'fireRate',
    name: 'Fire Rate',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  reloadSpeed: {
    id: 'reloadSpeed',
    name: 'Reload Speed',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  reloadTime: {
    // Lives in weapon baseStats. Upgrades target reloadSpeed; reloadTime is the
    // base scalar the calc reduces by (1 + sum_of_reloadSpeed_bonuses).
    id: 'reloadTime',
    name: 'Reload Time',
    displayFormat: '{value}s',
    bucketingFunction: 'additive'
  },
  clipSize: {
    id: 'clipSize',
    name: 'Clip Size',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },

  // Combat
  critChance: {
    id: 'critChance',
    name: 'Critical Chance',
    displayFormat: '{value}%',
    bucketingFunction: 'additive'
  },
  critDamage: {
    id: 'critDamage',
    name: 'Critical Damage',
    displayFormat: '{value}x',
    bucketingFunction: 'additive'
  },
  statusDamage: {
    id: 'statusDamage',
    name: 'Status Effect Damage',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  potency: {
    id: 'potency',
    name: 'Potency',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  piercing: {
    id: 'piercing',
    name: 'Piercing',
    // Wiki "+100% Piercing" on a base-4 weapon doubles to 8 — multiplicative.
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  projectilesPerShot: {
    id: 'projectilesPerShot',
    name: 'Projectiles',
    displayFormat: '+{value}',
    bucketingFunction: 'additive'
  },

  // Utility
  pickupRadius: {
    id: 'pickupRadius',
    name: 'Pickup Radius',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  xpGain: {
    id: 'xpGain',
    name: 'XP Gain',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  miningSpeed: {
    id: 'miningSpeed',
    name: 'Mining Speed',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  luck: {
    id: 'luck',
    name: 'Luck',
    displayFormat: '+{value}',
    bucketingFunction: 'additive'
  },

  // Weapon-shape-specific
  range: {
    id: 'range',
    name: 'Range',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  explosionRadius: {
    id: 'explosionRadius',
    name: 'Explosion Radius',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  groundzoneRadius: {
    id: 'groundzoneRadius',
    name: 'Groundzone Radius',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  lifetime: {
    id: 'lifetime',
    name: 'Lifetime',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  droneCount: {
    id: 'droneCount',
    name: 'Drones',
    displayFormat: '+{value}',
    bucketingFunction: 'additive'
  },
  beamCount: {
    id: 'beamCount',
    name: 'Beams',
    displayFormat: '+{value}',
    bucketingFunction: 'additive'
  },
  turretCap: {
    id: 'turretCap',
    name: 'Turret Cap',
    displayFormat: '+{value}',
    bucketingFunction: 'additive'
  },
  weaponLevel: {
    id: 'weaponLevel',
    name: 'Weapon Level',
    displayFormat: '+{value}',
    bucketingFunction: 'additive'
  }
}

// Helper to get all stat IDs in a specific order
export const orderedStatIds = [
  // Player survivability
  'health',
  'lifeRegen',
  'armor',
  'dodgeChance',
  'moveSpeed',
  // Weapon damage/firing
  'damage',
  'fireRate',
  'reloadSpeed',
  'reloadTime',
  'clipSize',
  // Combat
  'critChance',
  'critDamage',
  'statusDamage',
  'potency',
  'piercing',
  'projectilesPerShot',
  // Utility
  'pickupRadius',
  'xpGain',
  'miningSpeed',
  'luck',
  // Weapon-shape-specific
  'range',
  'explosionRadius',
  'groundzoneRadius',
  'lifetime',
  'droneCount',
  'beamCount',
  'turretCap',
  'weaponLevel'
] as const

export type StatId = typeof orderedStatIds[number]
