import type { Overclock } from './types'
import { WeaponTag } from './types'

/**
 * Overclocks: per-weapon modifiers rolled at weapon levels 6, 12 (balanced)
 * and 18 (unstable). Pool membership lives on the OC (`weaponIds`) so shared
 * OCs don't get duplicated.
 *
 * Effect kinds — see `Effect` in types.ts:
 *   - stat:       numeric modifier on a single StatId
 *   - tagChange:  alters the weapon's tag set (damage type swaps, etc.)
 *   - targeting:  changes who the weapon targets
 *   - crossWeapon: nested effects applied to OTHER weapon slots
 *   - custom:     unmodeled mechanic, recorded as text for now
 *
 * Numeric convention: percentages stored as decimals (0.15 = +15%).
 *
 * TODO: only GK2 is fully populated. Remaining 52 weapons pending the bulk
 * wiki audit pass.
 */

export const overclocks: Overclock[] = [
  // ====================== Deepcore GK2 ======================
  {
    id: 'gk2-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['gk2'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    id: 'gk2-battery-bullets',
    name: 'Battery Bullets',
    tier: 'balanced',
    weaponIds: ['gk2'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.electric] },
      { kind: 'stat', stat: 'damage', value: 0.10 },
    ],
    description: 'Change damage type to [ELECTRIC], +10% Damage',
  },
  {
    id: 'gk2-big-game-hunter',
    name: 'Big Game Hunter',
    tier: 'balanced',
    weaponIds: ['gk2'],
    effects: [
      { kind: 'stat', stat: 'critDamage', value: 0.20 },
      { kind: 'stat', stat: 'critChance', value: 0.20 },
      { kind: 'targeting', targeting: 'highestHp' },
    ],
    description: '+20% Crit Damage, +20% Crit Chance, targets highest-HP enemy',
  },
  {
    id: 'gk2-high-caliber',
    name: 'High Caliber Rounds',
    tier: 'balanced',
    weaponIds: ['gk2'],
    effects: [
      { kind: 'stat', stat: 'piercing', value: 1.00 },
      { kind: 'stat', stat: 'damage', value: 0.30 },
      { kind: 'stat', stat: 'fireRate', value: -0.30 },
    ],
    description: '+100% Piercing, +30% Damage, -30% Fire Rate',
  },
  {
    id: 'gk2-refrigerated',
    name: 'Refrigerated Gunpowder',
    tier: 'balanced',
    weaponIds: ['gk2'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.cold] },
    ],
    description: 'Change damage type to [COLD]',
  },
  {
    id: 'gk2-lead-wrapped',
    name: 'Lead Wrapped Ammo',
    tier: 'unstable',
    weaponIds: ['gk2'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 1.50 },
      { kind: 'stat', stat: 'fireRate', value: -0.20 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.20 },
    ],
    description: '+150% Damage, -20% Fire Rate, -20% Reload Speed',
  },
  {
    id: 'gk2-the-favourite',
    name: 'The Favourite',
    tier: 'unstable',
    weaponIds: ['gk2'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.favourite] },
      { kind: 'stat', stat: 'damage', value: 1.00 },
      { kind: 'stat', stat: 'fireRate', value: 1.00 },
      {
        kind: 'crossWeapon',
        effects: [
          { kind: 'stat', stat: 'damage', value: -0.30 },
          { kind: 'stat', stat: 'fireRate', value: -0.30 },
        ],
      },
    ],
    description: '+100% Damage, +100% Fire Rate; all other weapons -30% Damage, -30% Fire Rate',
  },

  // ====================== Zhukov NUK17 ======================
  {
    id: 'zhukov-battery-bullets',
    name: 'Battery Bullets',
    tier: 'balanced',
    weaponIds: ['zhukov'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.electric] },
      { kind: 'stat', stat: 'damage', value: 0.10 },
    ],
    description: 'Change damage type to [ELECTRIC], +10% Damage',
  },
  {
    id: 'zhukov-bigger-mags',
    name: 'Bigger Mags',
    tier: 'balanced',
    weaponIds: ['zhukov'],
    effects: [
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'stat', stat: 'piercing', value: 0.50 },
    ],
    description: '+100% Clip Size, +50% Piercing',
  },
  {
    id: 'zhukov-explosive-reload',
    name: 'Explosive Reload',
    tier: 'balanced',
    weaponIds: ['zhukov'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
      { kind: 'custom', description: 'Release an explosion whenever the weapon reloads' },
    ],
    description: '+25% Reload Speed; release an explosion on reload',
  },
  {
    id: 'zhukov-gas-rerouting',
    name: 'Gas Rerouting',
    tier: 'balanced',
    weaponIds: ['zhukov'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+25% Fire Rate, +25% Reload Speed',
  },
  {
    id: 'zhukov-refrigerated',
    name: 'Refrigerated Gunpowder',
    tier: 'balanced',
    weaponIds: ['zhukov'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.cold] },
    ],
    description: 'Change damage type to [COLD]',
  },
  {
    id: 'zhukov-death-spiral',
    name: 'Death Spiral',
    tier: 'unstable',
    weaponIds: ['zhukov'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 2.00 },
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'custom', description: 'Bullets now fire in a spiral pattern' },
    ],
    description: '+200% Fire Rate, +100% Clip Size; bullets fire in a spiral pattern',
  },
  {
    id: 'zhukov-omni-barrel',
    name: 'Omni Barrel',
    tier: 'unstable',
    weaponIds: ['zhukov'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 1.00 },
      { kind: 'stat', stat: 'damage', value: 0.50 },
      { kind: 'stat', stat: 'piercing', value: 0.50 },
      { kind: 'custom', description: 'Fires in 8 directions instead of 4' },
    ],
    description: '+100% Reload Speed, +50% Damage, +50% Piercing; fires in 8 directions',
  },

  // ====================== Cryo Grenade ======================
  {
    id: 'cryo-grenade-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['cryo-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    id: 'cryo-grenade-cluster',
    name: 'Cluster Grenades',
    tier: 'balanced',
    weaponIds: ['cryo-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.20 },
      { kind: 'stat', stat: 'potency', value: -0.20 },
      { kind: 'custom', description: 'Splits into 3 weaker versions on explosion' },
    ],
    description: '-20% Damage, -20% Potency; splits into 3 weaker grenades',
  },
  {
    id: 'cryo-grenade-compact',
    name: 'Compact Explosives',
    tier: 'balanced',
    weaponIds: ['cryo-grenade'],
    effects: [
      { kind: 'stat', stat: 'explosionRadius', value: 0.30 },
    ],
    description: '+30% Explosion Radius',
  },
  {
    id: 'cryo-grenade-true-tnt',
    name: 'True TNT',
    tier: 'balanced',
    weaponIds: ['cryo-grenade'],
    effects: [
      { kind: 'custom', description: 'Grenade explosions now deal damage to terrain' },
    ],
    description: 'Explosions now deal damage to terrain',
  },
  {
    id: 'cryo-grenade-gravitational',
    name: 'Gravitational Core',
    tier: 'unstable',
    weaponIds: ['cryo-grenade'],
    effects: [
      { kind: 'stat', stat: 'explosionRadius', value: 0.25 },
      { kind: 'custom', description: 'Pulls in enemies before detonation' },
    ],
    description: '+25% Explosion Radius; pulls in enemies before detonation',
  },
  {
    id: 'cryo-grenade-the-favourite',
    name: 'The Favourite',
    tier: 'unstable',
    weaponIds: ['cryo-grenade'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.favourite] },
      { kind: 'stat', stat: 'damage', value: 0.75 },
      { kind: 'stat', stat: 'potency', value: 0.75 },
      {
        kind: 'crossWeapon',
        effects: [
          { kind: 'stat', stat: 'potency', value: -0.20 },
          { kind: 'stat', stat: 'reloadSpeed', value: -0.20 },
        ],
      },
    ],
    description: '+75% Damage, +75% Potency; all other weapons -20% Potency, -20% Reload Speed',
  },

  // ====================== Jury-Rigged Boomstick ======================
  {
    id: 'boomstick-battery-bullets',
    name: 'Battery Bullets',
    tier: 'balanced',
    weaponIds: ['boomstick'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.electric] },
      { kind: 'stat', stat: 'damage', value: 0.10 },
    ],
    description: 'Change damage type to [ELECTRIC], +10% Damage',
  },
  {
    id: 'boomstick-bigger-mags',
    name: 'Bigger Mags',
    tier: 'balanced',
    weaponIds: ['boomstick'],
    effects: [
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.10 },
    ],
    description: '+100% Clip Size, -10% Reload Speed',
  },
  {
    id: 'boomstick-high-velocity',
    name: 'High Velocity Bullets',
    tier: 'balanced',
    weaponIds: ['boomstick'],
    effects: [
      { kind: 'stat', stat: 'range', value: 0.50 },
      { kind: 'stat', stat: 'damage', value: 0.10 },
    ],
    description: '+50% Range, +10% Damage',
  },
  {
    id: 'boomstick-refrigerated',
    name: 'Refrigerated Gunpowder',
    tier: 'balanced',
    weaponIds: ['boomstick'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.cold] },
    ],
    description: 'Change damage type to [COLD]',
  },
  {
    id: 'boomstick-mini-pellets',
    name: 'Mini Pellets',
    tier: 'unstable',
    weaponIds: ['boomstick'],
    effects: [
      { kind: 'custom', description: 'Shotgun shells contain twice as many pellets with reduced individual damage' },
    ],
    description: 'Twice as many pellets with reduced individual damage',
  },
  {
    id: 'boomstick-thick-boy',
    name: 'Thick Boy',
    tier: 'unstable',
    weaponIds: ['boomstick'],
    effects: [
      { kind: 'stat', stat: 'piercing', value: 2.00 },
      { kind: 'stat', stat: 'range', value: 2.00 },
      { kind: 'custom', description: 'Combines all projectiles into one thick projectile' },
    ],
    description: '+200% Piercing, +200% Range; combines all pellets into one projectile',
  },

  // ====================== M1000 Classic ======================
  {
    id: 'm1000-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['m1000'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    id: 'm1000-bigger-mags',
    name: 'Bigger Mags',
    tier: 'balanced',
    weaponIds: ['m1000'],
    effects: [
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.10 },
    ],
    description: '+100% Clip Size, -10% Reload Speed',
  },
  {
    id: 'm1000-gas-rerouting',
    name: 'Gas Rerouting',
    tier: 'balanced',
    weaponIds: ['m1000'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+25% Fire Rate, +25% Reload Speed',
  },
  {
    id: 'm1000-pan-fried',
    name: 'Pan Fried Shells',
    tier: 'balanced',
    weaponIds: ['m1000'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.fire] },
    ],
    description: 'Change damage type to [FIRE]',
  },
  {
    id: 'm1000-rubber-tip',
    name: 'Rubber Tip',
    tier: 'balanced',
    weaponIds: ['m1000'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'custom', description: 'Adds knockback to shots' },
    ],
    description: '+15% Damage, adds Knockback',
  },
  {
    id: 'm1000-sawn-off',
    name: 'Sawn-Off',
    tier: 'unstable',
    weaponIds: ['m1000'],
    effects: [
      { kind: 'stat', stat: 'range', value: -0.50 },
      { kind: 'custom', description: '-10 Accuracy' },
    ],
    description: '-50% Range, -10 Accuracy',
  },
  {
    id: 'm1000-thick-boy',
    name: 'Thick Boy',
    tier: 'unstable',
    weaponIds: ['m1000'],
    effects: [
      { kind: 'custom', description: 'Combines clip into a single shot; damage = clip size × base damage; fire rate depends on reload speed' },
    ],
    description: 'Combines clip into one massive shot; damage scales with clip size',
  },

  // ====================== Voltaic Stun Sweeper ======================
  {
    id: 'stun-sweeper-magnet',
    name: 'Kinda Looks Like a Magnet',
    tier: 'balanced',
    weaponIds: ['stun-sweeper'],
    effects: [
      { kind: 'custom', description: 'The Stun Sweeper picks up XP and Materials (pickup radius: 3.0)' },
    ],
    description: 'Picks up XP and materials in a 3.0-unit radius',
  },
  {
    id: 'stun-sweeper-knuckle-grip',
    name: 'Knuckle Grip',
    tier: 'balanced',
    weaponIds: ['stun-sweeper'],
    effects: [
      { kind: 'stat', stat: 'range', value: 3.50 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.25 },
      { kind: 'custom', description: 'Flies in an outward spiral before returning' },
    ],
    description: '+350% Range, -25% Reload Speed; flies in an outward spiral before returning',
  },
  {
    id: 'stun-sweeper-lightweight',
    name: 'Lightweight Alloy',
    tier: 'balanced',
    weaponIds: ['stun-sweeper'],
    effects: [
      { kind: 'stat', stat: 'range', value: 0.30 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.15 },
    ],
    description: '+30% Range, +15% Reload Speed',
  },
  {
    id: 'stun-sweeper-potent-juice',
    name: 'Potent Juice',
    tier: 'balanced',
    weaponIds: ['stun-sweeper'],
    effects: [
      { kind: 'stat', stat: 'potency', value: 0.30 },
    ],
    description: '+30% Potency',
  },
  {
    id: 'stun-sweeper-disposable',
    name: 'Disposable Tech',
    tier: 'unstable',
    weaponIds: ['stun-sweeper'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.explosive] },
      { kind: 'custom', description: 'The Stun Sweeper no longer returns; instead explodes in an electrical burst' },
    ],
    description: 'No longer returns; explodes in an electrical burst instead',
  },
  {
    id: 'stun-sweeper-one-handed',
    name: 'One-Handed',
    tier: 'unstable',
    weaponIds: ['stun-sweeper'],
    effects: [
      { kind: 'custom', description: 'Throws an additional Stun Sweeper in the opposite direction simultaneously' },
    ],
    description: 'Throws an additional Stun Sweeper in the opposite direction',
  },

  // ====================== TH-0R Bug Taser ======================
  {
    id: 'thor-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['thor'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    id: 'thor-explosive-reload',
    name: 'Explosive Reload',
    tier: 'balanced',
    weaponIds: ['thor'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
      { kind: 'custom', description: 'Release an explosion whenever the weapon reloads' },
    ],
    description: '+25% Reload Speed; release an explosion on reload',
  },
  {
    id: 'thor-more-beams',
    name: 'More Beams',
    tier: 'balanced',
    weaponIds: ['thor'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 1 },
    ],
    description: '+1 Beam',
  },
  {
    id: 'thor-sidearm',
    name: 'Sidearm',
    tier: 'balanced',
    weaponIds: ['thor'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.20 },
      { kind: 'crossWeapon', effects: [{ kind: 'stat', stat: 'damage', value: 0.25 }] },
      { kind: 'tagChange', add: [WeaponTag.sidearm] },
    ],
    description: '-20% Damage; all other weapons +25% Damage; adds [SIDEARM] tag',
  },
  {
    id: 'thor-even-more-beams',
    name: 'Even More Beams',
    tier: 'unstable',
    weaponIds: ['thor'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 3 },
    ],
    description: '+3 Beams',
  },
  {
    id: 'thor-ultimate-sidearm',
    name: 'Ultimate Sidearm',
    tier: 'unstable',
    weaponIds: ['thor'],
    effects: [
      { kind: 'crossWeapon', effects: [{ kind: 'stat', stat: 'damage', value: 0.60 }] },
    ],
    description: 'All other weapons +60% Damage',
  },
  {
    id: 'thor-unlimited-power',
    name: 'Unlimited Power',
    tier: 'unstable',
    weaponIds: ['thor'],
    effects: [
      { kind: 'custom', description: 'Beams split into multiple independent beams that each jump to different targets' },
    ],
    description: 'Beams split into multiple independently jumping beams',
  },

  // ====================== Arc-Tek Cryo Guard ======================
  {
    id: 'cryo-guard-aggro',
    name: 'Behaviour Chip: Aggro',
    tier: 'balanced',
    weaponIds: ['cryo-guard'],
    effects: [
      { kind: 'custom', description: 'Drones will actively seek out nearby enemies instead of orbiting' },
    ],
    description: 'Drones actively seek out enemies',
  },
  {
    id: 'cryo-guard-disposable',
    name: 'Disposable Tech',
    tier: 'balanced',
    weaponIds: ['cryo-guard'],
    effects: [
      { kind: 'stat', stat: 'lifetime', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.40 },
      { kind: 'custom', description: 'Drones explode instead of returning; Lifetime upgrades now shorten drone lifetime' },
    ],
    description: '+100% Lifetime, +40% Reload Speed; drones explode instead of returning',
  },
  {
    id: 'cryo-guard-more-drones-balanced',
    name: 'More Drones',
    tier: 'balanced',
    weaponIds: ['cryo-guard'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 1 },
    ],
    description: '+1 Drone',
  },
  {
    id: 'cryo-guard-personal-space',
    name: 'Personal Space Invaders',
    tier: 'balanced',
    weaponIds: ['cryo-guard'],
    effects: [
      { kind: 'stat', stat: 'range', value: -0.50 },
      { kind: 'stat', stat: 'droneCount', value: 2 },
      { kind: 'custom', description: 'Drones patrol your personal space (reduced orbit radius)' },
    ],
    description: '-50% Range, +2 Drones; drones patrol personal space',
  },
  {
    id: 'cryo-guard-crisis-protocol',
    name: 'Crisis Protocol',
    tier: 'unstable',
    weaponIds: ['cryo-guard'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.25 },
      { kind: 'stat', stat: 'potency', value: 0.25 },
      { kind: 'custom', description: 'Drones rush to protect you when you take damage' },
    ],
    description: '+25% Damage, +25% Potency; drones rush to protect you when you take damage',
  },
  {
    id: 'cryo-guard-more-drones-unstable',
    name: 'More Drones',
    tier: 'unstable',
    weaponIds: ['cryo-guard'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 3 },
    ],
    description: '+3 Drones',
  },

  // ====================== Drak-25 Plasma Carbine ======================
  {
    id: 'drak-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['drak'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    id: 'drak-bigger-mags',
    name: 'Bigger Mags',
    tier: 'balanced',
    weaponIds: ['drak'],
    effects: [
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.10 },
    ],
    description: '+100% Clip Size, -10% Reload Speed',
  },
  {
    id: 'drak-cold-plasma',
    name: 'Cold Plasma',
    tier: 'balanced',
    weaponIds: ['drak'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'tagChange', add: [WeaponTag.cold] },
      // TODO: investigate whether the slow/cold status uses the weapon's base
      // potency or has its own value. Wiki doesn't list a potency delta on this OC.
    ],
    description: '+15% Damage; supercooled plasma slows enemies',
  },
  {
    id: 'drak-gas-rerouting',
    name: 'Gas Rerouting',
    tier: 'balanced',
    weaponIds: ['drak'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+25% Fire Rate, +25% Reload Speed',
  },
  {
    id: 'drak-hot-plasma',
    name: 'Hot Plasma',
    tier: 'balanced',
    weaponIds: ['drak'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'tagChange', add: [WeaponTag.fire] },
      // TODO: investigate whether the burn status uses the weapon's base potency
      // or has its own value. Wiki doesn't list a potency delta on this OC.
    ],
    description: '+15% Damage; superheated plasma burns enemies',
  },
  {
    id: 'drak-sawn-off',
    name: 'Sawn-Off',
    tier: 'unstable',
    weaponIds: ['drak'],
    effects: [
      { kind: 'stat', stat: 'range', value: -0.50 },
      { kind: 'custom', description: '-10 Accuracy; more projectiles but shorter range' },
    ],
    description: '-50% Range, -10 Accuracy; more projectiles but shorter range',
  },
  {
    id: 'drak-storm-emag',
    name: 'Storm E-Mag',
    tier: 'unstable',
    weaponIds: ['drak'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.10 },
      { kind: 'stat', stat: 'fireRate', value: 0.10 },
      { kind: 'custom', description: 'The last bullet in the burst fires in all directions' },
    ],
    description: '+10% Reload Speed, +10% Fire Rate; last bullet fires in all directions',
  },

  // ====================== Incendiary Grenade ======================
  {
    id: 'incendiary-grenade-cluster',
    name: 'Cluster Grenades',
    tier: 'balanced',
    weaponIds: ['incendiary-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.20 },
      { kind: 'stat', stat: 'potency', value: -0.20 },
      { kind: 'custom', description: 'The grenade splits into 3 weaker versions on explosion' },
    ],
    description: '-20% Damage, -20% Potency; splits into 3 weaker grenades',
  },
  {
    id: 'incendiary-grenade-compact',
    name: 'Compact Explosives',
    tier: 'balanced',
    weaponIds: ['incendiary-grenade'],
    effects: [
      { kind: 'stat', stat: 'explosionRadius', value: 0.30 },
    ],
    description: '+30% Explosion Radius',
  },
  {
    id: 'incendiary-grenade-potent-juice',
    name: 'Potent Juice',
    tier: 'balanced',
    weaponIds: ['incendiary-grenade'],
    effects: [
      { kind: 'stat', stat: 'potency', value: 0.30 },
    ],
    description: '+30% Potency',
  },
  {
    // Adds a secondary kinetic explosion on top of the fire explosion.
    id: 'incendiary-grenade-tape-nails',
    name: 'Tape Some Nails to It',
    tier: 'balanced',
    weaponIds: ['incendiary-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.10 },
      { kind: 'tagChange', add: [WeaponTag.kinetic] },
    ],
    description: '+10% Damage; adds an additional [KINETIC] explosion',
  },
  {
    id: 'incendiary-grenade-feedback-harness',
    name: 'Feedback Harness',
    tier: 'unstable',
    weaponIds: ['incendiary-grenade'],
    effects: [
      { kind: 'custom', description: 'Throws grenades on damage taken; 10 second cooldown' },
    ],
    description: 'Throws grenades when you take damage (10s cooldown)',
  },
  {
    id: 'incendiary-grenade-gravitational',
    name: 'Gravitational Core',
    tier: 'unstable',
    weaponIds: ['incendiary-grenade'],
    effects: [
      { kind: 'stat', stat: 'explosionRadius', value: 0.25 },
      { kind: 'custom', description: 'Pulls in enemies before detonation' },
    ],
    description: '+25% Explosion Radius; pulls in enemies before detonation',
  },

  // ====================== "Lead Storm" Powered Minigun ======================
  {
    id: 'minigun-bigger-mags',
    name: 'Bigger Mags',
    tier: 'balanced',
    weaponIds: ['minigun'],
    effects: [
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.10 },
    ],
    description: '+100% Clip Size, -10% Reload Speed',
  },
  {
    id: 'minigun-gas-rerouting',
    name: 'Gas Rerouting',
    tier: 'balanced',
    weaponIds: ['minigun'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+25% Fire Rate, +25% Reload Speed',
  },
  {
    id: 'minigun-high-caliber',
    name: 'High Caliber Rounds',
    tier: 'balanced',
    weaponIds: ['minigun'],
    effects: [
      { kind: 'stat', stat: 'piercing', value: 1.00 },
      { kind: 'stat', stat: 'damage', value: 0.30 },
      { kind: 'stat', stat: 'fireRate', value: -0.30 },
    ],
    description: '+100% Piercing, +30% Damage, -30% Fire Rate',
  },
  {
    id: 'minigun-pan-fried',
    name: 'Pan Fried Shells',
    tier: 'balanced',
    weaponIds: ['minigun'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.fire] },
    ],
    description: 'Change damage type to [FIRE]',
  },
  {
    // Armor bonus while reloading is a conditional mechanic — custom.
    id: 'minigun-reload-shield',
    name: 'Reload Shield',
    tier: 'balanced',
    weaponIds: ['minigun'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: -0.25 },
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'custom', description: '+100% Armor while reloading' },
    ],
    description: '-25% Reload Speed, +25% Fire Rate; +100% Armor while reloading',
  },
  {
    id: 'minigun-lead-wrapped',
    name: 'Lead Wrapped Ammo',
    tier: 'unstable',
    weaponIds: ['minigun'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 1.50 },
      { kind: 'stat', stat: 'fireRate', value: -0.20 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.20 },
    ],
    description: '+150% Damage, -20% Fire Rate, -20% Reload Speed',
  },
  {
    id: 'minigun-the-favourite',
    name: 'The Favourite',
    tier: 'unstable',
    weaponIds: ['minigun'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.favourite] },
      { kind: 'stat', stat: 'damage', value: 1.00 },
      { kind: 'stat', stat: 'fireRate', value: 1.00 },
      {
        kind: 'crossWeapon',
        effects: [
          { kind: 'stat', stat: 'damage', value: -0.30 },
          { kind: 'stat', stat: 'fireRate', value: -0.30 },
        ],
      },
    ],
    description: '+100% Damage, +100% Fire Rate; all other weapons -30% Damage, -30% Fire Rate',
  },

  // ====================== "Bulldog" Heavy Revolver ======================
  {
    id: 'bulldog-bigger-mags',
    name: 'Bigger Mags',
    tier: 'balanced',
    weaponIds: ['bulldog'],
    effects: [
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.10 },
    ],
    description: '+100% Clip Size, -10% Reload Speed',
  },
  {
    id: 'bulldog-high-caliber',
    name: 'High Caliber Rounds',
    tier: 'balanced',
    weaponIds: ['bulldog'],
    effects: [
      { kind: 'stat', stat: 'piercing', value: 1.00 },
      { kind: 'stat', stat: 'damage', value: 0.30 },
      { kind: 'stat', stat: 'fireRate', value: -0.30 },
    ],
    description: '+100% Piercing, +30% Damage, -30% Fire Rate',
  },
  {
    id: 'bulldog-pan-fried',
    name: 'Pan Fried Shells',
    tier: 'balanced',
    weaponIds: ['bulldog'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.fire] },
    ],
    description: 'Change damage type to [FIRE]',
  },
  {
    // Armor bonus while reloading is a conditional mechanic — custom.
    id: 'bulldog-reload-shield',
    name: 'Reload Shield',
    tier: 'balanced',
    weaponIds: ['bulldog'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: -0.25 },
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'custom', description: '+100% Armor while reloading' },
    ],
    description: '-25% Reload Speed, +25% Fire Rate; +100% Armor while reloading',
  },
  {
    id: 'bulldog-double-barrel',
    name: 'Double Barrel!',
    tier: 'unstable',
    weaponIds: ['bulldog'],
    effects: [
      { kind: 'custom', description: 'Shoots two parallel bullets simultaneously' },
    ],
    description: 'Shoots two parallel bullets',
  },
  {
    // Armor bonus while reloading is a conditional mechanic — custom.
    id: 'bulldog-super-reload-shield',
    name: 'Super Reload Shield',
    tier: 'unstable',
    weaponIds: ['bulldog'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.75 },
      { kind: 'stat', stat: 'fireRate', value: 0.50 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.25 },
      { kind: 'custom', description: '+100% Armor while reloading' },
    ],
    description: '+75% Damage, +50% Fire Rate, -25% Reload Speed; +100% Armor while reloading',
  },

  // ====================== BRT7 Burst Fire Gun ======================
  {
    id: 'brt7-bigger-mags',
    name: 'Bigger Mags',
    tier: 'balanced',
    weaponIds: ['brt7'],
    effects: [
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.10 },
    ],
    description: '+100% Clip Size, -10% Reload Speed',
  },
  {
    id: 'brt7-gas-rerouting',
    name: 'Gas Rerouting',
    tier: 'balanced',
    weaponIds: ['brt7'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+25% Fire Rate, +25% Reload Speed',
  },
  {
    id: 'brt7-high-caliber',
    name: 'High Caliber Rounds',
    tier: 'balanced',
    weaponIds: ['brt7'],
    effects: [
      { kind: 'stat', stat: 'piercing', value: 1.00 },
      { kind: 'stat', stat: 'damage', value: 0.30 },
      { kind: 'stat', stat: 'fireRate', value: -0.30 },
    ],
    description: '+100% Piercing, +30% Damage, -30% Fire Rate',
  },
  {
    id: 'brt7-pan-fried',
    name: 'Pan Fried Shells',
    tier: 'balanced',
    weaponIds: ['brt7'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.fire] },
    ],
    description: 'Change damage type to [FIRE]',
  },
  {
    id: 'brt7-sidearm',
    name: 'Sidearm',
    tier: 'balanced',
    weaponIds: ['brt7'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.20 },
      { kind: 'crossWeapon', effects: [{ kind: 'stat', stat: 'damage', value: 0.25 }] },
      { kind: 'tagChange', add: [WeaponTag.sidearm] },
    ],
    description: '-20% Damage; all other weapons +25% Damage; adds [SIDEARM] tag',
  },
  {
    id: 'brt7-bullet-helix',
    name: 'Bullet Helix',
    tier: 'unstable',
    weaponIds: ['brt7'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 2.00 },
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'custom', description: 'Bullets fire in a spiral pattern' },
    ],
    description: '+200% Fire Rate, +100% Clip Size; bullets fire in a spiral pattern',
  },
  {
    id: 'brt7-omni-barrel',
    name: 'Omni Barrel',
    tier: 'unstable',
    weaponIds: ['brt7'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 1.00 },
      { kind: 'stat', stat: 'damage', value: 0.50 },
      { kind: 'stat', stat: 'piercing', value: 0.50 },
      { kind: 'custom', description: 'Fires in 8 directions instead of 4' },
    ],
    description: '+100% Reload Speed, +50% Damage, +50% Piercing; fires in 8 directions',
  },

  // ====================== Tactical Leadburster ======================
  {
    // Reduces damage, fire rate, and reload speed by 15% each; splits into 3 weaker versions.
    id: 'leadburster-cluster',
    name: 'Cluster Grenades',
    tier: 'balanced',
    weaponIds: ['leadburster'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.15 },
      { kind: 'stat', stat: 'fireRate', value: -0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.15 },
      { kind: 'custom', description: 'Grenade splits into 3 weaker versions' },
    ],
    description: '-15% Damage, -15% Fire Rate, -15% Reload Speed; splits into 3 weaker versions',
  },
  {
    id: 'leadburster-fire-bullets',
    name: 'Fire Bullets',
    tier: 'balanced',
    weaponIds: ['leadburster'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.fire] },
    ],
    description: 'Change damage type to [FIRE]',
  },
  {
    id: 'leadburster-fusion-turbines',
    name: 'Fusion Turbines',
    tier: 'balanced',
    weaponIds: ['leadburster'],
    effects: [
      { kind: 'stat', stat: 'lifetime', value: 0.20 },
    ],
    description: '+20% Lifetime (grenade lifespan)',
  },
  {
    id: 'leadburster-piercing-projectiles',
    name: 'Piercing Projectiles',
    tier: 'balanced',
    weaponIds: ['leadburster'],
    effects: [
      { kind: 'stat', stat: 'piercing', value: 2.00 },
      { kind: 'stat', stat: 'lifetime', value: -0.30 },
    ],
    description: '+200% Piercing, -30% Lifetime',
  },
  {
    id: 'leadburster-lead-wrapped',
    name: 'Lead Wrapped Ammo',
    tier: 'unstable',
    weaponIds: ['leadburster'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 1.50 },
      { kind: 'stat', stat: 'fireRate', value: -0.20 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.20 },
    ],
    description: '+150% Damage, -20% Fire Rate, -20% Reload Speed',
  },
  {
    id: 'leadburster-the-favourite',
    name: 'The Favourite',
    tier: 'unstable',
    weaponIds: ['leadburster'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.favourite] },
      { kind: 'stat', stat: 'damage', value: 1.00 },
      { kind: 'stat', stat: 'fireRate', value: 1.00 },
      {
        kind: 'crossWeapon',
        effects: [
          { kind: 'stat', stat: 'damage', value: -0.30 },
          { kind: 'stat', stat: 'fireRate', value: -0.30 },
        ],
      },
    ],
    description: '+100% Damage, +100% Fire Rate; all other weapons -30% Damage, -30% Fire Rate',
  },

  // ====================== "Thunderhead" Heavy Autocannon ======================
  {
    id: 'thunderhead-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['thunderhead'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    id: 'thunderhead-bigger-mags',
    name: 'Bigger Mags',
    tier: 'balanced',
    weaponIds: ['thunderhead'],
    effects: [
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.10 },
    ],
    description: '+100% Clip Size, -10% Reload Speed',
  },
  {
    id: 'thunderhead-gas-rerouting',
    name: 'Gas Rerouting',
    tier: 'balanced',
    weaponIds: ['thunderhead'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+25% Fire Rate, +25% Reload Speed',
  },
  {
    id: 'thunderhead-high-caliber',
    name: 'High Caliber Rounds',
    tier: 'balanced',
    weaponIds: ['thunderhead'],
    effects: [
      { kind: 'stat', stat: 'piercing', value: 1.00 },
      { kind: 'stat', stat: 'damage', value: 0.30 },
      { kind: 'stat', stat: 'fireRate', value: -0.30 },
    ],
    description: '+100% Piercing, +30% Damage, -30% Fire Rate',
  },
  {
    id: 'thunderhead-rubber-tip',
    name: 'Rubber Tip',
    tier: 'balanced',
    weaponIds: ['thunderhead'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'custom', description: 'Adds knockback to shots' },
    ],
    description: '+15% Damage, adds Knockback',
  },
  {
    id: 'thunderhead-storm-emag',
    name: 'Storm E-Mag',
    tier: 'unstable',
    weaponIds: ['thunderhead'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.10 },
      { kind: 'stat', stat: 'fireRate', value: 0.10 },
      { kind: 'custom', description: 'The last bullet in the clip fires in all directions' },
    ],
    description: '+10% Reload Speed, +10% Fire Rate; last bullet fires in all directions',
  },
  {
    // "Tightest of Springs" — accuracy stat not in StatId, captured as custom.
    id: 'thunderhead-tightest-springs',
    name: 'The Tightest of Springs',
    tier: 'unstable',
    weaponIds: ['thunderhead'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 1.25 },
      { kind: 'custom', description: '-15 Accuracy' },
    ],
    description: '+125% Fire Rate, -15 Accuracy',
  },

  // ====================== Firefly Hunter Drone ======================
  {
    // Drones circle consistently counterclockwise — behavioral, captured as custom.
    id: 'firefly-behaviour-defensive',
    name: 'Behaviour Chip: Defensive',
    tier: 'balanced',
    weaponIds: ['firefly'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 2 },
      { kind: 'stat', stat: 'range', value: -0.10 },
      { kind: 'custom', description: 'Drones circle consistently counterclockwise around the player' },
    ],
    description: '+2 Drones, -10% Range; drones circle counterclockwise',
  },
  {
    // Drones explode at end-of-life creating fire groundzones — partially custom.
    id: 'firefly-disposable',
    name: 'Disposable Tech',
    tier: 'balanced',
    weaponIds: ['firefly'],
    effects: [
      { kind: 'stat', stat: 'lifetime', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.40 },
      { kind: 'custom', description: 'Drones explode at end-of-life creating fire groundzones (200 damage, 2.75-unit radius)' },
    ],
    description: '+100% Lifetime, +40% Reload Speed; drones explode creating fire groundzones',
  },
  {
    id: 'firefly-drone-mining',
    name: 'Drone Mining Damage',
    tier: 'balanced',
    weaponIds: ['firefly'],
    effects: [
      { kind: 'custom', description: 'Drones now deal damage to terrain' },
    ],
    description: 'Drones deal damage to terrain',
  },
  {
    id: 'firefly-more-drones-balanced',
    name: 'More Drones',
    tier: 'balanced',
    weaponIds: ['firefly'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 1 },
    ],
    description: '+1 Drone',
  },
  {
    // Fire trails leaving groundzones — custom mechanic.
    id: 'firefly-fuel-leak',
    name: 'Fuel Leak',
    tier: 'unstable',
    weaponIds: ['firefly'],
    effects: [
      { kind: 'stat', stat: 'potency', value: 0.20 },
      { kind: 'custom', description: 'Drones leave fire trails creating groundzones (8 damage/0.5s tick, 2s duration)' },
    ],
    description: '+20% Potency; drones leave fire trail groundzones',
  },
  {
    id: 'firefly-more-drones-unstable',
    name: 'More Drones',
    tier: 'unstable',
    weaponIds: ['firefly'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 3 },
    ],
    description: '+3 Drones',
  },

  // ====================== "Hurricane" Guided Rocket System ======================
  {
    id: 'hurricane-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['hurricane'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    // Rockets ignite the ground creating fire groundzones — adds tag + custom for zone detail.
    id: 'hurricane-incendiary-payload',
    name: 'Incendiary Payload',
    tier: 'balanced',
    weaponIds: ['hurricane'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.fire, WeaponTag.groundzone] },
      { kind: 'custom', description: 'Rockets set the ground on fire (18 damage/0.5s tick, 12s duration, 1.5-unit radius)' },
    ],
    description: 'Rockets create fire groundzones; adds [FIRE] and [GROUNDZONE] tags',
  },
  {
    id: 'hurricane-runic-warhead',
    name: 'Runic Warhead',
    tier: 'balanced',
    weaponIds: ['hurricane'],
    effects: [
      { kind: 'stat', stat: 'explosionRadius', value: 0.50 },
    ],
    description: '+50% Explosion Radius',
  },
  {
    id: 'hurricane-spare-rockets',
    name: 'Spare Rockets',
    tier: 'balanced',
    weaponIds: ['hurricane'],
    effects: [
      { kind: 'custom', description: 'Adds 3 additional rockets to clip size' },
    ],
    description: '+3 Rockets to clip',
  },
  {
    // Exact rocket count not specified on wiki — custom.
    id: 'hurricane-extra-drum',
    name: 'Extra Rocket Drum',
    tier: 'unstable',
    weaponIds: ['hurricane'],
    effects: [
      { kind: 'custom', description: 'Significantly increases rocket clip size (exact number not specified on wiki)' },
    ],
    description: 'Greatly increases rocket clip size',
  },
  {
    id: 'hurricane-the-favourite',
    name: 'The Favourite',
    tier: 'unstable',
    weaponIds: ['hurricane'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.favourite] },
      { kind: 'stat', stat: 'damage', value: 0.75 },
      { kind: 'stat', stat: 'explosionRadius', value: 0.30 },
      {
        kind: 'crossWeapon',
        effects: [
          { kind: 'stat', stat: 'damage', value: -0.25 },
          { kind: 'stat', stat: 'explosionRadius', value: -0.20 },
        ],
      },
    ],
    description: '+75% Damage, +30% Explosion Radius; all other weapons -25% Damage, -20% Explosion Radius',
  },

  // ====================== Seismic Repulsor ======================
  {
    // Adds slow groundzone — adds tags + custom for zone details.
    id: 'seismic-coolant-leak',
    name: 'Coolant Leak',
    tier: 'balanced',
    weaponIds: ['seismic-repulsor'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.cold, WeaponTag.groundzone] },
      { kind: 'custom', description: 'Turrets emit a slow groundzone (2 dmg/0.5s tick, potency 5 slow, 12s lifetime, 2-unit radius)' },
    ],
    description: 'Turrets emit a cold slow groundzone; adds [COLD] and [GROUNDZONE] tags',
  },
  {
    // Turrets explode when removed — partially custom.
    id: 'seismic-disposable',
    name: 'Disposable Tech',
    tier: 'balanced',
    weaponIds: ['seismic-repulsor'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 1.00 },
      { kind: 'stat', stat: 'lifetime', value: -0.50 },
      { kind: 'custom', description: 'Turrets explode when removed (36 damage, 4-unit radius)' },
    ],
    description: '+100% Reload Speed, -50% Lifetime; turrets explode when removed',
  },
  {
    id: 'seismic-extra-capacity-balanced',
    name: 'Extra Capacity',
    tier: 'balanced',
    weaponIds: ['seismic-repulsor'],
    effects: [
      { kind: 'stat', stat: 'turretCap', value: 1 },
      { kind: 'stat', stat: 'damage', value: 0.15 },
    ],
    description: '+1 Turret, +15% Damage',
  },
  {
    // Tank Tracks — turrets follow player at 43% move speed; custom movement mechanic.
    id: 'seismic-tank-tracks',
    name: 'Tank Tracks',
    tier: 'balanced',
    weaponIds: ['seismic-repulsor'],
    effects: [
      { kind: 'custom', description: 'Turrets follow the player at 43% of player move speed' },
    ],
    description: 'Turrets follow the player at 43% move speed',
  },
  {
    id: 'seismic-extra-capacity-unstable',
    name: 'Extra Capacity',
    tier: 'unstable',
    weaponIds: ['seismic-repulsor'],
    effects: [
      { kind: 'stat', stat: 'turretCap', value: 3 },
    ],
    description: '+3 Turrets',
  },
  {
    id: 'seismic-the-favourite',
    name: 'The Favourite',
    tier: 'unstable',
    weaponIds: ['seismic-repulsor'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.favourite] },
      { kind: 'stat', stat: 'damage', value: 1.00 },
      { kind: 'stat', stat: 'lifetime', value: 0.50 },
      {
        kind: 'crossWeapon',
        effects: [
          { kind: 'stat', stat: 'damage', value: -0.30 },
          { kind: 'stat', stat: 'lifetime', value: -0.25 },
        ],
      },
    ],
    description: '+100% Damage, +50% Lifetime; all other weapons -30% Damage, -25% Lifetime',
  },

  // ====================== ArmsKore Coil Gun ======================
  {
    id: 'coil-gun-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['coil-gun'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    id: 'coil-gun-mining-damage',
    name: 'Coilgun Mining Damage',
    tier: 'balanced',
    weaponIds: ['coil-gun'],
    effects: [
      { kind: 'custom', description: 'Shots now deal damage to terrain' },
    ],
    description: 'Shots deal terrain damage',
  },
  {
    id: 'coil-gun-explosive-reload',
    name: 'Explosive Reload',
    tier: 'balanced',
    weaponIds: ['coil-gun'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
      { kind: 'custom', description: 'Release an explosion whenever the weapon reloads (80 base damage, 7-unit radius)' },
    ],
    description: '+25% Reload Speed; explosion on reload',
  },
  {
    id: 'coil-gun-more-beams',
    name: 'More Beams',
    tier: 'balanced',
    weaponIds: ['coil-gun'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 1 },
    ],
    description: '+1 Beam',
  },
  {
    id: 'coil-gun-even-more-beams',
    name: 'Even More Beams',
    tier: 'unstable',
    weaponIds: ['coil-gun'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 3 },
    ],
    description: '+3 Beams',
  },
  {
    id: 'coil-gun-spliced-emitter',
    name: 'Spliced Emitter',
    tier: 'unstable',
    weaponIds: ['coil-gun'],
    effects: [
      { kind: 'stat', stat: 'lifetime', value: 0.75 },
      { kind: 'stat', stat: 'range', value: 0.75 },
      { kind: 'stat', stat: 'damage', value: 0.75 },
    ],
    description: '+75% Lifetime, +75% Range, +75% Damage',
  },

  // ====================== "Warthog" Auto 210 ======================
  {
    id: 'warthog-battery-bullets',
    name: 'Battery Bullets',
    tier: 'balanced',
    weaponIds: ['warthog'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.electric] },
      { kind: 'stat', stat: 'damage', value: 0.10 },
    ],
    description: 'Change damage type to [ELECTRIC], +10% Damage',
  },
  {
    id: 'warthog-gas-rerouting',
    name: 'Gas Rerouting',
    tier: 'balanced',
    weaponIds: ['warthog'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+25% Fire Rate, +25% Reload Speed',
  },
  {
    id: 'warthog-high-velocity',
    name: 'High Velocity Bullets',
    tier: 'balanced',
    weaponIds: ['warthog'],
    effects: [
      { kind: 'stat', stat: 'range', value: 0.50 },
      { kind: 'stat', stat: 'damage', value: 0.10 },
    ],
    description: '+50% Range, +10% Damage',
  },
  {
    id: 'warthog-plasma-coating',
    name: 'Plasma Coating',
    tier: 'balanced',
    weaponIds: ['warthog'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.plasma] },
      { kind: 'stat', stat: 'fireRate', value: -0.15 },
    ],
    description: 'Change damage type to [PLASMA], -15% Fire Rate',
  },
  {
    // Shoots an additional time in the opposite direction — custom targeting/firing mechanic.
    id: 'warthog-akimbo',
    name: 'Akimbo',
    tier: 'unstable',
    weaponIds: ['warthog'],
    effects: [
      { kind: 'custom', description: 'Shoots an additional time in the opposite direction simultaneously' },
    ],
    description: 'Shoots in the opposite direction simultaneously',
  },
  {
    id: 'warthog-mini-pellets',
    name: 'Mini Pellets',
    tier: 'unstable',
    weaponIds: ['warthog'],
    effects: [
      { kind: 'custom', description: 'Doubles pellet count with reduced individual damage' },
    ],
    description: 'Doubles pellet count with reduced individual damage',
  },

  // ====================== LMG Gun Platform ======================
  {
    id: 'turret-battery-bullets',
    name: 'Battery Bullets',
    tier: 'balanced',
    weaponIds: ['turret'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.electric] },
      { kind: 'stat', stat: 'damage', value: 0.10 },
    ],
    description: 'Change damage type to [ELECTRIC], +10% Damage',
  },
  {
    id: 'turret-extra-capacity-balanced',
    name: 'Extra Capacity',
    tier: 'balanced',
    weaponIds: ['turret'],
    effects: [
      { kind: 'stat', stat: 'turretCap', value: 1 },
      { kind: 'stat', stat: 'damage', value: 0.10 },
    ],
    description: '+1 Turrets, +10% Damage',
  },
  {
    id: 'turret-mining-directive',
    name: 'Mining Directive',
    tier: 'balanced',
    weaponIds: ['turret'],
    effects: [
      { kind: 'custom', description: 'Turrets mine nearby walls' },
    ],
    description: 'Turrets mine nearby walls',
  },
  {
    id: 'turret-plasma-coating',
    name: 'Plasma Coating',
    tier: 'balanced',
    weaponIds: ['turret'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.plasma] },
    ],
    description: 'Change damage type to [PLASMA]',
  },
  {
    id: 'turret-tank-tracks',
    name: 'Tank Tracks',
    tier: 'balanced',
    weaponIds: ['turret'],
    effects: [
      { kind: 'custom', description: 'Turrets follow the player at 43% of player move speed' },
    ],
    description: 'Turrets follow the player at 43% move speed',
  },
  {
    id: 'turret-extra-capacity-unstable',
    name: 'Extra Capacity',
    tier: 'unstable',
    weaponIds: ['turret'],
    effects: [
      { kind: 'stat', stat: 'turretCap', value: 4 },
      { kind: 'stat', stat: 'damage', value: 0.10 },
    ],
    description: '+4 Turrets, +10% Damage',
  },
  {
    // accuracy stat not in StatId — captured as custom.
    id: 'turret-lmg-overload',
    name: 'LMG Overload',
    tier: 'unstable',
    weaponIds: ['turret'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 1.00 },
      { kind: 'custom', description: '-15 Accuracy' },
    ],
    description: '+100% Fire Rate, -15 Accuracy',
  },

  // ====================== Hi-Volt Thunderbird ======================
  {
    id: 'thunderbird-behaviour-aggro',
    name: 'Behaviour Chip: Aggro',
    tier: 'balanced',
    weaponIds: ['thunderbird'],
    effects: [
      { kind: 'custom', description: 'Drones seek out nearby enemies instead of passively orbiting the player' },
    ],
    description: 'Drones actively seek out enemies',
  },
  {
    // Explosion + electrified groundzone on drone expiry — custom for zone detail.
    id: 'thunderbird-disposable',
    name: 'Disposable Tech',
    tier: 'balanced',
    weaponIds: ['thunderbird'],
    effects: [
      { kind: 'stat', stat: 'lifetime', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.40 },
      { kind: 'tagChange', add: [WeaponTag.explosive, WeaponTag.groundzone] },
      { kind: 'custom', description: 'Drones explode on expiration (117 damage, 4-unit radius); creates electrified groundzones (3 dmg/0.5s tick, 5 shock potency, 3.5s lifetime)' },
    ],
    description: '+100% Lifetime, +40% Reload Speed; drones explode creating electrified groundzones',
  },
  {
    id: 'thunderbird-more-drones-balanced',
    name: 'More Drones',
    tier: 'balanced',
    weaponIds: ['thunderbird'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 1 },
    ],
    description: '+1 Drone',
  },
  {
    id: 'thunderbird-potent-juice',
    name: 'Potent Juice',
    tier: 'balanced',
    weaponIds: ['thunderbird'],
    effects: [
      { kind: 'stat', stat: 'potency', value: 0.30 },
    ],
    description: '+30% Potency',
  },
  {
    // Drones fire beams between nearby constructs — custom inter-construct mechanic.
    id: 'thunderbird-conduit',
    name: 'Conduit',
    tier: 'unstable',
    weaponIds: ['thunderbird'],
    effects: [
      { kind: 'custom', description: 'Drones fire beams to nearby friendly constructs every 0.5s within 5 units (50% base damage, full potency)' },
    ],
    description: 'Drones fire beams to nearby constructs (50% damage, full potency)',
  },
  {
    // Tether mechanic — custom.
    id: 'thunderbird-electrical-tether',
    name: 'Electrical Tether',
    tier: 'unstable',
    weaponIds: ['thunderbird'],
    effects: [
      { kind: 'custom', description: 'Drones are tethered to the player by an arc of electricity' },
    ],
    description: 'Drones tethered to player by electrical arc',
  },
  {
    id: 'thunderbird-more-drones-unstable',
    name: 'More Drones',
    tier: 'unstable',
    weaponIds: ['thunderbird'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 3 },
    ],
    description: '+3 Drones',
  },

  // ====================== "Stubby" Voltaic SMG ======================
  {
    id: 'stubby-explosive-reload',
    name: 'Explosive Reload',
    tier: 'balanced',
    weaponIds: ['stubby'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
      { kind: 'custom', description: 'Release an explosion whenever the weapon reloads' },
    ],
    description: '+25% Reload Speed; release an explosion on reload',
  },
  {
    id: 'stubby-gas-rerouting',
    name: 'Gas Rerouting',
    tier: 'balanced',
    weaponIds: ['stubby'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+25% Fire Rate, +25% Reload Speed',
  },
  {
    id: 'stubby-potent-juice',
    name: 'Potent Juice',
    tier: 'balanced',
    weaponIds: ['stubby'],
    effects: [
      { kind: 'stat', stat: 'potency', value: 0.30 },
    ],
    description: '+30% Potency',
  },
  {
    id: 'stubby-sidearm',
    name: 'Sidearm',
    tier: 'balanced',
    weaponIds: ['stubby'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.20 },
      { kind: 'crossWeapon', effects: [{ kind: 'stat', stat: 'damage', value: 0.25 }] },
      { kind: 'tagChange', add: [WeaponTag.sidearm] },
    ],
    description: '-20% Damage; all other weapons +25% Damage; adds [SIDEARM] tag',
  },
  {
    // EM Discharge: enables shooting friendly targets — custom targeting/friendly-fire mechanic.
    id: 'stubby-em-discharge',
    name: 'EM Discharge',
    tier: 'unstable',
    weaponIds: ['stubby'],
    effects: [
      { kind: 'custom', description: 'Enables shooting friendly constructs/dwarves for electrical area burst effects' },
    ],
    description: 'Shots can target friendly constructs for electrical burst effects',
  },
  {
    // MK 11: +30 clip size is integer-additive on a multiplicative stat — flagged as custom.
    // accuracy stat not in StatId — captured as custom.
    id: 'stubby-mk11',
    name: 'MK 11',
    tier: 'unstable',
    weaponIds: ['stubby'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
      { kind: 'stat', stat: 'potency', value: 1.00 },
      { kind: 'custom', description: '+30 Clip Size (integer additive); -50 Accuracy' },
    ],
    description: '+25% Fire Rate, +25% Reload Speed, +100% Potency, +30 Clip Size, -50 Accuracy',
  },
  {
    id: 'stubby-storm-emag',
    name: 'Storm E-Mag',
    tier: 'unstable',
    weaponIds: ['stubby'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.10 },
      { kind: 'stat', stat: 'fireRate', value: 0.10 },
      { kind: 'custom', description: 'The last bullet in the clip fires in all directions' },
    ],
    description: '+10% Reload Speed, +10% Fire Rate; last bullet fires in all directions',
  },

  // ====================== Voltaic Shock Fence ======================
  {
    // Adds slow groundzone around each fence post — adds tags + custom for zone detail.
    id: 'shock-fence-coolant-leak',
    name: 'Coolant Leak',
    tier: 'balanced',
    weaponIds: ['shock-fence'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.cold, WeaponTag.groundzone] },
      { kind: 'custom', description: 'Fence posts emit a cold slow groundzone (2 dmg/0.5s tick, 2-unit radius, potency 5 slow, 12s lifetime)' },
    ],
    description: 'Fence posts emit a cold slow groundzone; adds [COLD] and [GROUNDZONE] tags',
  },
  {
    // Fences explode when removed — custom for explosion detail.
    id: 'shock-fence-disposable',
    name: 'Disposable Tech',
    tier: 'balanced',
    weaponIds: ['shock-fence'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.20 },
      { kind: 'stat', stat: 'lifetime', value: -0.20 },
      { kind: 'custom', description: 'Fences explode when removed (45 damage, 4-unit radius); also creates a groundzone (4 dmg/tick, 3.5-unit radius, 6s duration, 4 slow potency)' },
    ],
    description: '+20% Reload Speed, -20% Lifetime; fences explode when removed',
  },
  {
    id: 'shock-fence-extra-capacity-balanced',
    name: 'Extra Capacity',
    tier: 'balanced',
    weaponIds: ['shock-fence'],
    effects: [
      { kind: 'stat', stat: 'turretCap', value: 1 },
      { kind: 'stat', stat: 'range', value: -0.10 },
    ],
    description: '+1 Fence Charge, -10% Range',
  },
  {
    // Turrets pick up XP/materials — custom pickup mechanic.
    id: 'shock-fence-magnetic-alloy',
    name: 'Magnetic Alloy',
    tier: 'balanced',
    weaponIds: ['shock-fence'],
    effects: [
      { kind: 'custom', description: 'Fence posts pick up nearby XP and materials (3.0-unit pickup radius)' },
    ],
    description: 'Fence posts collect nearby XP and materials',
  },
  {
    // Fires beams to nearby constructs — custom inter-construct mechanic.
    id: 'shock-fence-conduit',
    name: 'Conduit',
    tier: 'unstable',
    weaponIds: ['shock-fence'],
    effects: [
      { kind: 'custom', description: 'Fires electrical beams to all nearby construct weapons within 5-unit radius (50% weapon damage, full potency)' },
    ],
    description: 'Fires electrical beams to nearby constructs (50% damage, full potency)',
  },
  {
    id: 'shock-fence-extra-capacity-unstable',
    name: 'Extra Capacity',
    tier: 'unstable',
    weaponIds: ['shock-fence'],
    effects: [
      { kind: 'stat', stat: 'turretCap', value: 3 },
      { kind: 'stat', stat: 'range', value: -0.30 },
    ],
    description: '+3 Fence Charges, -30% Range',
  },
  {
    // Places all fences at once — integer-additive +2 turrets is flagged as custom for bucketing.
    id: 'shock-fence-rapid-deployment',
    name: 'Rapid Deployment',
    tier: 'unstable',
    weaponIds: ['shock-fence'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: -0.50 },
      { kind: 'stat', stat: 'lifetime', value: -0.50 },
      { kind: 'custom', description: '+2 Fence Charges (integer additive); places all fences simultaneously without movement requirement' },
    ],
    description: '+2 Fence Charges, -50% Reload Speed, -50% Lifetime; deploys all fences at once',
  },

  // ====================== LOK-1 Smart Rifle ======================
  {
    id: 'lok1-battery-bullets',
    name: 'Battery Bullets',
    tier: 'balanced',
    weaponIds: ['lok1'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.electric] },
      { kind: 'stat', stat: 'damage', value: 0.10 },
    ],
    description: 'Change damage type to [ELECTRIC], +10% Damage',
  },
  {
    id: 'lok1-bigger-mags',
    name: 'Bigger Mags',
    tier: 'balanced',
    weaponIds: ['lok1'],
    effects: [
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.10 },
    ],
    description: '+100% Clip Size, -10% Reload Speed',
  },
  {
    id: 'lok1-gas-rerouting',
    name: 'Gas Rerouting',
    tier: 'balanced',
    weaponIds: ['lok1'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+25% Fire Rate, +25% Reload Speed',
  },
  {
    id: 'lok1-high-caliber',
    name: 'High Caliber Rounds',
    tier: 'balanced',
    weaponIds: ['lok1'],
    effects: [
      { kind: 'stat', stat: 'piercing', value: 1.00 },
      { kind: 'stat', stat: 'damage', value: 0.30 },
      { kind: 'stat', stat: 'fireRate', value: -0.30 },
    ],
    description: '+100% Piercing, +30% Damage, -30% Fire Rate',
  },
  {
    id: 'lok1-lead-wrapped',
    name: 'Lead Wrapped Ammo',
    tier: 'unstable',
    weaponIds: ['lok1'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 1.50 },
      { kind: 'stat', stat: 'fireRate', value: -0.20 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.20 },
    ],
    description: '+150% Damage, -20% Fire Rate, -20% Reload Speed',
  },
  {
    id: 'lok1-the-favourite',
    name: 'The Favourite',
    tier: 'unstable',
    weaponIds: ['lok1'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.favourite] },
      { kind: 'stat', stat: 'damage', value: 1.00 },
      { kind: 'stat', stat: 'fireRate', value: 1.00 },
      {
        kind: 'crossWeapon',
        effects: [
          { kind: 'stat', stat: 'damage', value: -0.30 },
          { kind: 'stat', stat: 'fireRate', value: -0.30 },
        ],
      },
    ],
    description: '+100% Damage, +100% Fire Rate; all other weapons -30% Damage, -30% Fire Rate',
  },

  // ====================== Deepcore PGL ======================
  {
    id: 'pgl-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['pgl'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    id: 'pgl-cluster-grenades',
    name: 'Cluster Grenades',
    tier: 'balanced',
    weaponIds: ['pgl'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.30 },
      { kind: 'custom', description: 'Grenades split into 3 weaker versions on explosion' },
    ],
    description: '-30% Damage; grenades split into 3 weaker versions',
  },
  {
    id: 'pgl-compact-explosives',
    name: 'Compact Explosives',
    tier: 'balanced',
    weaponIds: ['pgl'],
    effects: [
      { kind: 'stat', stat: 'explosionRadius', value: 0.30 },
    ],
    description: '+30% Explosion Radius',
  },
  {
    id: 'pgl-gas-rerouting',
    name: 'Gas Rerouting',
    tier: 'balanced',
    weaponIds: ['pgl'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+25% Fire Rate, +25% Reload Speed',
  },
  {
    // +100% Clip Size AND +100% Fire Rate together — clip size additive integer on explosive launcher flagged.
    id: 'pgl-bigger-mags',
    name: 'Bigger Mags',
    tier: 'unstable',
    weaponIds: ['pgl'],
    effects: [
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'stat', stat: 'fireRate', value: 1.00 },
    ],
    description: '+100% Clip Size, +100% Fire Rate',
  },
  {
    id: 'pgl-the-favourite',
    name: 'The Favourite',
    tier: 'unstable',
    weaponIds: ['pgl'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.favourite] },
      { kind: 'stat', stat: 'damage', value: 0.75 },
      { kind: 'stat', stat: 'explosionRadius', value: 0.30 },
      {
        kind: 'crossWeapon',
        effects: [
          { kind: 'stat', stat: 'damage', value: -0.25 },
          { kind: 'stat', stat: 'explosionRadius', value: -0.20 },
        ],
      },
    ],
    description: '+75% Damage, +30% Explosion Radius; all other weapons -25% Damage, -20% Explosion Radius',
  },

  // ====================== Breach Cutter ======================
  {
    id: 'breach-cutter-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['breach-cutter'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    // Adds fire/burn on top of plasma — adds tag only; potency inherited from base.
    // TODO: confirm potency inheritance from base weapon
    id: 'breach-cutter-hot-plasma',
    name: 'Hot Plasma',
    tier: 'balanced',
    weaponIds: ['breach-cutter'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'tagChange', add: [WeaponTag.fire] },
    ],
    description: '+15% Damage; plasma burns enemies [FIRE]',
  },
  {
    // Ionized Plasma: adds [ELECTRIC] on top of plasma. Wiki: "+1.1 Potency Shock".
    id: 'breach-cutter-ionized-plasma',
    name: 'Ionized Plasma',
    tier: 'balanced',
    weaponIds: ['breach-cutter'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'potency', value: 1.10 },
      { kind: 'tagChange', add: [WeaponTag.electric] },
    ],
    description: '+15% Damage, +110% Potency; ionized plasma electrocutes enemies [ELECTRIC]',
  },
  {
    id: 'breach-cutter-more-beams',
    name: 'More Beams',
    tier: 'balanced',
    weaponIds: ['breach-cutter'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 1 },
    ],
    description: '+1 Beam',
  },
  {
    id: 'breach-cutter-even-more-beams',
    name: 'Even More Beams',
    tier: 'unstable',
    weaponIds: ['breach-cutter'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 3 },
    ],
    description: '+3 Beams',
  },
  {
    // Plasma balls split into smaller projectiles on expiry — custom mechanic.
    id: 'breach-cutter-experimental-cluster',
    name: 'Experimental Cluster Projectiles',
    tier: 'unstable',
    weaponIds: ['breach-cutter'],
    effects: [
      { kind: 'custom', description: 'Plasma balls split into smaller projectiles when they expire' },
    ],
    description: 'Plasma balls split into smaller projectiles on expiry',
  },

  // ====================== Shard Diffractor ======================
  {
    id: 'shard-diffractor-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['shard-diffractor'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    // Cold Plasma: adds slow/cold on top of plasma — adds tag only.
    // TODO: confirm potency inheritance from base weapon
    id: 'shard-diffractor-cold-plasma',
    name: 'Cold Plasma',
    tier: 'balanced',
    weaponIds: ['shard-diffractor'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'tagChange', add: [WeaponTag.cold] },
    ],
    description: '+15% Damage; supercooled plasma slows enemies [COLD]',
  },
  {
    // Hot Plasma: adds burn on top of plasma — adds tag only.
    // TODO: confirm potency inheritance from base weapon
    id: 'shard-diffractor-hot-plasma',
    name: 'Hot Plasma',
    tier: 'balanced',
    weaponIds: ['shard-diffractor'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'tagChange', add: [WeaponTag.fire] },
    ],
    description: '+15% Damage; superheated plasma burns enemies [FIRE]',
  },
  {
    // Ionized Plasma: adds [ELECTRIC] on top of plasma. Wiki: "+1.1 Potency Shock".
    id: 'shard-diffractor-ionized-plasma',
    name: 'Ionized Plasma',
    tier: 'balanced',
    weaponIds: ['shard-diffractor'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'potency', value: 1.10 },
      { kind: 'tagChange', add: [WeaponTag.electric] },
    ],
    description: '+15% Damage, +110% Potency; ionized plasma electrocutes enemies [ELECTRIC]',
  },
  {
    id: 'shard-diffractor-more-beams',
    name: 'More Beams',
    tier: 'balanced',
    weaponIds: ['shard-diffractor'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 1 },
    ],
    description: '+1 Beam',
  },
  {
    id: 'shard-diffractor-overheat',
    name: 'Overheat',
    tier: 'balanced',
    weaponIds: ['shard-diffractor'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 1.00 },
      { kind: 'stat', stat: 'lifetime', value: -0.35 },
    ],
    description: '+100% Damage, -35% Lifetime',
  },
  {
    id: 'shard-diffractor-even-more-beams',
    name: 'Even More Beams',
    tier: 'unstable',
    weaponIds: ['shard-diffractor'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 3 },
    ],
    description: '+3 Beams',
  },
  {
    id: 'shard-diffractor-overcharged-fuelcells',
    name: 'Overcharged Fuelcells',
    tier: 'unstable',
    weaponIds: ['shard-diffractor'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 1.75 },
      { kind: 'stat', stat: 'lifetime', value: -0.40 },
    ],
    description: '+175% Damage, -40% Lifetime',
  },

  // ====================== Plasma Burster ======================
  {
    id: 'plasma-burster-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['plasma-burster'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    // Cold Plasma: adds slow on top of plasma — adds tag only.
    // TODO: confirm potency inheritance from base weapon
    id: 'plasma-burster-cold-plasma',
    name: 'Cold Plasma',
    tier: 'balanced',
    weaponIds: ['plasma-burster'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'tagChange', add: [WeaponTag.cold] },
    ],
    description: '+15% Damage; supercooled plasma slows enemies [COLD]',
  },
  {
    // Ionized Plasma: adds [ELECTRIC] on top of plasma. Wiki: "+1.1 Potency Shock".
    id: 'plasma-burster-ionized-plasma',
    name: 'Ionized Plasma',
    tier: 'balanced',
    weaponIds: ['plasma-burster'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'potency', value: 1.10 },
      { kind: 'tagChange', add: [WeaponTag.electric] },
    ],
    description: '+15% Damage, +110% Potency; ionized plasma electrocutes enemies [ELECTRIC]',
  },
  {
    // Tape Some Nails: adds secondary kinetic explosion — adds tag + custom for detail.
    id: 'plasma-burster-tape-nails',
    name: 'Tape Some Nails to It',
    tier: 'balanced',
    weaponIds: ['plasma-burster'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.10 },
      { kind: 'tagChange', add: [WeaponTag.kinetic] },
    ],
    description: '+10% Damage; adds an additional [KINETIC] explosion',
  },
  {
    // More Bounce: extends bounce count before detonation — custom, no numeric stat.
    id: 'plasma-burster-more-bounce',
    name: 'More Bounce!',
    tier: 'unstable',
    weaponIds: ['plasma-burster'],
    effects: [
      { kind: 'custom', description: 'Plasma ball bounces more times before detonating' },
    ],
    description: 'Plasma ball bounces more times before detonating',
  },
  {
    id: 'plasma-burster-the-favourite',
    name: 'The Favourite',
    tier: 'unstable',
    weaponIds: ['plasma-burster'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.favourite] },
      { kind: 'stat', stat: 'damage', value: 0.75 },
      { kind: 'stat', stat: 'explosionRadius', value: 0.30 },
      {
        kind: 'crossWeapon',
        effects: [
          { kind: 'stat', stat: 'damage', value: -0.25 },
          { kind: 'stat', stat: 'explosionRadius', value: -0.20 },
        ],
      },
    ],
    description: '+75% Damage, +30% Explosion Radius; all other weapons -25% Damage, -20% Explosion Radius',
  },

  // ====================== Shredder Swarm Grenade ======================
  {
    id: 'shredder-grenade-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['shredder-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    id: 'shredder-grenade-cluster',
    name: 'Cluster Grenades',
    tier: 'balanced',
    weaponIds: ['shredder-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.30 },
      { kind: 'stat', stat: 'potency', value: -0.30 },
      { kind: 'custom', description: 'Grenade splits into 3 weaker versions' },
    ],
    description: '-30% Damage, -30% Potency; splits into 3 weaker versions',
  },
  {
    id: 'shredder-grenade-more-drones-balanced',
    name: 'More Drones',
    tier: 'balanced',
    weaponIds: ['shredder-grenade'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 1 },
    ],
    description: '+1 Drone',
  },
  {
    // Tape Some Ice: adds cold/cryo explosion — adds tag only.
    // TODO: confirm potency inheritance from base weapon
    id: 'shredder-grenade-tape-ice',
    name: 'Tape Some Ice to It!',
    tier: 'balanced',
    weaponIds: ['shredder-grenade'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.cold] },
      { kind: 'custom', description: 'Adds a cryo explosion to the grenade detonation' },
    ],
    description: 'Adds a [COLD] cryo explosion on detonation',
  },
  {
    // Electrified Dispenser: electrical arc tether — custom mechanic, adds electric tag.
    id: 'shredder-grenade-electrified-dispenser',
    name: 'Electrified Dispenser',
    tier: 'unstable',
    weaponIds: ['shredder-grenade'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.electric] },
      { kind: 'custom', description: 'Drones tether to the grenade with an electrical arc' },
    ],
    description: 'Drones tethered to grenade by electrical arc; adds [ELECTRIC] tag',
  },
  {
    id: 'shredder-grenade-more-drones-unstable',
    name: 'More Drones',
    tier: 'unstable',
    weaponIds: ['shredder-grenade'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 3 },
    ],
    description: '+3 Drones',
  },

  // ====================== CRSPR Flamethrower ======================
  {
    id: 'flamethrower-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['flamethrower'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    id: 'flamethrower-bigger-tanks',
    name: 'Bigger Tanks',
    tier: 'balanced',
    weaponIds: ['flamethrower'],
    effects: [
      { kind: 'stat', stat: 'lifetime', value: 1.00 },
      { kind: 'stat', stat: 'range', value: 0.10 },
    ],
    description: '+100% Lifetime, +10% Range',
  },
  {
    id: 'flamethrower-more-beams',
    name: 'More Beams',
    tier: 'balanced',
    weaponIds: ['flamethrower'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 1 },
    ],
    description: '+1 Beam',
  },
  {
    id: 'flamethrower-overheat',
    name: 'Overheat',
    tier: 'balanced',
    weaponIds: ['flamethrower'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 1.00 },
      { kind: 'stat', stat: 'lifetime', value: -0.35 },
    ],
    description: '+100% Damage, -35% Lifetime',
  },
  {
    id: 'flamethrower-even-more-beams',
    name: 'Even More Beams',
    tier: 'unstable',
    weaponIds: ['flamethrower'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 3 },
    ],
    description: '+3 Beams',
  },
  {
    id: 'flamethrower-spliced-emitter',
    name: 'Spliced Emitter',
    tier: 'unstable',
    weaponIds: ['flamethrower'],
    effects: [
      { kind: 'stat', stat: 'range', value: 0.75 },
      { kind: 'stat', stat: 'damage', value: 0.75 },
      { kind: 'stat', stat: 'potency', value: 0.75 },
    ],
    description: '+75% Range, +75% Damage, +75% Potency',
  },
  {
    // Sticky Fuel creates burning groundzones — adds tag + custom for zone details.
    id: 'flamethrower-sticky-fuel',
    name: 'Sticky Fuel',
    tier: 'unstable',
    weaponIds: ['flamethrower'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.groundzone] },
      { kind: 'custom', description: 'Creates burning groundzones (4 damage, 8 Burn potency, 1-unit radius, 3s lifetime)' },
    ],
    description: 'Beams create burning groundzones; adds [GROUNDZONE] tag',
  },

  // ====================== High Explosive Grenade ======================
  {
    id: 'he-grenade-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['he-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    id: 'he-grenade-cluster',
    name: 'Cluster Grenades',
    tier: 'balanced',
    weaponIds: ['he-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.30 },
      { kind: 'custom', description: 'Grenade splits into 3 weaker versions on explosion' },
    ],
    description: '-30% Damage; splits into 3 weaker grenades',
  },
  {
    id: 'he-grenade-compact',
    name: 'Compact Explosives',
    tier: 'balanced',
    weaponIds: ['he-grenade'],
    effects: [
      { kind: 'stat', stat: 'explosionRadius', value: 0.30 },
    ],
    description: '+30% Explosion Radius',
  },
  {
    id: 'he-grenade-feedback-harness',
    name: 'Feedback Harness',
    tier: 'unstable',
    weaponIds: ['he-grenade'],
    effects: [
      { kind: 'custom', description: 'Throws grenades when you take damage; 10 second cooldown' },
    ],
    description: 'Throws grenades on damage taken (10s cooldown)',
  },
  {
    // Hallucinogenic: enemies flee in fear — behavioral/AI mechanic, custom.
    id: 'he-grenade-hallucinogenic',
    name: 'Hallucinogenic',
    tier: 'unstable',
    weaponIds: ['he-grenade'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
      { kind: 'stat', stat: 'explosionRadius', value: 0.25 },
      { kind: 'custom', description: 'Enemies flee in fear after the explosion' },
    ],
    description: '+25% Reload Speed, +25% Explosion Radius; enemies flee in fear',
  },

  // ====================== Subata 120 ======================
  {
    // Changes damage type to [ACID].
    id: 'subata-acid-dipped',
    name: 'Acid Dipped Tips',
    tier: 'balanced',
    weaponIds: ['subata'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.acid] },
    ],
    description: 'Change damage type to [ACID]',
  },
  {
    id: 'subata-bigger-mags',
    name: 'Bigger Mags',
    tier: 'balanced',
    weaponIds: ['subata'],
    effects: [
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'stat', stat: 'piercing', value: 0.50 },
    ],
    description: '+100% Clip Size, +50% Piercing',
  },
  {
    id: 'subata-gas-rerouting',
    name: 'Gas Rerouting',
    tier: 'balanced',
    weaponIds: ['subata'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+25% Fire Rate, +25% Reload Speed',
  },
  {
    // Changes damage type to [FIRE].
    id: 'subata-pan-fried',
    name: 'Pan Fried Shells',
    tier: 'balanced',
    weaponIds: ['subata'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.fire] },
    ],
    description: 'Change damage type to [FIRE]',
  },
  {
    id: 'subata-sidearm',
    name: 'Sidearm',
    tier: 'balanced',
    weaponIds: ['subata'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.20 },
      { kind: 'crossWeapon', effects: [{ kind: 'stat', stat: 'damage', value: 0.25 }] },
      { kind: 'tagChange', add: [WeaponTag.sidearm] },
    ],
    description: '-20% Damage; all other weapons +25% Damage; adds [SIDEARM] tag',
  },
  {
    // Akimbo: shoots an additional time in the opposite direction — custom firing mechanic.
    id: 'subata-akimbo',
    name: 'Akimbo',
    tier: 'unstable',
    weaponIds: ['subata'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'potency', value: 0.25 },
      { kind: 'custom', description: 'Shoots an additional time in the opposite direction simultaneously' },
    ],
    description: '+25% Fire Rate, +25% Potency; shoots in the opposite direction simultaneously',
  },
  {
    // Double Barrel!: shoots two parallel bullets — custom firing mechanic (similar to boltshark/bulldog).
    id: 'subata-double-barrel',
    name: 'Double Barrel!',
    tier: 'unstable',
    weaponIds: ['subata'],
    effects: [
      { kind: 'custom', description: 'Shoots two parallel bullets simultaneously' },
    ],
    description: 'Shoots two parallel bullets',
  },

  // ====================== Krakatoa Sentinel ======================
  {
    id: 'krakatoa-extra-capacity-balanced',
    name: 'Extra Capacity',
    tier: 'balanced',
    weaponIds: ['krakatoa'],
    effects: [
      { kind: 'stat', stat: 'turretCap', value: 1 },
      { kind: 'stat', stat: 'range', value: 0.10 },
    ],
    description: '+1 Turret, +10% Range',
  },
  {
    // Mining Directive: turrets mine nearby walls — custom behavior, no numeric stats.
    id: 'krakatoa-mining-directive',
    name: 'Mining Directive',
    tier: 'balanced',
    weaponIds: ['krakatoa'],
    effects: [
      { kind: 'custom', description: 'Turrets mine nearby walls' },
    ],
    description: 'Turrets mine nearby walls',
  },
  {
    id: 'krakatoa-more-beams',
    name: 'More Beams',
    tier: 'balanced',
    weaponIds: ['krakatoa'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 1 },
    ],
    description: '+1 Beam',
  },
  {
    // Tank Tracks: turrets follow player at 43% move speed — custom movement mechanic.
    id: 'krakatoa-tank-tracks',
    name: 'Tank Tracks',
    tier: 'balanced',
    weaponIds: ['krakatoa'],
    effects: [
      { kind: 'custom', description: 'Turrets follow the player at 43% of player move speed' },
    ],
    description: 'Turrets follow the player at 43% move speed',
  },
  {
    id: 'krakatoa-extra-capacity-unstable',
    name: 'Extra Capacity',
    tier: 'unstable',
    weaponIds: ['krakatoa'],
    effects: [
      { kind: 'stat', stat: 'turretCap', value: 3 },
      { kind: 'stat', stat: 'range', value: 0.10 },
    ],
    description: '+3 Turrets, +10% Range',
  },
  {
    // Krakatoa Protocol: turrets explode on death creating fire+electric groundzones — custom complex mechanic.
    id: 'krakatoa-protocol',
    name: 'Krakatoa Protocol',
    tier: 'unstable',
    weaponIds: ['krakatoa'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.explosive, WeaponTag.electric, WeaponTag.groundzone] },
      { kind: 'custom', description: 'Turrets explode on death (10 damage + knockback); create 2 groundzones (5s lifetime, 3.5-unit radius, 2 dmg/0.5s tick, 5 Burn + 5 Shock potency)' },
    ],
    description: 'Turrets explode on death with knockback, creating fire+electric groundzones',
  },

  // ====================== Corrosive Sludge Pump ======================
  {
    id: 'sludge-pump-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['sludge-pump'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    id: 'sludge-pump-bigger-tanks',
    name: 'Bigger Tanks',
    tier: 'balanced',
    weaponIds: ['sludge-pump'],
    effects: [
      { kind: 'stat', stat: 'lifetime', value: 1.00 },
      { kind: 'stat', stat: 'range', value: 0.10 },
    ],
    description: '+100% Lifetime, +10% Range',
  },
  {
    id: 'sludge-pump-impact-punch',
    name: 'Impact Punch',
    tier: 'balanced',
    weaponIds: ['sludge-pump'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.60 },
    ],
    description: '+60% Damage',
  },
  {
    id: 'sludge-pump-more-beams',
    name: 'More Beams',
    tier: 'balanced',
    weaponIds: ['sludge-pump'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 1 },
    ],
    description: '+1 Beam',
  },
  {
    id: 'sludge-pump-even-more-beams',
    name: 'Even More Beams',
    tier: 'unstable',
    weaponIds: ['sludge-pump'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 3 },
    ],
    description: '+3 Beams',
  },
  {
    // Top-Shelf Sludge: adds Burn and Shock status to groundzones — wiki shows "+X" placeholders, no exact potency values.
    id: 'sludge-pump-top-shelf',
    name: 'Top-Shelf Sludge',
    tier: 'unstable',
    weaponIds: ['sludge-pump'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.fire, WeaponTag.electric] },
      { kind: 'custom', description: 'Groundzones also apply Burn and Shock status effects (exact potency not listed on wiki)' },
    ],
    description: 'Groundzones apply Burn and Shock status effects; adds [FIRE] and [ELECTRIC] tags',
  },

  // ====================== Colette Wave Cooker ======================
  {
    // Better Ball Bearings: doubles rotation speed — pure behavioral, custom.
    id: 'wave-cooker-better-ball-bearings',
    name: 'Better Ball Bearings',
    tier: 'balanced',
    weaponIds: ['wave-cooker'],
    effects: [
      { kind: 'custom', description: 'Doubles the beam rotation speed' },
    ],
    description: 'Doubles beam rotation speed',
  },
  {
    // Crowd Cooker: +30% beam width — accuracy/cone angle stat not in StatId, custom.
    id: 'wave-cooker-crowd-cooker',
    name: 'Crowd Cooker',
    tier: 'balanced',
    weaponIds: ['wave-cooker'],
    effects: [
      { kind: 'custom', description: '+30% beam width (cone angle)' },
    ],
    description: '+30% beam width',
  },
  {
    // Focused Lens: +100% Damage, +3 absolute units of range, -40% beam angle (narrower cone).
    // Range bonus is integer-additive (absolute units) not multiplicative — custom.
    id: 'wave-cooker-focused-lens',
    name: 'Focused Lens',
    tier: 'balanced',
    weaponIds: ['wave-cooker'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 1.00 },
      { kind: 'targeting', targeting: 'highestHp' },
      { kind: 'custom', description: '+3 Range (absolute units); -40% beam angle (narrower cone); targets highest HP enemy' },
    ],
    description: '+100% Damage, +3 Range (absolute), -40% beam angle; targets highest HP enemy',
  },
  {
    id: 'wave-cooker-nano-waves',
    name: 'Nano Waves',
    tier: 'balanced',
    weaponIds: ['wave-cooker'],
    effects: [
      { kind: 'stat', stat: 'potency', value: 1.00 },
      { kind: 'stat', stat: 'damage', value: -0.30 },
    ],
    description: '+100% Potency, -30% Damage',
  },
  {
    // Centralized Reflector: adds a second beam firing in the opposite direction.
    id: 'wave-cooker-centralized-reflector',
    name: 'Centralized Reflector',
    tier: 'unstable',
    weaponIds: ['wave-cooker'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 1 },
    ],
    description: '+1 Beam (fires in the opposite direction)',
  },
  {
    // Thermal Oscillator: adds Slow/Cold status alongside fire; exact cold potency not on wiki.
    id: 'wave-cooker-thermal-oscillator',
    name: 'Thermal Oscillator',
    tier: 'unstable',
    weaponIds: ['wave-cooker'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.50 },
      { kind: 'stat', stat: 'potency', value: 0.40 },
      { kind: 'tagChange', add: [WeaponTag.cold] },
      { kind: 'custom', description: 'Also applies Slow status (exact cold potency not listed on wiki)' },
    ],
    description: '+50% Damage, +40% Potency; also applies Slow [COLD] status',
  },

  // ====================== Impact Axe ======================
  {
    id: 'impact-axe-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['impact-axe'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    // Corrosive Coating: leaves acid trail groundzone — adds tag + custom for zone detail.
    id: 'impact-axe-corrosive-coating',
    name: 'Corrosive Coating',
    tier: 'balanced',
    weaponIds: ['impact-axe'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.acid, WeaponTag.groundzone] },
      { kind: 'custom', description: 'Leaves an acid trail (27 dmg/0.5s tick, 2s lifetime, 0.75-unit radius, 10 Corrode potency)' },
    ],
    description: 'Axes leave acid groundzone trails; adds [ACID] and [GROUNDZONE] tags',
  },
  {
    // Diesel Soaked: leaves fire trail groundzone — adds tag + custom for zone detail.
    id: 'impact-axe-diesel-soaked',
    name: 'Diesel Soaked',
    tier: 'balanced',
    weaponIds: ['impact-axe'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.fire, WeaponTag.groundzone] },
      { kind: 'custom', description: 'Leaves a fire trail (27 dmg/0.5s tick, 2s lifetime, 0.75-unit radius, 10 Burn potency)' },
    ],
    description: 'Axes leave fire groundzone trails; adds [FIRE] and [GROUNDZONE] tags',
  },
  {
    id: 'impact-axe-lightweight-alloy',
    name: 'Lightweight Alloy',
    tier: 'balanced',
    weaponIds: ['impact-axe'],
    effects: [
      { kind: 'stat', stat: 'range', value: 0.50 },
    ],
    description: '+50% Range',
  },
  {
    id: 'impact-axe-colossal-twinblade',
    name: 'Colossal Twinblade',
    tier: 'unstable',
    weaponIds: ['impact-axe'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 1.25 },
      { kind: 'stat', stat: 'explosionRadius', value: 0.75 },
    ],
    description: '+125% Damage, +75% Explosion Radius',
  },
  {
    // Fan of Axes: wiki only lists -50% Damage; likely adds more axes but count not confirmed.
    id: 'impact-axe-fan-of-axes',
    name: 'Fan of Axes',
    tier: 'unstable',
    weaponIds: ['impact-axe'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.50 },
      { kind: 'custom', description: 'Throws multiple axes in a fan pattern (exact count not confirmed on wiki)' },
    ],
    description: '-50% Damage; throws axes in a fan pattern',
  },

  // ====================== Neurotoxin Grenade ======================
  {
    id: 'neurotoxin-grenade-cluster',
    name: 'Cluster Grenades',
    tier: 'balanced',
    weaponIds: ['neurotoxin-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.20 },
      { kind: 'stat', stat: 'potency', value: -0.20 },
      { kind: 'custom', description: 'Grenade splits into 3 weaker versions on explosion' },
    ],
    description: '-20% Damage, -20% Potency; splits into 3 weaker grenades',
  },
  {
    id: 'neurotoxin-grenade-compact',
    name: 'Compact Explosives',
    tier: 'balanced',
    weaponIds: ['neurotoxin-grenade'],
    effects: [
      { kind: 'stat', stat: 'explosionRadius', value: 0.30 },
    ],
    description: '+30% Explosion Radius',
  },
  {
    id: 'neurotoxin-grenade-potent-juice',
    name: 'Potent Juice',
    tier: 'balanced',
    weaponIds: ['neurotoxin-grenade'],
    effects: [
      { kind: 'stat', stat: 'potency', value: 0.30 },
    ],
    description: '+30% Potency',
  },
  {
    // Tape Some Nails: adds secondary kinetic explosion — adds tag + custom for detail.
    id: 'neurotoxin-grenade-tape-nails',
    name: 'Tape Some Nails to It',
    tier: 'balanced',
    weaponIds: ['neurotoxin-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.10 },
      { kind: 'tagChange', add: [WeaponTag.kinetic] },
    ],
    description: '+10% Damage; adds an additional [KINETIC] explosion',
  },
  {
    id: 'neurotoxin-grenade-feedback-harness',
    name: 'Feedback Harness',
    tier: 'unstable',
    weaponIds: ['neurotoxin-grenade'],
    effects: [
      { kind: 'custom', description: 'Throws grenades when you take damage; 10 second cooldown' },
    ],
    description: 'Throws grenades on damage taken (10s cooldown)',
  },
  {
    // Hallucinogenic: enemies flee in fear — behavioral/AI mechanic, custom.
    id: 'neurotoxin-grenade-hallucinogenic',
    name: 'Hallucinogenic',
    tier: 'unstable',
    weaponIds: ['neurotoxin-grenade'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
      { kind: 'stat', stat: 'explosionRadius', value: 0.25 },
      { kind: 'custom', description: 'Enemies flee in fear after the explosion' },
    ],
    description: '+25% Reload Speed, +25% Explosion Radius; enemies flee in fear',
  },

  // ====================== Cryo Cannon ======================
  {
    id: 'cryo-cannon-bigger-tanks',
    name: 'Bigger Tanks',
    tier: 'balanced',
    weaponIds: ['cryo-cannon'],
    effects: [
      { kind: 'stat', stat: 'lifetime', value: 1.00 },
      { kind: 'stat', stat: 'range', value: 0.10 },
    ],
    description: '+100% Lifetime, +10% Range',
  },
  {
    // Frostburn: adds fire damage alongside cold — adds tag; base potency carries over.
    id: 'cryo-cannon-frostburn',
    name: 'Frostburn',
    tier: 'balanced',
    weaponIds: ['cryo-cannon'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'tagChange', add: [WeaponTag.fire] },
    ],
    description: '+15% Damage; also applies Burn [FIRE] damage',
  },
  {
    id: 'cryo-cannon-impact-punch',
    name: 'Impact Punch',
    tier: 'balanced',
    weaponIds: ['cryo-cannon'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.60 },
    ],
    description: '+60% Damage',
  },
  {
    id: 'cryo-cannon-more-beams',
    name: 'More Beams',
    tier: 'balanced',
    weaponIds: ['cryo-cannon'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 1 },
    ],
    description: '+1 Beam',
  },
  {
    id: 'cryo-cannon-even-more-beams',
    name: 'Even More Beams',
    tier: 'unstable',
    weaponIds: ['cryo-cannon'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 3 },
    ],
    description: '+3 Beams',
  },
  {
    id: 'cryo-cannon-spliced-emitter',
    name: 'Spliced Emitter',
    tier: 'unstable',
    weaponIds: ['cryo-cannon'],
    effects: [
      { kind: 'stat', stat: 'range', value: 0.75 },
      { kind: 'stat', stat: 'damage', value: 0.75 },
      { kind: 'stat', stat: 'potency', value: 0.75 },
    ],
    description: '+75% Range, +75% Damage, +75% Potency',
  },

  // ====================== K1-P Viper Drone ======================
  {
    id: 'viper-behaviour-defensive',
    name: 'Behaviour Chip: Defensive',
    tier: 'balanced',
    weaponIds: ['viper'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 2 },
      { kind: 'stat', stat: 'range', value: -0.10 },
    ],
    description: '+2 Drones, -10% Range',
  },
  {
    id: 'viper-disposable',
    name: 'Disposable Tech',
    tier: 'balanced',
    weaponIds: ['viper'],
    effects: [
      { kind: 'stat', stat: 'lifetime', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.40 },
    ],
    description: '+100% Lifetime, +40% Reload Speed',
  },
  {
    id: 'viper-more-drones-balanced',
    name: 'More Drones',
    tier: 'balanced',
    weaponIds: ['viper'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 1 },
    ],
    description: '+1 Drone',
  },
  {
    id: 'viper-potent-juice',
    name: 'Potent Juice',
    tier: 'balanced',
    weaponIds: ['viper'],
    effects: [
      { kind: 'stat', stat: 'potency', value: 0.30 },
    ],
    description: '+30% Potency',
  },
  {
    // Crisis Protocol: drones rush to protect player when taking damage — behavioral custom mechanic.
    id: 'viper-crisis-protocol',
    name: 'Crisis Protocol',
    tier: 'unstable',
    weaponIds: ['viper'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.25 },
      { kind: 'stat', stat: 'potency', value: 0.25 },
      { kind: 'custom', description: 'Drones rush to protect you when you take damage (2.5s duration at increased speed)' },
    ],
    description: '+25% Damage, +25% Potency; drones rush to protect you when hit',
  },
  {
    id: 'viper-more-drones-unstable',
    name: 'More Drones',
    tier: 'unstable',
    weaponIds: ['viper'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 3 },
    ],
    description: '+3 Drones',
  },

  // ====================== Experimental Plasma Charger ======================
  {
    id: 'epc-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: ['epc'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    // Cold Plasma: adds slow/cold status — adds tag only; exact cold potency not on wiki.
    id: 'epc-cold-plasma',
    name: 'Cold Plasma',
    tier: 'balanced',
    weaponIds: ['epc'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'tagChange', add: [WeaponTag.cold] },
      { kind: 'custom', description: 'Supercooled plasma slows enemies (exact cold potency not listed on wiki)' },
    ],
    description: '+15% Damage; supercooled plasma slows enemies [COLD]',
  },
  {
    // Hot Plasma: adds burn status — adds tag only; exact burn potency not on wiki.
    id: 'epc-hot-plasma',
    name: 'Hot Plasma',
    tier: 'balanced',
    weaponIds: ['epc'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'tagChange', add: [WeaponTag.fire] },
      { kind: 'custom', description: 'Superheated plasma burns enemies (exact burn potency not listed on wiki)' },
    ],
    description: '+15% Damage; superheated plasma burns enemies [FIRE]',
  },
  {
    // Vortex Core: projectiles pull nearby enemies — gravitational mechanic, custom.
    id: 'epc-vortex-core',
    name: 'Vortex Core',
    tier: 'balanced',
    weaponIds: ['epc'],
    effects: [
      { kind: 'custom', description: 'EPC projectiles pull enemies toward them within a radius' },
    ],
    description: 'Projectiles pull nearby enemies inward',
  },
  {
    // Drippin Balls: creates fire groundzones beneath projectile path — adds tag + custom for zone detail.
    id: 'epc-drippin-balls',
    name: "Drippin' Balls",
    tier: 'unstable',
    weaponIds: ['epc'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.groundzone] },
      { kind: 'custom', description: 'Creates fire groundzones beneath projectile trajectory (22 dmg/0.5s tick, 2s lifetime, 1-unit radius, 16 Burn potency)' },
    ],
    description: 'Projectile leaves fire groundzones along its path; adds [GROUNDZONE] tag',
  },
  {
    // Experimental Cluster Projectiles: plasma balls split into smaller projectiles on expiry — custom mechanic.
    id: 'epc-experimental-cluster',
    name: 'Experimental Cluster Projectiles',
    tier: 'unstable',
    weaponIds: ['epc'],
    effects: [
      { kind: 'custom', description: 'Plasma balls split into smaller projectiles upon expiration' },
    ],
    description: 'Plasma balls split into smaller projectiles on expiry',
  },

  // ====================== Nishanka Boltshark X-80 ======================
  {
    id: 'boltshark-cryo-bolt',
    name: 'Cryo Bolt',
    tier: 'balanced',
    weaponIds: ['boltshark'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.cold] },
      { kind: 'custom', description: 'Adds a Cryo bolt to the rotation' },
    ],
    description: 'Adds [COLD] Cryo bolt to the shot rotation',
  },
  {
    id: 'boltshark-fire-bolt',
    name: 'Fire Bolt',
    tier: 'balanced',
    weaponIds: ['boltshark'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.fire] },
      { kind: 'custom', description: 'Adds a Fire bolt to the rotation' },
    ],
    description: 'Adds [FIRE] Fire bolt to the shot rotation',
  },
  {
    id: 'boltshark-gas-rerouting',
    name: 'Gas Rerouting',
    tier: 'balanced',
    weaponIds: ['boltshark'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+25% Fire Rate, +25% Reload Speed',
  },
  {
    id: 'boltshark-rubber-tip',
    name: 'Rubber Tip',
    tier: 'balanced',
    weaponIds: ['boltshark'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'custom', description: 'Adds knockback to bolts' },
    ],
    description: '+15% Damage, adds Knockback',
  },
  {
    id: 'boltshark-bolt-volley',
    name: 'Bolt Volley',
    tier: 'unstable',
    weaponIds: ['boltshark'],
    effects: [
      { kind: 'custom', description: 'Shoot all bolt types simultaneously in burst-fire mode instead of rotating' },
    ],
    description: 'Shoot all bolt types at once in burst-fire mode',
  },
  {
    id: 'boltshark-payload',
    name: 'Payload',
    tier: 'unstable',
    weaponIds: ['boltshark'],
    effects: [
      { kind: 'custom', description: 'Arrows leave an electrical field dealing damage in an area when hitting large enemies or terrain' },
    ],
    description: 'Arrows leave electrical area-damage fields on large enemy/terrain hits',
  },
  {
    id: 'boltshark-storm-emag',
    name: 'Storm E-Mag',
    tier: 'unstable',
    weaponIds: ['boltshark'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.10 },
      { kind: 'stat', stat: 'fireRate', value: 0.10 },
      { kind: 'custom', description: 'The last bolt fires in all directions' },
    ],
    description: '+10% Reload Speed, +10% Fire Rate; last bolt fires in all directions',
  },
]

// Lookup helpers
export const overclocksMap: Record<string, Overclock> = Object.fromEntries(
  overclocks.map(oc => [oc.id, oc])
)

export function overclocksForWeapon(weaponId: string): Overclock[] {
  return overclocks.filter(oc => oc.weaponIds.includes(weaponId))
}

export function balancedOverclocksForWeapon(weaponId: string): Overclock[] {
  return overclocksForWeapon(weaponId).filter(oc => oc.tier === 'balanced')
}

export function unstableOverclocksForWeapon(weaponId: string): Overclock[] {
  return overclocksForWeapon(weaponId).filter(oc => oc.tier === 'unstable')
}
