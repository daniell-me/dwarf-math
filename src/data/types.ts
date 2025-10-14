export const Stat = {
  dmg: 'dmg',
  reloadSpeed: 'reloadSpeed',
  fireRate: 'fireRate',
  piercing: 'piercing',
  range: 'range',
  droneCount: 'droneCount',
  beamCount: 'beamCount',
  weaponLevel: 'weaponLevel',
  statusPotency: 'statusPotency',
  explosionRadius: 'explosionRadius',
  // Player stats
  maxHealth: 'maxHealth',
  armor: 'armor',
  critChance: 'critChance',
  critDamage: 'critDamage',
  miningSpeed: 'miningSpeed',
  moveSpeed: 'moveSpeed',
  dodgeChance: 'dodgeChance',
  pickupRadius: 'pickupRadius',
  xpGain: 'xpGain',
  reviveSpeed: 'reviveSpeed',
  luck: 'luck',
  statusDamage: 'statusDamage',
  // Weapon lifetime
  lifetime: 'lifetime'
} as const

export type Stat = typeof Stat[keyof typeof Stat]

export const WeaponTag = {
  projectile: 'projectile',
  kinetic: 'kinetic',
  all: 'all',
  beam: 'beam',
  drone: 'drone',
  acid: 'acid',
  electrical: 'electrical',
  fire: 'fire',
  cold: 'cold',
  plasma: 'plasma',
  explosive: 'explosive',
  throwable: 'throwable',
  turret: 'turret',
  light: 'light',
  medium: 'medium',
  heavy: 'heavy',
  construct: 'construct',
  lasting: 'lasting'
} as const

export type WeaponTag = typeof WeaponTag[keyof typeof WeaponTag]

export const Rarity = {
  common: 'common',
  uncommon: 'uncommon',
  rare: 'rare',
  epic: 'epic',
  legendary: 'legendary'
} as const

export type Rarity = typeof Rarity[keyof typeof Rarity]

export const rarities: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary']

export interface Weapon {
  id: string
  name: string
  baseDmg: number
  fireRate: number
  clipSize: number
  reloadTime: number
  tags: WeaponTag[]
  class: Class
}

export interface CharacterStats {
  health: number
  lifeRegen?: number
  armor?: number
  dodgeChance?: number
  moveSpeed?: number
  damage?: number
  fireRate?: number
  reloadSpeed?: number
  critChance: number
  critDamage: number
  statusDamage?: number
  pickupRadius?: number
  xpGain?: number
  miningSpeed?: number
  lifetime?: number
  weaponRange?: number
  explosionRadius?: number
}

export const UpgradeCategory = {
  weapon: 'weapon',     // Mid-dive upgrades that increase weapon level
  tag: 'tag',          // Mid-dive upgrades that affect weapons but don't level them
  player: 'player'     // Mid-dive upgrades for non-combat/utility stats
} as const

export type UpgradeCategory = typeof UpgradeCategory[keyof typeof UpgradeCategory]

export interface Upgrade {
  name: string
  stat: Stat
  tags: WeaponTag[]
  values: Partial<Record<Rarity, number>> | (number | null)[]  // Either old format or new array format [common, uncommon, rare, epic, legendary]
  category?: UpgradeCategory  // Optional for backwards compatibility
  description?: string
}

export const Class = {
  scout: 'Scout',
  gunner: 'Gunner',
  engineer: 'Engineer',
  driller: 'Driller',
} as const

export type Class = typeof Class[keyof typeof Class]

export interface ClassMod {
  name: string
  class: Class
  startingWeaponId: string
  availableWeaponTags: WeaponTag[]
  statMultipliers?: Partial<CharacterStats>
  conditionalEffects?: string[]
}

export interface MetaUpgrade {
  id: string
  name: string
  stat: string  // Can be CharacterStats key or non-combat stat
  maxLevel: number
  bonusValues: number[]  // Array of cumulative bonus values for each level (1-12)
  bonusType: 'percentage' | 'flat'
  description?: string
}