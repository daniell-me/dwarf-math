import type { Upgrade } from './types'
import { Rarity, Stat, WeaponTag, UpgradeCategory } from './types'

/**
 * UPGRADE STRUCTURE GUIDE
 *
 * All upgrades use a unified structure with the following properties:
 *
 * - name: Display name of the upgrade
 * - stat: The stat this upgrade affects (from Stat enum)
 * - tags: Array of weapon tags this upgrade applies to (e.g., [WeaponTag.all], [WeaponTag.beam])
 * - category: One of three types:
 *     - UpgradeCategory.weapon: Mid-dive upgrades that increase weapon level
 *     - UpgradeCategory.tag: Mid-dive upgrades that affect weapons but don't level them
 *     - UpgradeCategory.player: Mid-dive upgrades for non-combat/utility stats
 * - values: Array of 5 numbers (or null) representing [common, uncommon, rare, epic, legendary]
 *     - Use null for unavailable rarities
 *     - Percentages stored as decimals (0.10 = 10%, 0.50 = 50%)
 *     - Flat values stored as-is (e.g., 2 for +2 weapon levels, 12 for +12 armor)
 * - description (optional): Human-readable description of what the upgrade does
 *
 * Example:
 * {
 *   name: 'Bigger Cogs',
 *   stat: Stat.dmg,
 *   tags: [WeaponTag.all],
 *   category: UpgradeCategory.weapon,
 *   values: [0.10, 0.15, 0.25, 0.35, 0.50],  // 10%, 15%, 25%, 35%, 50%
 *   description: 'Increases damage of all weapons'
 * }
 */

// Weapon Upgrades - Mid-dive upgrades that increase weapon level
export const upgrades: Upgrade[] = [
  {
    name: 'Add Punch',
    stat: Stat.piercing,
    tags: [WeaponTag.projectile],
    category: UpgradeCategory.weapon,
    values: [null, null, 0.25, 0.50, null]
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.all],
    category: UpgradeCategory.weapon,
    values: [0.10, 0.15, 0.25, 0.35, 0.50]
  },
  {
    name: 'Loosen Bolts',
    stat: Stat.reloadSpeed,
    tags: [WeaponTag.all],
    category: UpgradeCategory.weapon,
    values: [0.10, 0.15, 0.25, 0.35, 0.50]
  },
  {
    name: 'More Drones!',
    stat: Stat.droneCount,
    tags: [WeaponTag.drone],
    category: UpgradeCategory.weapon,
    values: [null, null, null, null, 1]
  },
  {
    name: 'Open Valves',
    stat: Stat.range,
    tags: [WeaponTag.beam],
    category: UpgradeCategory.weapon,
    values: [null, null, 0.10, 0.15, 0.25]
  },
  {
    name: 'Paint Job',
    stat: Stat.weaponLevel,
    tags: [WeaponTag.all],
    category: UpgradeCategory.weapon,
    values: [null, null, 2, 3, null]
  },
  {
    name: 'Split Nozzles',
    stat: Stat.beamCount,
    tags: [WeaponTag.beam],
    category: UpgradeCategory.weapon,
    values: [null, null, null, null, 1]
  },
  {
    name: 'Tighten Springs',
    stat: Stat.fireRate,
    tags: [WeaponTag.projectile],
    category: UpgradeCategory.weapon,
    values: [0.10, 0.15, 0.25, 0.35, 0.50]
  },
  {
    name: 'Tweak Potency',
    stat: Stat.statusPotency,
    tags: [WeaponTag.acid, WeaponTag.electrical, WeaponTag.fire],
    category: UpgradeCategory.weapon,
    values: [null, 0.15, 0.25, 0.35, null]
  }
]

// Tag Upgrades - Tag Mastery and Weapon-affecting Player Stats
export const tagUpgrades: Upgrade[] = [
  // Apply Dwarf Tape - Increases weapon lifetime
  {
    name: 'Apply Dwarf Tape',
    stat: Stat.lifetime,
    tags: [WeaponTag.beam],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.20, 0.30, 0.40],
    description: 'Increases the expected lifetime of all [BEAM] weapons'
  },
  {
    name: 'Apply Dwarf Tape',
    stat: Stat.lifetime,
    tags: [WeaponTag.lasting],
    category: UpgradeCategory.tag,
    values: [null, null, 0.10, 0.15, 0.20],
    description: 'Increases the expected lifetime of all [LASTING] weapons'
  },
  {
    name: 'Apply Dwarf Tape',
    stat: Stat.lifetime,
    tags: [WeaponTag.drone],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.20, 0.30, 0.40],
    description: 'Increases the expected lifetime of all [DRONE] weapons'
  },

  // Bigger Cogs - Increases damage by element type
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.acid],
    category: UpgradeCategory.tag,
    values: [null, 0.07, 0.10, 0.15, 0.20],
    description: 'Increases damage of all [ACID] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.statusPotency,
    tags: [WeaponTag.acid],
    category: UpgradeCategory.tag,
    values: [null, 0.03, 0.05, 0.08, 0.10],
    description: 'Increases potency of all [ACID] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.beam],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [BEAM] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.cold],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [COLD] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.construct],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [CONSTRUCT] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.electrical],
    category: UpgradeCategory.tag,
    values: [null, 0.07, 0.10, 0.15, 0.20],
    description: 'Increases damage of all [ELECTRICAL] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.statusPotency,
    tags: [WeaponTag.electrical],
    category: UpgradeCategory.tag,
    values: [null, 0.03, 0.05, 0.08, 0.10],
    description: 'Increases potency of all [ELECTRICAL] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.explosive],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [EXPLOSIVE] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.fire],
    category: UpgradeCategory.tag,
    values: [null, 0.07, 0.10, 0.15, 0.20],
    description: 'Increases damage of all [FIRE] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.statusPotency,
    tags: [WeaponTag.fire],
    category: UpgradeCategory.tag,
    values: [null, 0.03, 0.05, 0.08, 0.10],
    description: 'Increases potency of all [FIRE] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.kinetic],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [KINETIC] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.plasma],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [PLASMA] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.drone],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [DRONE] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.projectile],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [PROJECTILE] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.throwable],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [THROWABLE] weapons'
  },

  // Compacted Powder - Increases explosion radius
  {
    name: 'Compacted Powder',
    stat: Stat.explosionRadius,
    tags: [WeaponTag.explosive],
    category: UpgradeCategory.tag,
    values: [null, null, 0.15, 0.20, 0.30],
    description: 'Increases explosion radius of all [EXPLOSIVE] weapons'
  },

  // Loosen Bolts - Increases reload speed by weapon weight class
  {
    name: 'Loosen Bolts',
    stat: Stat.reloadSpeed,
    tags: [WeaponTag.beam],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases reload speed of all [BEAM] weapons'
  },
  {
    name: 'Loosen Bolts',
    stat: Stat.reloadSpeed,
    tags: [WeaponTag.light],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases reload speed of all [LIGHT] weapons'
  },
  {
    name: 'Loosen Bolts',
    stat: Stat.reloadSpeed,
    tags: [WeaponTag.medium],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases reload speed of all [MEDIUM] weapons'
  },
  {
    name: 'Loosen Bolts',
    stat: Stat.reloadSpeed,
    tags: [WeaponTag.heavy],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases reload speed of all [HEAVY] weapons'
  },
  {
    name: 'Loosen Bolts',
    stat: Stat.reloadSpeed,
    tags: [WeaponTag.throwable],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases reload speed of all [THROWABLE] weapons'
  },

  // Weapon-affecting player stat upgrades (apply to all weapons)
  {
    name: 'Body Shots',
    stat: Stat.dmg,
    tags: [WeaponTag.all],
    category: UpgradeCategory.tag,
    values: [null, 0.05, 0.10, 0.15, 0.20],
    description: 'Increases damage to all weapons'
  },
  {
    name: 'Careful Aim',
    stat: Stat.critChance,
    tags: [WeaponTag.all],
    category: UpgradeCategory.tag,
    values: [0.03, 0.06, 0.09, 0.12, 0.15],
    description: 'Increases critical hit chance'
  },
  {
    name: 'Fast Hands',
    stat: Stat.reloadSpeed,
    tags: [WeaponTag.all],
    category: UpgradeCategory.tag,
    values: [0.03, 0.06, 0.09, 0.12, 0.18],
    description: 'Increases reload speed'
  },
  {
    name: 'Open Valves',
    stat: Stat.range,
    tags: [WeaponTag.beam],
    category: UpgradeCategory.tag,
    values: [null, null, 0.10, 0.15, 0.25],
    description: 'Increases the range of all [BEAM] weapons'
  },
  {
    name: 'Tighten Springs',
    stat: Stat.fireRate,
    tags: [WeaponTag.projectile],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.20, 0.30, 0.40],
    description: 'Increases fire rate of all [PROJECTILE] weapons'
  },
  {
    name: 'Up the Voltage',
    stat: Stat.critChance,
    tags: [WeaponTag.electrical],
    category: UpgradeCategory.tag,
    values: [null, null, 0.12, 0.18, null],
    description: 'Increase all critical chance of all [ELECTRICAL] weapons'
  },
]

// Player Upgrades - Non-combat and Utility Stats
export const playerUpgrades: Upgrade[] = [
  {
    name: 'Dwarven Heritage',
    stat: Stat.miningSpeed,
    tags: [],
    category: UpgradeCategory.player,
    values: [null, 0.05, 0.10, 0.15, 0.25],
    description: 'Increases mining speed'
  },
  {
    name: 'Extra Padding',
    stat: Stat.armor,
    tags: [],
    category: UpgradeCategory.player,
    values: [null, 3, 6, 9, 12],
    description: 'Increases armor'
  },
  {
    name: 'Extra Rations',
    stat: Stat.maxHealth,
    tags: [],
    category: UpgradeCategory.player,
    values: [10, 20, 35, 50, 70],
    description: 'Increases max HP'
  },
  {
    name: 'Fast Little Legs',
    stat: Stat.moveSpeed,
    tags: [],
    category: UpgradeCategory.player,
    values: [0.02, 0.04, 0.06, 0.09, 0.12],
    description: 'Increases movement speed'
  },
  {
    name: 'Getting Lucky',
    stat: Stat.luck,
    tags: [],
    category: UpgradeCategory.player,
    values: [null, null, 5, 10, null],
    description: 'Increases luck'
  },
  {
    name: 'Learn on the Job',
    stat: Stat.xpGain,
    tags: [],
    category: UpgradeCategory.player,
    values: [null, null, 0.10, 0.15, 0.20],
    description: 'Increases XP gain'
  },
  {
    name: 'Mind Blowing',
    stat: Stat.critDamage,
    tags: [],
    category: UpgradeCategory.player,
    values: [0.05, 0.10, 0.15, 0.25, 0.50],
    description: 'Increases critical damage'
  },
  {
    name: 'Pocket Magnets',
    stat: Stat.pickupRadius,
    tags: [],
    category: UpgradeCategory.player,
    values: [null, 0.15, 0.30, 0.45, 0.60],
    description: 'Increases pickup radius'
  },
  {
    name: 'Offensive Chemistry',
    stat: Stat.statusDamage,
    tags: [],
    category: UpgradeCategory.player,
    values: [null, 0.10, 0.20, 0.30, 0.40],
    description: 'Increases status effect damage'
  }
]