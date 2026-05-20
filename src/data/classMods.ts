import type { ClassMod } from './types'
import { Class, WeaponTag } from './types'
import { WeaponIds } from './weapons'

/**
 * Class mods speak the same `Effect` vocabulary as overclocks / upgrades.
 *
 * Tag-conditional bonuses ("Heavy weapons: +25% Reload Speed") land in
 * `custom` for now — they're real stat effects scoped to a tag, but we don't
 * yet have a `taggedStat` effect kind. Numeric values are preserved verbatim
 * in the description, so the data isn't lost.
 *
 * Note: legacy semantic where `armor` was used as a flat bonus (Juggernaut's
 * `armor: 10`) is preserved verbatim. The consumer-side bug where this gets
 * treated as +1000% armor is in the deferred system-level fix list — see
 * [[project-data-layer-migration-state]].
 */

export const classMods: ClassMod[] = [
  // ====================== Scout ======================
  {
    name: 'Classic',
    class: Class.scout,
    startingWeaponId: WeaponIds.gk2,
    availableWeaponTags: [],
    effects: [
      { kind: 'stat', stat: 'moveSpeed', value: 0.10 },
      { kind: 'stat', stat: 'health', value: 0.15 },
    ],
  },
  {
    name: 'Recon',
    class: Class.scout,
    startingWeaponId: WeaponIds.zhukov,
    availableWeaponTags: [WeaponTag.light],
    effects: [
      { kind: 'stat', stat: 'dodgeChance', value: 0.25 },
      { kind: 'custom', description: 'Upon dodging: +35% Move Speed and +35% Reload Speed for 5 seconds' },
    ],
  },
  {
    name: 'Sharp Shooter',
    class: Class.scout,
    startingWeaponId: WeaponIds.m1000,
    availableWeaponTags: [],
    effects: [
      { kind: 'stat', stat: 'critChance', value: 0.15 },
      { kind: 'stat', stat: 'critDamage', value: 0.50 },
      { kind: 'custom', description: 'Shrapnel explosion occurs when dealing overkill damage' },
    ],
  },

  // ====================== Gunner ======================
  {
    name: 'Weapons Specialist',
    class: Class.gunner,
    startingWeaponId: WeaponIds.minigun,
    availableWeaponTags: [WeaponTag.projectile],
    effects: [
      { kind: 'custom', description: 'After firing 100 shots from Projectile weapons: Fire 8 high damage projectiles in all directions' },
    ],
  },
  {
    name: 'Juggernaut',
    class: Class.gunner,
    startingWeaponId: WeaponIds.bulldog,
    availableWeaponTags: [],
    effects: [
      { kind: 'stat', stat: 'armor', value: 10 },  // flat armor bonus (see file header)
      { kind: 'stat', stat: 'health', value: 0.50 },
      { kind: 'stat', stat: 'range', value: -0.50 },
      { kind: 'custom', description: 'After taking damage: +10% damage for 10 seconds (stacks up to 5 times)' },
    ],
  },
  {
    name: 'Heavy Gunner',
    class: Class.gunner,
    startingWeaponId: WeaponIds.thunderhead,
    availableWeaponTags: [WeaponTag.heavy],
    effects: [
      { kind: 'stat', stat: 'moveSpeed', value: -0.10 },
      { kind: 'custom', description: 'Heavy weapons: +25% Weapon Range' },
      { kind: 'custom', description: 'Heavy weapons: +25% Reload Speed' },
    ],
  },

  // ====================== Engineer ======================
  {
    name: 'Maintenance Worker',
    class: Class.engineer,
    startingWeaponId: WeaponIds.turret,
    availableWeaponTags: [WeaponTag.construct],
    effects: [
      { kind: 'custom', description: 'Construct weapons: +10% Damage' },
      { kind: 'custom', description: 'Construct weapons: +10% Reload Speed' },
    ],
  },
  {
    name: 'Tinkerer',
    class: Class.engineer,
    startingWeaponId: WeaponIds.warthog,
    availableWeaponTags: [],
    effects: [
      { kind: 'stat', stat: 'xpGain', value: 0.10 },
      { kind: 'custom', description: 'All weapons begin at level 3' },
    ],
  },
  {
    name: 'Demolitionist',
    class: Class.engineer,
    startingWeaponId: WeaponIds.pgl,
    availableWeaponTags: [WeaponTag.explosive],
    effects: [
      { kind: 'custom', description: 'Explosive weapons: +20% Explosion Radius' },
      { kind: 'custom', description: 'Explosive weapons: +20% Reload Speed' },
    ],
  },

  // ====================== Driller ======================
  {
    name: 'Foreman',
    class: Class.driller,
    startingWeaponId: WeaponIds.subata,
    availableWeaponTags: [],
    effects: [
      { kind: 'custom', description: 'Each time mining: +2% Mining Speed for 2 seconds (stacks up to 25 times)' },
    ],
  },
  {
    name: 'Interrogator',
    class: Class.driller,
    startingWeaponId: WeaponIds.flamethrower,
    availableWeaponTags: [WeaponTag.fire, WeaponTag.acid],
    effects: [
      { kind: 'stat', stat: 'statusDamage', value: 1.00 },
      { kind: 'stat', stat: 'damage', value: -0.30 },
    ],
  },
  {
    name: 'Strong Armed',
    class: Class.driller,
    startingWeaponId: WeaponIds['impact-axe'],
    availableWeaponTags: [WeaponTag.throwable],
    effects: [
      { kind: 'stat', stat: 'range', value: 0.20 },
    ],
  },
]
