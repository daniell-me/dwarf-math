/**
 * New stat system - parallel implementation
 * This will eventually replace the current CharacterStats interface
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

  // Damage stats
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
  lifetime: {
    id: 'lifetime',
    name: 'Lifetime',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },

  // Weapon-specific stats (not typically on player)
  weaponRange: {
    id: 'weaponRange',
    name: 'Range',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  },
  explosionRadius: {
    id: 'explosionRadius',
    name: 'Explosion Radius',
    displayFormat: '+{value}%',
    bucketingFunction: 'multiplicative'
  }
}

// Helper to get all stat IDs in a specific order
export const orderedStatIds = [
  'health',
  'lifeRegen',
  'armor',
  'dodgeChance',
  'moveSpeed',
  'damage',
  'fireRate',
  'reloadSpeed',
  'critChance',
  'critDamage',
  'statusDamage',
  'pickupRadius',
  'xpGain',
  'miningSpeed',
  'lifetime'
] as const

export type StatId = typeof orderedStatIds[number]
