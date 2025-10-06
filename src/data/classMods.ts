import type { ClassMod } from './types'
import { Dwarves } from './types'
import { weapons } from './weapons'
import { findWeaponByName } from '@/utils/weaponFunctions'

export const classMods: ClassMod[] = [
  // Gunner Class Mods
  {
    name: 'Weapons Specialist',
    class: Dwarves.gunner,
    startingWeapon: findWeaponByName(weapons, 'Deepcore GK2')
  },
  {
    name: 'Juggernaut',
    class: Dwarves.gunner,
    startingWeapon: findWeaponByName(weapons, 'Jury-Rigged Boomstick')
  },
  {
    name: 'Heavy Gunner',
    class: Dwarves.gunner,
    startingWeapon: findWeaponByName(weapons, 'Zhukov NUK17')
  },

  // Scout Class Mods
  {
    name: 'Classic',
    class: Dwarves.scout,
    startingWeapon: findWeaponByName(weapons, 'Deepcore GK2')
  },
  {
    name: 'Recon',
    class: Dwarves.scout,
    startingWeapon: findWeaponByName(weapons, 'Jury-Rigged Boomstick')
  },
  {
    name: 'Sharp Shooter',
    class: Dwarves.scout,
    startingWeapon: findWeaponByName(weapons, 'Zhukov NUK17')
  },

  // Driller Class Mods
  {
    name: 'Foreman',
    class: Dwarves.driller,
    startingWeapon: findWeaponByName(weapons, 'Deepcore GK2')
  },
  {
    name: 'Interrogator',
    class: Dwarves.driller,
    startingWeapon: findWeaponByName(weapons, 'Jury-Rigged Boomstick')
  },
  {
    name: 'Strong Armed',
    class: Dwarves.driller,
    startingWeapon: findWeaponByName(weapons, 'M1000 Classic')
  },

  // Engineer Class Mods
  {
    name: 'Maintenance Worker',
    class: Dwarves.engineer,
    startingWeapon: findWeaponByName(weapons, 'Deepcore GK2')
  },
  {
    name: 'Tinkerer',
    class: Dwarves.engineer,
    startingWeapon: findWeaponByName(weapons, 'Zhukov NUK17')
  },
  {
    name: 'Demolitionist',
    class: Dwarves.engineer,
    startingWeapon: findWeaponByName(weapons, 'M1000 Classic')
  }
]