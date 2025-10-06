export const Stat = {
  dmg: 'dmg',
  reloadSpeed: 'reloadSpeed',
  fireRate: 'fireRate',
  piercing: 'piercing',
  range: 'range',
  droneCount: 'droneCount',
  beamCount: 'beamCount',
  weaponLevel: 'weaponLevel',
  statusPotency: 'statusPotency'
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
  turret: 'turret'
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

export interface Weapon {
  name: string
  baseDmg: number
  fireRate: number
  clipSize: number
  reloadTime: number
  tags: WeaponTag[]
}

export interface CharacterStats {
  critChance: number
  critDamage: number
}

export interface Upgrade {
  name: string
  stat: Stat
  tags: WeaponTag[]
  values: Partial<Record<Rarity, number>>
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
  startingWeapon: Weapon
  statModifications?: Partial<CharacterStats>
}