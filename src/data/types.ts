import type { StatId } from './statDefinitions'

export const WeaponTag = {
  // Damage types
  kinetic: 'kinetic',
  acid: 'acid',
  electric: 'electric',
  fire: 'fire',
  cold: 'cold',
  plasma: 'plasma',
  // Weight classes
  light: 'light',
  medium: 'medium',
  heavy: 'heavy',
  // Weapon types
  projectile: 'projectile',
  beam: 'beam',
  drone: 'drone',
  turret: 'turret',
  construct: 'construct',
  throwable: 'throwable',
  explosive: 'explosive',
  groundzone: 'groundzone',
  // Firing styles
  precise: 'precise',
  spray: 'spray',
  area: 'area',
  lasting: 'lasting',
  // Role
  sidearm: 'sidearm',
  // Added by "The Favourite" overclock (granted via tagChange, deferred)
  favourite: 'favourite',
  // Generic
  all: 'all'
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

export type Targeting = 'closest' | 'highestHp' | 'random' | 'lowestHp' | 'moveDirection'

export type FiringPattern =
  | { type: 'burst', roundsPerVolley: number }

// Effects: shared vocabulary for what an overclock, mid-dive upgrade, or
// class-mod bonus actually does. Modeling depth is leveled — pure stat /
// tag / targeting changes are fully modeled; complex mechanics drop into
// `custom` with a description until the sim needs to interpret them.
export type Effect =
  | { kind: 'stat'; stat: StatId; value: number }
  | { kind: 'taggedStat'; stat: StatId; value: number; tags: WeaponTag[] }  // applies only to weapons with ANY of these tags
  | { kind: 'tagChange'; remove?: WeaponTag[]; add?: WeaponTag[] }
  | { kind: 'targeting'; targeting: Targeting }
  | { kind: 'crossWeapon'; effects: Effect[] }   // applies to OTHER weapons
  | { kind: 'custom'; description: string }       // catchall for unmodeled mechanics

export type OverclockTier = 'balanced' | 'unstable'

export interface Overclock {
  id: string
  name: string
  tier: OverclockTier
  weaponIds: string[]   // weapons whose pools include this OC (most are 1, some shared)
  effects: Effect[]
  description?: string  // human-readable from the wiki
}

export interface Weapon {
  id: string
  name: string
  class: Class
  tags: WeaponTag[]
  baseStats: Partial<Record<StatId, number>>
  targeting?: Targeting
  knockback?: boolean
  firingPattern?: FiringPattern
  // groundzone shape deferred — see PLAN.md notes
  // overclocks deferred — own pass
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
  stat: StatId
  tags: WeaponTag[]
  // [common, uncommon, rare, epic, legendary] — null for unavailable rarities
  values: (number | null)[] | Partial<Record<Rarity, number>>
  category?: UpgradeCategory
  description?: string
}

export const Class = {
  scout: 'Scout',
  gunner: 'Gunner',
  engineer: 'Engineer',
  driller: 'Driller',
  demolisher: 'Demolisher',
} as const

export type Class = typeof Class[keyof typeof Class]

export type ArtifactRarity = 'rare' | 'epic'

export interface Artifact {
  id: string
  name: string
  rarity: ArtifactRarity
  effects: Effect[]
  description: string  // verbatim wiki effect text
}

export interface ClassMod {
  name: string
  class: Class
  startingWeaponId: string
  availableWeaponTags: WeaponTag[]
  effects: Effect[]
}

// Account-level meta-progression IDs. Not stats in the StatId sense (no bucketing) —
// they're initial-state inputs to a dive (starting resources, reroll count). Kept
// alongside StatId in MetaUpgrade because the UI treats all meta-progression
// entries uniformly; downstream consumers (DPS calc, sim) decide which IDs are
// relevant for each bucket.
export type AccountStatId = 'startingNitra' | 'startingGold' | 'artifactRerolls'

export interface MetaUpgrade {
  id: string
  name: string
  statId: StatId | AccountStatId
  maxLevel: number
  bonusValues: number[]  // one entry per level (1..maxLevel)
  description?: string
}
