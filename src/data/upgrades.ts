import type { Upgrade } from './types'
import { Rarity, Stat, WeaponTag } from './types'

export const upgrades: Upgrade[] = [
  {
    name: 'Add Punch',
    stat: Stat.piercing,
    tags: [WeaponTag.projectile],
    values: {
      [Rarity.rare]: 25,
      [Rarity.epic]: 50,
    }
  },
  {
    name: 'Bigger Cogs',
    stat: Stat.dmg,
    tags: [WeaponTag.all],
    values: {
      [Rarity.common]: 10,
      [Rarity.uncommon]: 15,
      [Rarity.rare]: 25,
      [Rarity.epic]: 35,
      [Rarity.legendary]: 50
    }
  },
  {
    name: 'Loosen Bolts',
    stat: Stat.reloadSpeed,
    tags: [WeaponTag.all],
    values: {
      [Rarity.common]: 10,
      [Rarity.uncommon]: 15,
      [Rarity.rare]: 25,
      [Rarity.epic]: 35,
      [Rarity.legendary]: 50
    }
  },
  {
    name: 'More Drones!',
    stat: Stat.droneCount,
    tags: [WeaponTag.drone],
    values: {
      [Rarity.legendary]: 1
    }
  },
  {
    name: 'Open Valves',
    stat: Stat.range,
    tags: [WeaponTag.beam],
    values: {
      [Rarity.rare]: 10,
      [Rarity.epic]: 15,
      [Rarity.legendary]: 25
    }
  },
  {
    name: 'Paint Job',
    stat: Stat.weaponLevel,
    tags: [WeaponTag.all],
    values: {
      [Rarity.rare]: 2,
      [Rarity.epic]: 3,
    }
  },
  {
    name: 'Split Nozzles',
    stat: Stat.beamCount,
    tags: [WeaponTag.beam],
    values: {
      [Rarity.legendary]: 1
    }
  },
  {
    name: 'Tighten Springs',
    stat: Stat.fireRate,
    tags: [WeaponTag.projectile],
    values: {
      [Rarity.common]: 10,
      [Rarity.uncommon]: 15,
      [Rarity.rare]: 25,
      [Rarity.epic]: 35,
      [Rarity.legendary]: 50
    }
  },
  {
    name: 'Tweak Potency',
    stat: Stat.statusPotency,
    tags: [WeaponTag.acid, WeaponTag.electrical, WeaponTag.fire],
    values: {
      [Rarity.uncommon]: 15,
      [Rarity.rare]: 25,
      [Rarity.epic]: 35,
    }
  }
]