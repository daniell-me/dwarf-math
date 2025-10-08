import type { ClassMod } from './types'
import { Class, WeaponTag } from './types'
import { WeaponIds } from './weapons'

export const classMods: ClassMod[] = [
  // Scout Class Mods
  {
    name: 'Classic',
    class: Class.scout,
    startingWeaponId: WeaponIds.gk2,
    availableWeaponTags: [],
    statMultipliers: {
      moveSpeed: 0.10,
      health: 0.15
    }
  },
  {
    name: 'Recon',
    class: Class.scout,
    startingWeaponId: WeaponIds.zhukov,
    availableWeaponTags: [WeaponTag.light],
    statMultipliers: {
      dodgeChance: 0.25
    },
    conditionalEffects: [
      'Upon dodging: +35% Move Speed and +35% Reload Speed for 5 seconds'
    ]
  },
  {
    name: 'Sharp Shooter',
    class: Class.scout,
    startingWeaponId: WeaponIds.m1000,
    availableWeaponTags: [],
    statMultipliers: {
      critChance: 0.15,
      critDamage: 0.50
    },
    conditionalEffects: [
      'Shrapnel explosion occurs when dealing overkill damage'
    ]
  },

  // Gunner Class Mods
  {
    name: 'Weapons Specialist',
    class: Class.gunner,
    startingWeaponId: WeaponIds.minigun,
    availableWeaponTags: [WeaponTag.projectile],
    conditionalEffects: [
      'After firing 100 shots from Projectile weapons: Fire 8 high damage projectiles in all directions'
    ]
  },
  {
    name: 'Juggernaut',
    class: Class.gunner,
    startingWeaponId: WeaponIds.bulldog,
    availableWeaponTags: [],
    statMultipliers: {
      armor: 10,  // Flat bonus, not percentage
      health: 0.50,
      weaponRange: -0.50
    },
    conditionalEffects: [
      'After taking damage: +10% damage for 10 seconds (stacks up to 5 times)'
    ]
  },
  {
    name: 'Heavy Gunner',
    class: Class.gunner,
    startingWeaponId: WeaponIds.thunderhead,
    availableWeaponTags: [WeaponTag.heavy],
    statMultipliers: {
      moveSpeed: -0.10
    },
    conditionalEffects: [
      'Heavy weapons: +25% Weapon Range',
      'Heavy weapons: +25% Reload Speed'
    ]
  },

  // Engineer Class Mods
  {
    name: 'Maintenance Worker',
    class: Class.engineer,
    startingWeaponId: WeaponIds.turret,
    availableWeaponTags: [WeaponTag.construct],
    conditionalEffects: [
      'Construct weapons: +10% Damage',
      'Construct weapons: +10% Reload Speed'
    ]
  },
  {
    name: 'Tinkerer',
    class: Class.engineer,
    startingWeaponId: WeaponIds.warthog,
    availableWeaponTags: [],
    statMultipliers: {
      xpGain: 0.10
    },
    conditionalEffects: [
      'All weapons begin at level 3'
    ]
  },
  {
    name: 'Demolitionist',
    class: Class.engineer,
    startingWeaponId: WeaponIds.pgl,
    availableWeaponTags: [WeaponTag.explosive],
    conditionalEffects: [
      'Explosive weapons: +20% Explosion Radius',
      'Explosive weapons: +20% Reload Speed'
    ]
  },

  // Driller Class Mods
  {
    name: 'Foreman',
    class: Class.driller,
    startingWeaponId: WeaponIds.subata,
    availableWeaponTags: [],
    conditionalEffects: [
      'Each time mining: +2% Mining Speed for 2 seconds (stacks up to 25 times)'
    ]
  },
  {
    name: 'Interrogator',
    class: Class.driller,
    startingWeaponId: WeaponIds.flamethrower,
    availableWeaponTags: [WeaponTag.fire, WeaponTag.acid],
    statMultipliers: {
      statusDamage: 1.00,
      damage: -0.30
    }
  },
  {
    name: 'Strong Armed',
    class: Class.driller,
    startingWeaponId: WeaponIds.axe,
    availableWeaponTags: [WeaponTag.throwable],
    statMultipliers: {
      weaponRange: 0.20
    }
  }
]