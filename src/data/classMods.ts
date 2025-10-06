import type { ClassMod } from './types'
import { Class, WeaponTag } from './types'
import { WeaponIds } from './weapons'

export const classMods: ClassMod[] = [
  // Scout Class Mods
  {
    name: 'Classic',
    class: Class.scout,
    startingWeaponId: WeaponIds.gk2,
    availableWeaponTags: []
  },
  {
    name: 'Recon',
    class: Class.scout,
    startingWeaponId: WeaponIds.boomstick,
    availableWeaponTags: [WeaponTag.light]
  },
  {
    name: 'Sharp Shooter',
    class: Class.scout,
    startingWeaponId: WeaponIds.zhukov,
    availableWeaponTags: []
  },

  // Gunner Class Mods
  {
    name: 'Weapons Specialist',
    class: Class.gunner,
    startingWeaponId: WeaponIds.gk2,
    availableWeaponTags: [WeaponTag.projectile]
  },
  {
    name: 'Juggernaut',
    class: Class.gunner,
    startingWeaponId: WeaponIds.boomstick,
    availableWeaponTags: []
  },
  {
    name: 'Heavy Gunner',
    class: Class.gunner,
    startingWeaponId: WeaponIds.zhukov,
    availableWeaponTags: [WeaponTag.heavy]
  },

  // Engineer Class Mods
  {
    name: 'Maintenance Worker',
    class: Class.engineer,
    startingWeaponId: WeaponIds.gk2,
    availableWeaponTags: [WeaponTag.construct]
  },
  {
    name: 'Tinkerer',
    class: Class.engineer,
    startingWeaponId: WeaponIds.zhukov,
    availableWeaponTags: []
  },
  {
    name: 'Demolitionist',
    class: Class.engineer,
    startingWeaponId: WeaponIds.m1000,
    availableWeaponTags: [WeaponTag.explosive]
  },

  // Driller Class Mods
  {
    name: 'Foreman',
    class: Class.driller,
    startingWeaponId: WeaponIds.gk2,
    availableWeaponTags: []
  },
  {
    name: 'Interrogator',
    class: Class.driller,
    startingWeaponId: WeaponIds.boomstick,
    availableWeaponTags: [WeaponTag.fire, WeaponTag.acid]
  },
  {
    name: 'Strong Armed',
    class: Class.driller,
    startingWeaponId: WeaponIds.m1000,
    availableWeaponTags: [WeaponTag.throwable]
  }
]