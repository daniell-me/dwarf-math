import type { Overclock } from './types'
import { WeaponTag } from './types'

/**
 * Overclocks: per-weapon modifiers rolled at weapon levels 6, 12 (balanced)
 * and 18 (unstable). Pool membership lives on the OC (`weaponIds`) so shared
 * OCs aren't duplicated — one entry per (name, effect-shape) tuple.
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
 * Variants: when the wiki lists the same OC name with different stat bundles
 * across weapons (e.g. "Bigger Mags" clip+reload vs clip+pierce), each bundle
 * gets its own entry with a `-<variant>` id suffix and shared display name.
 *
 * Coverage gap: 11 weapons (proximity-mines, twincoil, chimera, dragonstorm,
 * voltaic-field, slither-drones, e1m1, toxic-sludge, springloaded-ripper,
 * kaisong, carrier-drone) have no OC entries yet — pending follow-up. Their
 * IDs are intentionally absent from weaponIds even on shared OCs.
 */

export const overclocks: Overclock[] = [
  // ======================================================================
  // BALANCED
  // ======================================================================

  {
    id: 'oc-oomph',
    name: 'A Little More Oomph!',
    tier: 'balanced',
    weaponIds: [
      'gk2', 'cryo-grenade', 'm1000', 'thor', 'drak', 'thunderhead',
      'hurricane', 'coil-gun', 'pgl', 'breach-cutter', 'shard-diffractor',
      'plasma-burster', 'shredder-grenade', 'flamethrower', 'he-grenade',
      'sludge-pump', 'impact-axe', 'epc',
    ],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+15% Damage, +25% Reload Speed',
  },
  {
    id: 'oc-acid-dipped-tips',
    name: 'Acid Dipped Tips',
    tier: 'balanced',
    weaponIds: ['subata'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.acid] },
    ],
    description: 'Change damage type to [ACID]',
  },
  {
    id: 'oc-battery-bullets',
    name: 'Battery Bullets',
    tier: 'balanced',
    weaponIds: ['gk2', 'zhukov', 'boomstick', 'warthog', 'turret', 'lok1'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.electric] },
      { kind: 'stat', stat: 'damage', value: 0.10 },
    ],
    description: 'Change damage type to [ELECTRIC], +10% Damage',
  },
  {
    id: 'oc-behaviour-aggro',
    name: 'Behaviour Chip: Aggro',
    tier: 'balanced',
    weaponIds: ['cryo-guard', 'thunderbird'],
    effects: [
      { kind: 'custom', description: 'Drones actively seek out nearby enemies instead of orbiting' },
    ],
    description: 'Drones actively seek out enemies',
  },
  {
    id: 'oc-behaviour-defensive',
    name: 'Behaviour Chip: Defensive',
    tier: 'balanced',
    weaponIds: ['firefly', 'viper'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 2 },
      { kind: 'stat', stat: 'range', value: -0.10 },
    ],
    description: '+2 Drones, -10% Range',
  },
  {
    // Doubles beam rotation speed — pure behavioral.
    id: 'oc-better-ball-bearings',
    name: 'Better Ball Bearings',
    tier: 'balanced',
    weaponIds: ['wave-cooker'],
    effects: [
      { kind: 'custom', description: 'Doubles the beam rotation speed' },
    ],
    description: 'Doubles beam rotation speed',
  },
  {
    id: 'oc-big-game-hunter',
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
    id: 'oc-bigger-mags',
    name: 'Bigger Mags',
    tier: 'balanced',
    weaponIds: [
      'boomstick', 'm1000', 'drak', 'minigun', 'bulldog', 'brt7',
      'thunderhead', 'lok1',
    ],
    effects: [
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.10 },
    ],
    description: '+100% Clip Size, -10% Reload Speed',
  },
  {
    // "Bigger Mags" variant on SMG-class weapons: clip + piercing instead of clip - reload.
    id: 'oc-bigger-mags-pierce',
    name: 'Bigger Mags',
    tier: 'balanced',
    weaponIds: ['zhukov', 'subata'],
    effects: [
      { kind: 'stat', stat: 'clipSize', value: 1.00 },
      { kind: 'stat', stat: 'piercing', value: 0.50 },
    ],
    description: '+100% Clip Size, +50% Piercing',
  },
  {
    id: 'oc-bigger-tanks',
    name: 'Bigger Tanks',
    tier: 'balanced',
    weaponIds: ['flamethrower', 'sludge-pump', 'cryo-cannon'],
    effects: [
      { kind: 'stat', stat: 'lifetime', value: 1.00 },
      { kind: 'stat', stat: 'range', value: 0.10 },
    ],
    description: '+100% Lifetime, +10% Range',
  },
  {
    id: 'oc-cluster-grenades',
    name: 'Cluster Grenades',
    tier: 'balanced',
    weaponIds: ['pgl', 'he-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.30 },
      { kind: 'custom', description: 'Grenade splits into 3 weaker versions on explosion' },
    ],
    description: '-30% Damage; splits into 3 weaker versions',
  },
  {
    // Variant for grenades that also deal a status (cryo/burn/poison).
    id: 'oc-cluster-grenades-status',
    name: 'Cluster Grenades',
    tier: 'balanced',
    weaponIds: ['cryo-grenade', 'incendiary-grenade', 'neurotoxin-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.20 },
      { kind: 'stat', stat: 'potency', value: -0.20 },
      { kind: 'custom', description: 'Grenade splits into 3 weaker versions on explosion' },
    ],
    description: '-20% Damage, -20% Potency; splits into 3 weaker versions',
  },
  {
    // Shredder Swarm Grenade variant: deeper potency cut.
    id: 'oc-cluster-grenades-shredder',
    name: 'Cluster Grenades',
    tier: 'balanced',
    weaponIds: ['shredder-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.30 },
      { kind: 'stat', stat: 'potency', value: -0.30 },
      { kind: 'custom', description: 'Grenade splits into 3 weaker versions on explosion' },
    ],
    description: '-30% Damage, -30% Potency; splits into 3 weaker versions',
  },
  {
    // Tactical Leadburster variant: hits dmg/FR/RS instead of damage+potency.
    id: 'oc-cluster-grenades-leadburster',
    name: 'Cluster Grenades',
    tier: 'balanced',
    weaponIds: ['leadburster'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.15 },
      { kind: 'stat', stat: 'fireRate', value: -0.15 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.15 },
      { kind: 'custom', description: 'Grenade splits into 3 weaker versions on explosion' },
    ],
    description: '-15% Damage, -15% Fire Rate, -15% Reload Speed; splits into 3 weaker versions',
  },
  {
    id: 'oc-coilgun-mining-damage',
    name: 'Coilgun Mining Damage',
    tier: 'balanced',
    weaponIds: ['coil-gun'],
    effects: [
      { kind: 'custom', description: 'Shots now deal damage to terrain' },
    ],
    description: 'Shots deal terrain damage',
  },
  {
    id: 'oc-cold-plasma',
    name: 'Cold Plasma',
    tier: 'balanced',
    weaponIds: ['drak', 'shard-diffractor', 'plasma-burster', 'epc'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'tagChange', add: [WeaponTag.cold] },
    ],
    description: '+15% Damage; supercooled plasma slows enemies [COLD]',
  },
  {
    id: 'oc-compact-explosives',
    name: 'Compact Explosives',
    tier: 'balanced',
    weaponIds: ['cryo-grenade', 'incendiary-grenade', 'pgl', 'he-grenade', 'neurotoxin-grenade'],
    effects: [
      { kind: 'stat', stat: 'explosionRadius', value: 0.30 },
    ],
    description: '+30% Explosion Radius',
  },
  {
    id: 'oc-coolant-leak',
    name: 'Coolant Leak',
    tier: 'balanced',
    weaponIds: ['seismic-repulsor', 'shock-fence'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.cold, WeaponTag.groundzone] },
      { kind: 'custom', description: 'Turrets emit a cold slow groundzone (2 dmg/0.5s tick, potency 5 slow, 12s lifetime, 2-unit radius)' },
    ],
    description: 'Turrets emit a cold slow groundzone; adds [COLD] and [GROUNDZONE] tags',
  },
  {
    // Leaves an acid trail groundzone on Impact Axe.
    id: 'oc-corrosive-coating',
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
    // +30% beam width — accuracy/cone stat not in StatId.
    id: 'oc-crowd-cooker',
    name: 'Crowd Cooker',
    tier: 'balanced',
    weaponIds: ['wave-cooker'],
    effects: [
      { kind: 'custom', description: '+30% beam width (cone angle)' },
    ],
    description: '+30% beam width',
  },
  {
    id: 'oc-cryo-bolt',
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
    // Leaves a fire trail groundzone on Impact Axe.
    id: 'oc-diesel-soaked',
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
    // Drones explode at end-of-life; per-weapon zone details vary.
    id: 'oc-disposable-tech',
    name: 'Disposable Tech',
    tier: 'balanced',
    weaponIds: ['cryo-guard', 'firefly', 'thunderbird', 'viper'],
    effects: [
      { kind: 'stat', stat: 'lifetime', value: 1.00 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.40 },
      { kind: 'custom', description: 'Drones explode instead of returning' },
    ],
    description: '+100% Lifetime, +40% Reload Speed; drones explode instead of returning',
  },
  {
    // Seismic Repulsor variant: opposite-sign reload/lifetime trade.
    id: 'oc-disposable-tech-seismic',
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
    // Voltaic Shock Fence variant: smaller magnitudes.
    id: 'oc-disposable-tech-shock-fence',
    name: 'Disposable Tech',
    tier: 'balanced',
    weaponIds: ['shock-fence'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.20 },
      { kind: 'stat', stat: 'lifetime', value: -0.20 },
      { kind: 'custom', description: 'Fences explode when removed (45 damage, 4-unit radius); also creates a slow groundzone' },
    ],
    description: '+20% Reload Speed, -20% Lifetime; fences explode when removed',
  },
  {
    id: 'oc-drone-mining-damage',
    name: 'Drone Mining Damage',
    tier: 'balanced',
    weaponIds: ['firefly'],
    effects: [
      { kind: 'custom', description: 'Drones now deal damage to terrain' },
    ],
    description: 'Drones deal terrain damage',
  },
  {
    id: 'oc-explosive-reload',
    name: 'Explosive Reload',
    tier: 'balanced',
    weaponIds: ['zhukov', 'thor', 'coil-gun', 'stubby'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
      { kind: 'custom', description: 'Release an explosion whenever the weapon reloads' },
    ],
    description: '+25% Reload Speed; release an explosion on reload',
  },
  {
    // Extra Capacity is per-construct-weapon — each has unique secondary stat.
    id: 'oc-extra-capacity-seismic',
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
    id: 'oc-extra-capacity-lmg',
    name: 'Extra Capacity',
    tier: 'balanced',
    weaponIds: ['turret'],
    effects: [
      { kind: 'stat', stat: 'turretCap', value: 1 },
      { kind: 'stat', stat: 'damage', value: 0.10 },
    ],
    description: '+1 Turret, +10% Damage',
  },
  {
    id: 'oc-extra-capacity-krakatoa',
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
    id: 'oc-extra-capacity-shock-fence',
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
    id: 'oc-fire-bolt',
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
    id: 'oc-fire-bullets',
    name: 'Fire Bullets',
    tier: 'balanced',
    weaponIds: ['leadburster'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.fire] },
    ],
    description: 'Change damage type to [FIRE]',
  },
  {
    // +100% Damage, +3 absolute units of range (integer-additive — flagged as custom).
    id: 'oc-focused-lens',
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
    id: 'oc-frostburn',
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
    id: 'oc-fusion-turbines',
    name: 'Fusion Turbines',
    tier: 'balanced',
    weaponIds: ['leadburster'],
    effects: [
      { kind: 'stat', stat: 'lifetime', value: 0.20 },
    ],
    description: '+20% Lifetime (grenade lifespan)',
  },
  {
    id: 'oc-gas-rerouting',
    name: 'Gas Rerouting',
    tier: 'balanced',
    weaponIds: [
      'zhukov', 'm1000', 'drak', 'minigun', 'brt7', 'thunderhead',
      'warthog', 'lok1', 'pgl', 'subata', 'stubby', 'boltshark',
    ],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
    ],
    description: '+25% Fire Rate, +25% Reload Speed',
  },
  {
    id: 'oc-high-caliber',
    name: 'High Caliber Rounds',
    tier: 'balanced',
    weaponIds: ['gk2', 'minigun', 'bulldog', 'brt7', 'thunderhead', 'lok1'],
    effects: [
      { kind: 'stat', stat: 'piercing', value: 1.00 },
      { kind: 'stat', stat: 'damage', value: 0.30 },
      { kind: 'stat', stat: 'fireRate', value: -0.30 },
    ],
    description: '+100% Piercing, +30% Damage, -30% Fire Rate',
  },
  {
    id: 'oc-high-velocity',
    name: 'High Velocity Bullets',
    tier: 'balanced',
    weaponIds: ['boomstick', 'warthog'],
    effects: [
      { kind: 'stat', stat: 'range', value: 0.50 },
      { kind: 'stat', stat: 'damage', value: 0.10 },
    ],
    description: '+50% Range, +10% Damage',
  },
  {
    id: 'oc-hot-plasma',
    name: 'Hot Plasma',
    tier: 'balanced',
    weaponIds: ['drak', 'shard-diffractor', 'breach-cutter', 'epc'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'tagChange', add: [WeaponTag.fire] },
    ],
    description: '+15% Damage; superheated plasma burns enemies [FIRE]',
  },
  {
    id: 'oc-impact-punch',
    name: 'Impact Punch',
    tier: 'balanced',
    weaponIds: ['sludge-pump', 'cryo-cannon'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.60 },
    ],
    description: '+60% Damage',
  },
  {
    // Rockets ignite ground; adds fire+groundzone tags.
    id: 'oc-incendiary-payload',
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
    id: 'oc-ionized-plasma',
    name: 'Ionized Plasma',
    tier: 'balanced',
    weaponIds: ['breach-cutter', 'shard-diffractor', 'plasma-burster'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'stat', stat: 'potency', value: 1.10 },
      { kind: 'tagChange', add: [WeaponTag.electric] },
    ],
    description: '+15% Damage, +110% Potency; ionized plasma electrocutes enemies [ELECTRIC]',
  },
  {
    id: 'oc-kinda-looks-like-a-magnet',
    name: 'Kinda Looks Like a Magnet',
    tier: 'balanced',
    weaponIds: ['stun-sweeper'],
    effects: [
      { kind: 'custom', description: 'The Stun Sweeper picks up XP and Materials (pickup radius: 3.0)' },
    ],
    description: 'Picks up XP and materials in a 3.0-unit radius',
  },
  {
    id: 'oc-knuckle-grip',
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
    id: 'oc-lightweight-alloy',
    name: 'Lightweight Alloy',
    tier: 'balanced',
    weaponIds: ['impact-axe'],
    effects: [
      { kind: 'stat', stat: 'range', value: 0.50 },
    ],
    description: '+50% Range',
  },
  {
    // Voltaic Stun Sweeper variant: range + reload speed bundle.
    id: 'oc-lightweight-alloy-stun-sweeper',
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
    id: 'oc-magnetic-alloy',
    name: 'Magnetic Alloy',
    tier: 'balanced',
    weaponIds: ['shock-fence'],
    effects: [
      { kind: 'custom', description: 'Fence posts pick up nearby XP and materials (3.0-unit pickup radius)' },
    ],
    description: 'Fence posts collect nearby XP and materials',
  },
  {
    id: 'oc-mining-directive',
    name: 'Mining Directive',
    tier: 'balanced',
    weaponIds: ['turret', 'krakatoa'],
    effects: [
      { kind: 'custom', description: 'Turrets mine nearby walls' },
    ],
    description: 'Turrets mine nearby walls',
  },
  {
    id: 'oc-more-beams',
    name: 'More Beams',
    tier: 'balanced',
    weaponIds: [
      'thor', 'coil-gun', 'breach-cutter', 'shard-diffractor',
      'sludge-pump', 'flamethrower', 'krakatoa', 'cryo-cannon',
    ],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 1 },
    ],
    description: '+1 Beam',
  },
  {
    id: 'oc-more-drones',
    name: 'More Drones',
    tier: 'balanced',
    weaponIds: ['cryo-guard', 'firefly', 'thunderbird', 'viper', 'shredder-grenade'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 1 },
    ],
    description: '+1 Drone',
  },
  {
    id: 'oc-nano-waves',
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
    id: 'oc-overheat',
    name: 'Overheat',
    tier: 'balanced',
    weaponIds: ['flamethrower', 'shard-diffractor'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 1.00 },
      { kind: 'stat', stat: 'lifetime', value: -0.35 },
    ],
    description: '+100% Damage, -35% Lifetime',
  },
  {
    id: 'oc-pan-fried',
    name: 'Pan Fried Shells',
    tier: 'balanced',
    weaponIds: ['m1000', 'minigun', 'bulldog', 'brt7', 'subata'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.fire] },
    ],
    description: 'Change damage type to [FIRE]',
  },
  {
    id: 'oc-personal-space-invaders',
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
    id: 'oc-piercing-projectiles',
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
    id: 'oc-plasma-coating',
    name: 'Plasma Coating',
    tier: 'balanced',
    weaponIds: ['turret'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.plasma] },
    ],
    description: 'Change damage type to [PLASMA]',
  },
  {
    // Warthog variant trades a fire-rate penalty for the same type change.
    id: 'oc-plasma-coating-warthog',
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
    id: 'oc-potent-juice',
    name: 'Potent Juice',
    tier: 'balanced',
    weaponIds: [
      'incendiary-grenade', 'stun-sweeper', 'thunderbird', 'stubby',
      'neurotoxin-grenade', 'viper',
    ],
    effects: [
      { kind: 'stat', stat: 'potency', value: 0.30 },
    ],
    description: '+30% Potency',
  },
  {
    id: 'oc-refrigerated',
    name: 'Refrigerated Gunpowder',
    tier: 'balanced',
    weaponIds: ['gk2', 'zhukov', 'boomstick'],
    effects: [
      { kind: 'tagChange', remove: [WeaponTag.kinetic], add: [WeaponTag.cold] },
    ],
    description: 'Change damage type to [COLD]',
  },
  {
    // Armor while reloading is a conditional mechanic — captured as custom.
    id: 'oc-reload-shield',
    name: 'Reload Shield',
    tier: 'balanced',
    weaponIds: ['minigun', 'bulldog'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: -0.25 },
      { kind: 'stat', stat: 'fireRate', value: 0.25 },
      { kind: 'custom', description: '+100% Armor while reloading' },
    ],
    description: '-25% Reload Speed, +25% Fire Rate; +100% Armor while reloading',
  },
  {
    id: 'oc-rubber-tip',
    name: 'Rubber Tip',
    tier: 'balanced',
    weaponIds: ['m1000', 'thunderhead', 'boltshark'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.15 },
      { kind: 'custom', description: 'Adds knockback to shots' },
    ],
    description: '+15% Damage, adds Knockback',
  },
  {
    id: 'oc-runic-warhead',
    name: 'Runic Warhead',
    tier: 'balanced',
    weaponIds: ['hurricane'],
    effects: [
      { kind: 'stat', stat: 'explosionRadius', value: 0.50 },
    ],
    description: '+50% Explosion Radius',
  },
  {
    id: 'oc-sidearm',
    name: 'Sidearm',
    tier: 'balanced',
    weaponIds: ['thor', 'brt7', 'subata', 'stubby'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.20 },
      { kind: 'crossWeapon', effects: [{ kind: 'stat', stat: 'damage', value: 0.25 }] },
      { kind: 'tagChange', add: [WeaponTag.sidearm] },
    ],
    description: '-20% Damage; all other weapons +25% Damage; adds [SIDEARM] tag',
  },
  {
    id: 'oc-spare-rockets',
    name: 'Spare Rockets',
    tier: 'balanced',
    weaponIds: ['hurricane'],
    effects: [
      { kind: 'custom', description: 'Adds 3 additional rockets to clip size' },
    ],
    description: '+3 Rockets to clip',
  },
  {
    id: 'oc-tank-tracks',
    name: 'Tank Tracks',
    tier: 'balanced',
    weaponIds: ['turret', 'krakatoa', 'seismic-repulsor'],
    effects: [
      { kind: 'custom', description: 'Turrets follow the player at 43% of player move speed' },
    ],
    description: 'Turrets follow the player at 43% move speed',
  },
  {
    // Adds secondary kinetic explosion on top of existing damage type.
    id: 'oc-tape-some-nails',
    name: 'Tape Some Nails to It',
    tier: 'balanced',
    weaponIds: ['incendiary-grenade', 'plasma-burster', 'neurotoxin-grenade'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.10 },
      { kind: 'tagChange', add: [WeaponTag.kinetic] },
    ],
    description: '+10% Damage; adds an additional [KINETIC] explosion',
  },
  {
    // Adds a cryo explosion on detonation.
    id: 'oc-tape-some-ice',
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
    id: 'oc-true-tnt',
    name: 'True TNT',
    tier: 'balanced',
    weaponIds: ['cryo-grenade'],
    effects: [
      { kind: 'custom', description: 'Grenade explosions now deal damage to terrain' },
    ],
    description: 'Explosions now deal damage to terrain',
  },
  {
    id: 'oc-vortex-core',
    name: 'Vortex Core',
    tier: 'balanced',
    weaponIds: ['epc'],
    effects: [
      { kind: 'custom', description: 'EPC projectiles pull enemies toward them within a radius' },
    ],
    description: 'Projectiles pull nearby enemies inward',
  },

  // ======================================================================
  // UNSTABLE
  // ======================================================================

  {
    // Warthog variant: pure firing-pattern change, no stat deltas.
    id: 'oc-akimbo',
    name: 'Akimbo',
    tier: 'unstable',
    weaponIds: ['warthog'],
    effects: [
      { kind: 'custom', description: 'Shoots an additional time in the opposite direction simultaneously' },
    ],
    description: 'Shoots in the opposite direction simultaneously',
  },
  {
    // Subata 120 variant: includes fire rate + potency bonus.
    id: 'oc-akimbo-subata',
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
    // PGL-only unstable variant: clip + fire rate instead of clip + reload penalty.
    id: 'oc-bigger-mags-pgl',
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
    id: 'oc-bolt-volley',
    name: 'Bolt Volley',
    tier: 'unstable',
    weaponIds: ['boltshark'],
    effects: [
      { kind: 'custom', description: 'Shoot all bolt types simultaneously in burst-fire mode instead of rotating' },
    ],
    description: 'Shoot all bolt types at once in burst-fire mode',
  },
  {
    id: 'oc-bullet-helix',
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
    // Wave Cooker: adds a beam firing in the opposite direction.
    id: 'oc-centralized-reflector',
    name: 'Centralized Reflector',
    tier: 'unstable',
    weaponIds: ['wave-cooker'],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 1 },
    ],
    description: '+1 Beam (fires in the opposite direction)',
  },
  {
    id: 'oc-colossal-twinblade',
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
    // Shoots beams between nearby friendly constructs.
    id: 'oc-conduit',
    name: 'Conduit',
    tier: 'unstable',
    weaponIds: ['thunderbird', 'shock-fence'],
    effects: [
      { kind: 'custom', description: 'Fires electrical beams to all nearby friendly constructs (50% damage, full potency)' },
    ],
    description: 'Fires electrical beams to nearby constructs',
  },
  {
    id: 'oc-crisis-protocol',
    name: 'Crisis Protocol',
    tier: 'unstable',
    weaponIds: ['cryo-guard', 'viper'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.25 },
      { kind: 'stat', stat: 'potency', value: 0.25 },
      { kind: 'custom', description: 'Drones rush to protect you when you take damage' },
    ],
    description: '+25% Damage, +25% Potency; drones rush to protect you when hit',
  },
  {
    id: 'oc-death-spiral',
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
    // Voltaic Stun Sweeper unstable variant: explode rather than return.
    id: 'oc-disposable-tech-stun-sweeper',
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
    id: 'oc-double-barrel',
    name: 'Double Barrel!',
    tier: 'unstable',
    weaponIds: ['bulldog', 'subata'],
    effects: [
      { kind: 'custom', description: 'Shoots two parallel bullets simultaneously' },
    ],
    description: 'Shoots two parallel bullets',
  },
  {
    // EPC projectile leaves fire groundzones along its trajectory.
    id: 'oc-drippin-balls',
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
    // Drones tether to grenade with electrical arc.
    id: 'oc-electrified-dispenser',
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
    id: 'oc-electrical-tether',
    name: 'Electrical Tether',
    tier: 'unstable',
    weaponIds: ['thunderbird'],
    effects: [
      { kind: 'custom', description: 'Drones are tethered to the player by an arc of electricity' },
    ],
    description: 'Drones tethered to player by electrical arc',
  },
  {
    // Friendly fire enables on Stubby for AOE bursts.
    id: 'oc-em-discharge',
    name: 'EM Discharge',
    tier: 'unstable',
    weaponIds: ['stubby'],
    effects: [
      { kind: 'custom', description: 'Enables shooting friendly constructs/dwarves for electrical area burst effects' },
    ],
    description: 'Shots can target friendly constructs for electrical burst effects',
  },
  {
    id: 'oc-even-more-beams',
    name: 'Even More Beams',
    tier: 'unstable',
    weaponIds: [
      'thor', 'coil-gun', 'breach-cutter', 'shard-diffractor',
      'sludge-pump', 'flamethrower', 'cryo-cannon',
    ],
    effects: [
      { kind: 'stat', stat: 'beamCount', value: 3 },
    ],
    description: '+3 Beams',
  },
  {
    id: 'oc-experimental-cluster',
    name: 'Experimental Cluster Projectiles',
    tier: 'unstable',
    weaponIds: ['breach-cutter', 'epc'],
    effects: [
      { kind: 'custom', description: 'Plasma balls split into smaller projectiles when they expire' },
    ],
    description: 'Plasma balls split into smaller projectiles on expiry',
  },
  {
    id: 'oc-extra-capacity-seismic-unstable',
    name: 'Extra Capacity',
    tier: 'unstable',
    weaponIds: ['seismic-repulsor'],
    effects: [
      { kind: 'stat', stat: 'turretCap', value: 3 },
    ],
    description: '+3 Turrets',
  },
  {
    id: 'oc-extra-capacity-lmg-unstable',
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
    id: 'oc-extra-capacity-krakatoa-unstable',
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
    id: 'oc-extra-capacity-shock-fence-unstable',
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
    // Hurricane-specific clip expansion (exact rocket count unspecified on wiki).
    id: 'oc-extra-rocket-drum',
    name: 'Extra Rocket Drum',
    tier: 'unstable',
    weaponIds: ['hurricane'],
    effects: [
      { kind: 'custom', description: 'Significantly increases rocket clip size (exact number not specified on wiki)' },
    ],
    description: 'Greatly increases rocket clip size',
  },
  {
    id: 'oc-fan-of-axes',
    name: 'Fan of Axes',
    tier: 'unstable',
    weaponIds: ['impact-axe'],
    effects: [
      { kind: 'stat', stat: 'damage', value: -0.50 },
      { kind: 'custom', description: 'Throws multiple smaller axes in a fan/arc pattern' },
    ],
    description: '-50% Damage; throws axes in a fan pattern',
  },
  {
    id: 'oc-feedback-harness',
    name: 'Feedback Harness',
    tier: 'unstable',
    weaponIds: ['incendiary-grenade', 'neurotoxin-grenade', 'he-grenade'],
    effects: [
      { kind: 'custom', description: 'Throws grenades when you take damage; 10 second cooldown' },
    ],
    description: 'Throws grenades on damage taken (10s cooldown)',
  },
  {
    // Drones leave fire trail groundzones.
    id: 'oc-fuel-leak',
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
    id: 'oc-gravitational-core',
    name: 'Gravitational Core',
    tier: 'unstable',
    weaponIds: ['cryo-grenade', 'incendiary-grenade'],
    effects: [
      { kind: 'stat', stat: 'explosionRadius', value: 0.25 },
      { kind: 'custom', description: 'Pulls in enemies before detonation' },
    ],
    description: '+25% Explosion Radius; pulls in enemies before detonation',
  },
  {
    id: 'oc-hallucinogenic',
    name: 'Hallucinogenic',
    tier: 'unstable',
    weaponIds: ['he-grenade', 'neurotoxin-grenade'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.25 },
      { kind: 'stat', stat: 'explosionRadius', value: 0.25 },
      { kind: 'custom', description: 'Enemies flee in fear after the explosion' },
    ],
    description: '+25% Reload Speed, +25% Explosion Radius; enemies flee in fear',
  },
  {
    id: 'oc-krakatoa-protocol',
    name: 'Krakatoa Protocol',
    tier: 'unstable',
    weaponIds: ['krakatoa'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.explosive, WeaponTag.electric, WeaponTag.groundzone] },
      { kind: 'custom', description: 'Turrets explode on death (10 damage + knockback); create 2 groundzones (5s lifetime, 3.5-unit radius, 2 dmg/0.5s tick, 5 Burn + 5 Shock potency)' },
    ],
    description: 'Turrets explode on death with knockback, creating fire+electric groundzones',
  },
  {
    id: 'oc-lead-wrapped-ammo',
    name: 'Lead Wrapped Ammo',
    tier: 'unstable',
    weaponIds: ['gk2', 'minigun', 'lok1', 'leadburster'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 1.50 },
      { kind: 'stat', stat: 'fireRate', value: -0.20 },
      { kind: 'stat', stat: 'reloadSpeed', value: -0.20 },
    ],
    description: '+150% Damage, -20% Fire Rate, -20% Reload Speed',
  },
  {
    // Accuracy stat not in StatId — captured as custom.
    id: 'oc-lmg-overload',
    name: 'LMG Overload',
    tier: 'unstable',
    weaponIds: ['turret'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 1.00 },
      { kind: 'custom', description: '-15 Accuracy' },
    ],
    description: '+100% Fire Rate, -15 Accuracy',
  },
  {
    id: 'oc-mini-pellets',
    name: 'Mini Pellets',
    tier: 'unstable',
    weaponIds: ['boomstick', 'warthog'],
    effects: [
      { kind: 'custom', description: 'Shotgun shells contain twice as many pellets with reduced individual damage' },
    ],
    description: 'Twice as many pellets with reduced individual damage',
  },
  {
    // Clip size +30 is integer-additive — flagged as custom.
    // Accuracy stat not in StatId — captured as custom.
    id: 'oc-mk11',
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
    id: 'oc-more-bounce',
    name: 'More Bounce!',
    tier: 'unstable',
    weaponIds: ['plasma-burster'],
    effects: [
      { kind: 'custom', description: 'Plasma ball bounces more times before detonating' },
    ],
    description: 'Plasma ball bounces more times before detonating',
  },
  {
    id: 'oc-more-drones-unstable',
    name: 'More Drones',
    tier: 'unstable',
    weaponIds: ['cryo-guard', 'firefly', 'thunderbird', 'viper', 'shredder-grenade'],
    effects: [
      { kind: 'stat', stat: 'droneCount', value: 3 },
    ],
    description: '+3 Drones',
  },
  {
    id: 'oc-omni-barrel',
    name: 'Omni Barrel',
    tier: 'unstable',
    weaponIds: ['zhukov', 'brt7'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 1.00 },
      { kind: 'stat', stat: 'damage', value: 0.50 },
      { kind: 'stat', stat: 'piercing', value: 0.50 },
      { kind: 'custom', description: 'Fires in 8 directions instead of 4' },
    ],
    description: '+100% Reload Speed, +50% Damage, +50% Piercing; fires in 8 directions',
  },
  {
    id: 'oc-one-handed',
    name: 'One-Handed',
    tier: 'unstable',
    weaponIds: ['stun-sweeper'],
    effects: [
      { kind: 'custom', description: 'Throws an additional Stun Sweeper in the opposite direction simultaneously' },
    ],
    description: 'Throws an additional Stun Sweeper in the opposite direction',
  },
  {
    id: 'oc-overcharged-fuelcells',
    name: 'Overcharged Fuelcells',
    tier: 'unstable',
    weaponIds: ['shard-diffractor'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 1.75 },
      { kind: 'stat', stat: 'lifetime', value: -0.40 },
    ],
    description: '+175% Damage, -40% Lifetime',
  },
  {
    id: 'oc-payload',
    name: 'Payload',
    tier: 'unstable',
    weaponIds: ['boltshark'],
    effects: [
      { kind: 'custom', description: 'Arrows leave an electrical field dealing damage in an area when hitting large enemies or terrain' },
    ],
    description: 'Arrows leave electrical area-damage fields on large enemy/terrain hits',
  },
  {
    // Voltaic Shock Fence: place all fences at once.
    id: 'oc-rapid-deployment',
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
  {
    id: 'oc-sawn-off',
    name: 'Sawn-Off',
    tier: 'unstable',
    weaponIds: ['drak', 'm1000'],
    effects: [
      { kind: 'stat', stat: 'range', value: -0.50 },
      { kind: 'custom', description: '-10 Accuracy; more projectiles but shorter range' },
    ],
    description: '-50% Range, -10 Accuracy; more projectiles but shorter range',
  },
  {
    // Coil Gun variant: lifetime + range + damage.
    id: 'oc-spliced-emitter-coil-gun',
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
  {
    // Beam-weapon variant: range + damage + potency (no lifetime, has potency instead).
    id: 'oc-spliced-emitter-beam',
    name: 'Spliced Emitter',
    tier: 'unstable',
    weaponIds: ['flamethrower', 'cryo-cannon'],
    effects: [
      { kind: 'stat', stat: 'range', value: 0.75 },
      { kind: 'stat', stat: 'damage', value: 0.75 },
      { kind: 'stat', stat: 'potency', value: 0.75 },
    ],
    description: '+75% Range, +75% Damage, +75% Potency',
  },
  {
    // Adds burning groundzones to flamethrower beams.
    id: 'oc-sticky-fuel',
    name: 'Sticky Fuel',
    tier: 'unstable',
    weaponIds: ['flamethrower'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.groundzone] },
      { kind: 'custom', description: 'Creates burning groundzones (4 damage, 8 Burn potency, 1-unit radius, 3s lifetime)' },
    ],
    description: 'Beams create burning groundzones; adds [GROUNDZONE] tag',
  },
  {
    id: 'oc-storm-emag',
    name: 'Storm E-Mag',
    tier: 'unstable',
    weaponIds: ['stubby', 'thunderhead', 'drak', 'boltshark'],
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: 0.10 },
      { kind: 'stat', stat: 'fireRate', value: 0.10 },
      { kind: 'custom', description: 'The last bullet in the clip fires in all directions' },
    ],
    description: '+10% Reload Speed, +10% Fire Rate; last bullet fires in all directions',
  },
  {
    // Armor while reloading is a conditional mechanic — captured as custom.
    id: 'oc-super-reload-shield',
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
  {
    // "The Favourite" — Rocket System / Tactical Leadburster bundle:
    // identical numeric effects, so consolidated into one entry.
    // Hurricane was previously coded with the Grenade-Launcher bundle; wiki
    // places it in the Rocket variant, so it moves here.
    id: 'oc-the-favourite-fr',
    name: 'The Favourite',
    tier: 'unstable',
    weaponIds: ['gk2', 'minigun', 'lok1', 'hurricane', 'leadburster'],
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
  {
    // Cryo Grenade variant: potency-focused.
    id: 'oc-the-favourite-potency',
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
  {
    // Grenade Launcher / Plasma Burster variant: explosion-radius bundle.
    id: 'oc-the-favourite-explosion',
    name: 'The Favourite',
    tier: 'unstable',
    weaponIds: ['pgl', 'plasma-burster'],
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
  {
    // Drone/Turret variant: lifetime bundle.
    id: 'oc-the-favourite-lifetime',
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
  {
    // Wave Cooker: adds Slow alongside fire, +damage/potency.
    id: 'oc-thermal-oscillator',
    name: 'Thermal Oscillator',
    tier: 'unstable',
    weaponIds: ['wave-cooker'],
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.50 },
      { kind: 'stat', stat: 'potency', value: 0.40 },
      { kind: 'tagChange', add: [WeaponTag.cold] },
      { kind: 'custom', description: 'Also applies Slow status' },
    ],
    description: '+50% Damage, +40% Potency; also applies Slow [COLD] status',
  },
  {
    // Boomstick variant.
    id: 'oc-thick-boy-boomstick',
    name: 'Thick Boy',
    tier: 'unstable',
    weaponIds: ['boomstick'],
    effects: [
      { kind: 'stat', stat: 'piercing', value: 2.00 },
      { kind: 'stat', stat: 'range', value: 2.00 },
      { kind: 'custom', description: 'Combines all projectiles into one thick projectile; potency scales with clip size' },
    ],
    description: '+200% Piercing, +200% Range; combines all pellets into one projectile',
  },
  {
    // M1000 variant: pure firing-mode change; damage scales with clip size.
    id: 'oc-thick-boy-m1000',
    name: 'Thick Boy',
    tier: 'unstable',
    weaponIds: ['m1000'],
    effects: [
      { kind: 'custom', description: 'Combines clip into a single shot; damage = clip size × base damage; fire rate depends on reload speed' },
    ],
    description: 'Combines clip into one massive shot; damage scales with clip size',
  },
  {
    // Accuracy stat not in StatId — captured as custom.
    id: 'oc-tightest-springs',
    name: 'The Tightest of Springs',
    tier: 'unstable',
    weaponIds: ['thunderhead'],
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 1.25 },
      { kind: 'custom', description: '-15 Accuracy' },
    ],
    description: '+125% Fire Rate, -15 Accuracy',
  },
  {
    // Adds Burn and Shock to groundzones — exact potency values not on wiki.
    id: 'oc-top-shelf-sludge',
    name: 'Top-Shelf Sludge',
    tier: 'unstable',
    weaponIds: ['sludge-pump'],
    effects: [
      { kind: 'tagChange', add: [WeaponTag.fire, WeaponTag.electric] },
      { kind: 'custom', description: 'Groundzones also apply Burn and Shock status effects (exact potency not listed on wiki)' },
    ],
    description: 'Groundzones apply Burn and Shock status effects; adds [FIRE] and [ELECTRIC] tags',
  },
  {
    id: 'oc-ultimate-sidearm',
    name: 'Ultimate Sidearm',
    tier: 'unstable',
    weaponIds: ['thor'],
    effects: [
      { kind: 'crossWeapon', effects: [{ kind: 'stat', stat: 'damage', value: 0.60 }] },
    ],
    description: 'All other weapons +60% Damage',
  },
  {
    id: 'oc-unlimited-power',
    name: 'Unlimited Power',
    tier: 'unstable',
    weaponIds: ['thor'],
    effects: [
      { kind: 'custom', description: 'Beams split into multiple independent beams that each jump to different targets' },
    ],
    description: 'Beams split into multiple independently jumping beams',
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
