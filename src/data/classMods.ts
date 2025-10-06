import type { ClassMod } from './types'
import { Dwarves } from './types'
import { weapons } from './weapons'
import { findWeaponByName } from '@/utils/weaponFunctions'

export const classMods: ClassMod[] = [
  // Gunner Class Mods
  {
    name: 'Gunner Mod 1',
    class: Dwarves.gunner,
    startingWeapon: findWeaponByName(weapons, 'Deepcore GK2')
  },
  {
    name: 'Gunner Mod 2',
    class: Dwarves.gunner,
    startingWeapon: findWeaponByName(weapons, 'Jury-Rigged Boomstick')
  },
  {
    name: 'Gunner Mod 3',
    class: Dwarves.gunner,
    startingWeapon: findWeaponByName(weapons, 'Zhukov NUK17')
  },

  // Scout Class Mods
  {
    name: 'Scout Mod 1',
    class: Dwarves.scout,
    startingWeapon: findWeaponByName(weapons, 'Deepcore GK2')
  },
  {
    name: 'Scout Mod 2',
    class: Dwarves.scout,
    startingWeapon: findWeaponByName(weapons, 'Jury-Rigged Boomstick')
  },
  {
    name: 'Scout Mod 3',
    class: Dwarves.scout,
    startingWeapon: findWeaponByName(weapons, 'Zhukov NUK17')
  },

  // Driller Class Mods
  {
    name: 'Driller Mod 1',
    class: Dwarves.driller,
    startingWeapon: findWeaponByName(weapons, 'Deepcore GK2')
  },
  {
    name: 'Driller Mod 2',
    class: Dwarves.driller,
    startingWeapon: findWeaponByName(weapons, 'Jury-Rigged Boomstick')
  },
  {
    name: 'Driller Mod 3',
    class: Dwarves.driller,
    startingWeapon: findWeaponByName(weapons, 'M1000 Classic')
  },

  // Engineer Class Mods
  {
    name: 'Engineer Mod 1',
    class: Dwarves.engineer,
    startingWeapon: findWeaponByName(weapons, 'Deepcore GK2')
  },
  {
    name: 'Engineer Mod 2',
    class: Dwarves.engineer,
    startingWeapon: findWeaponByName(weapons, 'Zhukov NUK17')
  },
  {
    name: 'Engineer Mod 3',
    class: Dwarves.engineer,
    startingWeapon: findWeaponByName(weapons, 'M1000 Classic')
  }
]