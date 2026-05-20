import type { Upgrade } from './types'
import { WeaponTag, UpgradeCategory } from './types'

/**
 * UPGRADE STRUCTURE
 *
 * - name: Display name
 * - stat: StatId from statDefinitions
 * - tags: weapon tags this upgrade applies to (e.g. [WeaponTag.all], [WeaponTag.beam])
 * - category:
 *     - weapon: mid-dive upgrades that increase weapon level
 *     - tag:    mid-dive upgrades that affect weapons but don't level them
 *     - player: mid-dive upgrades for non-combat/utility stats
 * - values: 5 entries [common, uncommon, rare, epic, legendary]; null = unavailable.
 *     Percentages stored as decimals (0.10 = 10%). Flat values stored as-is.
 */

export const allUpgrades: Upgrade[] = [
  // ===== WEAPON UPGRADES — Mid-dive upgrades that increase weapon level =====
  {
    name: 'Add Punch',
    stat: 'piercing',
    tags: [WeaponTag.projectile],
    category: UpgradeCategory.weapon,
    values: [null, null, 0.25, 0.50, null],
    description: 'Increases piercing of all [PROJECTILE] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'damage',
    tags: [WeaponTag.all],
    category: UpgradeCategory.weapon,
    values: [0.10, 0.15, 0.25, 0.35, 0.50],
    description: 'Increases damage of all weapons'
  },
  {
    name: 'Loosen Bolts',
    stat: 'reloadSpeed',
    tags: [WeaponTag.all],
    category: UpgradeCategory.weapon,
    values: [0.10, 0.15, 0.25, 0.35, 0.50],
    description: 'Increases reload speed of all weapons'
  },
  {
    name: 'More Drones!',
    stat: 'droneCount',
    tags: [WeaponTag.drone],
    category: UpgradeCategory.weapon,
    values: [null, null, null, null, 1],
    description: 'Adds an additional drone to all [DRONE] weapons'
  },
  {
    name: 'Open Valves',
    stat: 'range',
    tags: [WeaponTag.beam],
    category: UpgradeCategory.weapon,
    values: [null, null, 0.10, 0.15, 0.25],
    description: 'Increases the range of all [BEAM] weapons'
  },
  {
    name: 'Paint Job',
    stat: 'weaponLevel',
    tags: [WeaponTag.all],
    category: UpgradeCategory.weapon,
    values: [null, null, 2, 3, null],
    description: 'Increases weapon level of all weapons'
  },
  {
    name: 'Split Nozzles',
    stat: 'beamCount',
    tags: [WeaponTag.beam],
    category: UpgradeCategory.weapon,
    values: [null, null, null, null, 1],
    description: 'Adds an additional beam to all [BEAM] weapons'
  },
  {
    name: 'Tighten Springs',
    stat: 'fireRate',
    tags: [WeaponTag.projectile],
    category: UpgradeCategory.weapon,
    values: [0.10, 0.15, 0.25, 0.35, 0.50],
    description: 'Increases fire rate of all [PROJECTILE] weapons'
  },
  {
    name: 'Tweak Potency',
    stat: 'potency',
    tags: [WeaponTag.acid, WeaponTag.electric, WeaponTag.fire],
    category: UpgradeCategory.weapon,
    values: [null, 0.15, 0.25, 0.35, null],
    description: 'Increases status potency of all [ACID], [ELECTRIC], and [FIRE] weapons'
  },

  // ===== TAG UPGRADES — Tag Mastery and Weapon-affecting Player Stats =====
  {
    name: 'Apply Dwarf Tape',
    stat: 'lifetime',
    tags: [WeaponTag.beam],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.20, 0.30, 0.40],
    description: 'Increases the expected lifetime of all [BEAM] weapons'
  },
  {
    name: 'Apply Dwarf Tape',
    stat: 'lifetime',
    tags: [WeaponTag.lasting],
    category: UpgradeCategory.tag,
    values: [null, null, 0.10, 0.15, 0.20],
    description: 'Increases the expected lifetime of all [LASTING] weapons'
  },
  {
    name: 'Apply Dwarf Tape',
    stat: 'lifetime',
    tags: [WeaponTag.drone],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.20, 0.30, 0.40],
    description: 'Increases the expected lifetime of all [DRONE] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'damage',
    tags: [WeaponTag.acid],
    category: UpgradeCategory.tag,
    values: [null, 0.07, 0.10, 0.15, 0.20],
    description: 'Increases damage of all [ACID] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'potency',
    tags: [WeaponTag.acid],
    category: UpgradeCategory.tag,
    values: [null, 0.03, 0.05, 0.08, 0.10],
    description: 'Increases potency of all [ACID] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'damage',
    tags: [WeaponTag.beam],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [BEAM] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'damage',
    tags: [WeaponTag.cold],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [COLD] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'damage',
    tags: [WeaponTag.electric],
    category: UpgradeCategory.tag,
    values: [null, 0.07, 0.10, 0.15, 0.20],
    description: 'Increases damage of all [ELECTRIC] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'potency',
    tags: [WeaponTag.electric],
    category: UpgradeCategory.tag,
    values: [null, 0.03, 0.05, 0.08, 0.10],
    description: 'Increases potency of all [ELECTRIC] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'damage',
    tags: [WeaponTag.fire],
    category: UpgradeCategory.tag,
    values: [null, 0.07, 0.10, 0.15, 0.20],
    description: 'Increases damage of all [FIRE] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'potency',
    tags: [WeaponTag.fire],
    category: UpgradeCategory.tag,
    values: [null, 0.03, 0.05, 0.08, 0.10],
    description: 'Increases potency of all [FIRE] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'damage',
    tags: [WeaponTag.kinetic],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [KINETIC] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'damage',
    tags: [WeaponTag.drone],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [DRONE] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'damage',
    tags: [WeaponTag.projectile],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [PROJECTILE] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'damage',
    tags: [WeaponTag.throwable],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases damage of all [THROWABLE] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'damage',
    tags: [WeaponTag.sidearm],
    category: UpgradeCategory.tag,
    values: [null, null, 0.30, 0.40, 0.60],
    description: 'Increases damage of all [SIDEARM] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'damage',
    tags: [WeaponTag.groundzone],
    category: UpgradeCategory.tag,
    values: [null, null, null, 0.30, null],
    description: 'Increases damage of all [GROUNDZONE] weapons'
  },
  {
    name: 'Bigger Cogs',
    stat: 'damage',
    tags: [WeaponTag.favourite],
    category: UpgradeCategory.tag,
    values: [null, null, 0.20, 0.30, null],
    description: 'Increases damage of all [FAVOURITE] weapons'
  },
  {
    name: 'Overflow',
    stat: 'groundzoneRadius',
    tags: [WeaponTag.groundzone],
    category: UpgradeCategory.tag,
    values: [null, null, null, 0.20, 0.30],
    description: 'Increases groundzone radius of all [GROUNDZONE] weapons'
  },
  {
    name: 'Compacted Powder',
    stat: 'explosionRadius',
    tags: [WeaponTag.explosive],
    category: UpgradeCategory.tag,
    values: [null, null, 0.15, 0.20, 0.30],
    description: 'Increases explosion radius of all [EXPLOSIVE] weapons'
  },
  {
    name: 'Loosen Bolts',
    stat: 'reloadSpeed',
    tags: [WeaponTag.beam],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases reload speed of all [BEAM] weapons'
  },
  {
    name: 'Loosen Bolts',
    stat: 'reloadSpeed',
    tags: [WeaponTag.light],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases reload speed of all [LIGHT] weapons'
  },
  {
    name: 'Loosen Bolts',
    stat: 'reloadSpeed',
    tags: [WeaponTag.medium],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases reload speed of all [MEDIUM] weapons'
  },
  {
    name: 'Loosen Bolts',
    stat: 'reloadSpeed',
    tags: [WeaponTag.heavy],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases reload speed of all [HEAVY] weapons'
  },
  {
    name: 'Loosen Bolts',
    stat: 'reloadSpeed',
    tags: [WeaponTag.throwable],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.15, 0.20, 0.30],
    description: 'Increases reload speed of all [THROWABLE] weapons'
  },

  // Weapon-affecting player stat upgrades (apply to all weapons)
  {
    name: 'Body Shots',
    stat: 'damage',
    tags: [WeaponTag.all],
    category: UpgradeCategory.tag,
    values: [null, 0.05, 0.10, 0.15, 0.20],
    description: 'Increases damage to all weapons'
  },
  {
    name: 'Careful Aim',
    stat: 'critChance',
    tags: [WeaponTag.all],
    category: UpgradeCategory.tag,
    values: [0.03, 0.06, 0.09, 0.12, 0.15],
    description: 'Increases critical hit chance'
  },
  {
    name: 'Fast Hands',
    stat: 'reloadSpeed',
    tags: [WeaponTag.all],
    category: UpgradeCategory.tag,
    values: [0.03, 0.06, 0.09, 0.12, 0.18],
    description: 'Increases reload speed'
  },
  {
    name: 'Open Valves',
    stat: 'range',
    tags: [WeaponTag.beam],
    category: UpgradeCategory.tag,
    values: [null, null, 0.10, 0.15, 0.25],
    description: 'Increases the range of all [BEAM] weapons'
  },
  {
    name: 'Tighten Springs',
    stat: 'fireRate',
    tags: [WeaponTag.projectile],
    category: UpgradeCategory.tag,
    values: [null, 0.10, 0.20, 0.30, 0.40],
    description: 'Increases fire rate of all [PROJECTILE] weapons'
  },
  {
    name: 'Tighten Springs',
    stat: 'fireRate',
    tags: [WeaponTag.spray],
    category: UpgradeCategory.tag,
    values: [null, null, null, 0.40, 0.50],
    description: 'Increases fire rate of all [SPRAY] weapons'
  },
  {
    name: 'Up the Voltage',
    stat: 'critChance',
    tags: [WeaponTag.electric],
    category: UpgradeCategory.tag,
    values: [null, null, 0.12, 0.18, null],
    description: 'Increase all critical chance of all [ELECTRIC] weapons'
  },

  // ===== PLAYER UPGRADES — Non-combat and Utility Stats =====
  {
    name: 'Dwarven Heritage',
    stat: 'miningSpeed',
    tags: [],
    category: UpgradeCategory.player,
    values: [null, 0.05, 0.10, 0.15, 0.25],
    description: 'Increases mining speed'
  },
  {
    name: 'Extra Padding',
    stat: 'armor',
    tags: [],
    category: UpgradeCategory.player,
    values: [null, 3, 6, 9, 12],
    description: 'Increases armor'
  },
  {
    name: 'Extra Rations',
    stat: 'health',
    tags: [],
    category: UpgradeCategory.player,
    values: [15, 30, 45, 60, 80],
    description: 'Increases max HP'
  },
  {
    name: 'Fast Little Legs',
    stat: 'moveSpeed',
    tags: [],
    category: UpgradeCategory.player,
    values: [0.02, 0.04, 0.06, 0.09, 0.12],
    description: 'Increases movement speed'
  },
  {
    name: 'Getting Lucky',
    stat: 'luck',
    tags: [],
    category: UpgradeCategory.player,
    values: [null, null, 5, 10, null],
    description: 'Increases luck'
  },
  {
    name: 'Learn on the Job',
    stat: 'xpGain',
    tags: [],
    category: UpgradeCategory.player,
    values: [null, null, 0.10, 0.15, 0.20],
    description: 'Increases XP gain'
  },
  {
    name: 'Mind Blowing',
    stat: 'critDamage',
    tags: [],
    category: UpgradeCategory.player,
    values: [0.05, 0.10, 0.15, 0.25, 0.50],
    description: 'Increases critical damage'
  },
  {
    name: 'Pocket Magnets',
    stat: 'pickupRadius',
    tags: [],
    category: UpgradeCategory.player,
    values: [null, 0.15, 0.30, 0.45, 0.60],
    description: 'Increases pickup radius'
  },
  {
    name: 'Offensive Chemistry',
    stat: 'statusDamage',
    tags: [],
    category: UpgradeCategory.player,
    values: [null, 0.10, 0.20, 0.30, 0.40],
    description: 'Increases status effect damage'
  }
]

// Convenience exports — filtered by category
export const weaponUpgrades = allUpgrades.filter(u => u.category === UpgradeCategory.weapon)
export const tagUpgrades = allUpgrades.filter(u => u.category === UpgradeCategory.tag)
export const playerUpgrades = allUpgrades.filter(u => u.category === UpgradeCategory.player)
