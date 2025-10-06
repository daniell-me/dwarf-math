import type { ClassMod } from './types'
import { Class } from './types'
import { weapons } from './weapons'
import { findWeaponByName } from '@/utils/weaponFunctions'

export const classMods: ClassMod[] = [
  // Scout Class Mods
  {
    name: 'Classic',
    class: Class.scout,
    startingWeapon: findWeaponByName(weapons, 'Deepcore GK2')
  },
  {
    name: 'Recon',
    class: Class.scout,
    startingWeapon: findWeaponByName(weapons, 'Jury-Rigged Boomstick')
  },
  {
    name: 'Sharp Shooter',
    class: Class.scout,
    startingWeapon: findWeaponByName(weapons, 'Zhukov NUK17')
  },

  // Gunner Class Mods
  {
    name: 'Weapons Specialist',
    class: Class.gunner,
    startingWeapon: findWeaponByName(weapons, 'Deepcore GK2')
  },
  {
    name: 'Juggernaut',
    class: Class.gunner,
    startingWeapon: findWeaponByName(weapons, 'Jury-Rigged Boomstick')
  },
  {
    name: 'Heavy Gunner',
    class: Class.gunner,
    startingWeapon: findWeaponByName(weapons, 'Zhukov NUK17')
  },

  // Engineer Class Mods
  {
    name: 'Maintenance Worker',
    class: Class.engineer,
    startingWeapon: findWeaponByName(weapons, 'Deepcore GK2')
  },
  {
    name: 'Tinkerer',
    class: Class.engineer,
    startingWeapon: findWeaponByName(weapons, 'Zhukov NUK17')
  },
  {
    name: 'Demolitionist',
    class: Class.engineer,
    startingWeapon: findWeaponByName(weapons, 'M1000 Classic')
  },

  // Driller Class Mods
  {
    name: 'Foreman',
    class: Class.driller,
    startingWeapon: findWeaponByName(weapons, 'Deepcore GK2')
  },
  {
    name: 'Interrogator',
    class: Class.driller,
    startingWeapon: findWeaponByName(weapons, 'Jury-Rigged Boomstick')
  },
  {
    name: 'Strong Armed',
    class: Class.driller,
    startingWeapon: findWeaponByName(weapons, 'M1000 Classic')
  }
]