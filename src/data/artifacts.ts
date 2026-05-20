import type { Artifact } from './types'
import { WeaponTag } from './types'

/**
 * Artifacts — selected from the Supply Pod during a dive. One fixed effect
 * each, no levels/tiers. Rarity is rare or epic only.
 *
 * Effect modeling depth follows the same convention as overclocks / class mods:
 *   - Pure stat changes → `stat`
 *   - Tag-scoped stat changes (e.g. "+15% [FIRE] Damage") → `taggedStat`
 *   - Conditional / trigger / scaling mechanics → `custom` with verbatim text
 *
 * Items that say "+5% Max HP" or "+5% Armor" land in `custom` because the
 * underlying stat is currently modeled as additive-flat, not multiplicative —
 * a system-level itch tracked in [[project-data-layer-migration-state]].
 *
 * Unlock requirements are intentionally not captured.
 */

export const artifacts: Artifact[] = [
  {
    id: '5-leaf-clover',
    name: '5 Leaf Clover',
    rarity: 'epic',
    effects: [
      { kind: 'stat', stat: 'luck', value: 15 },
      { kind: 'custom', description: '+20 Luck for 5 seconds whenever you reroll anything' },
    ],
    description: '+15 Luck, increases your Luck by +20 whenever you reroll anything (for 5 seconds).',
  },
  {
    id: 'ammo-rig',
    name: 'Ammo Rig',
    rarity: 'epic',
    effects: [
      { kind: 'stat', stat: 'fireRate', value: 0.50 },
      { kind: 'stat', stat: 'moveSpeed', value: -0.15 },
    ],
    description: '+50% Fire Rate, -15% Move Speed.',
  },
  {
    id: 'ancient-knowledge',
    name: 'Ancient Knowledge',
    rarity: 'rare',
    effects: [
      { kind: 'custom', description: 'Gain 3 character levels on pickup' },
    ],
    description: 'Gain 3 Levels.',
  },
  {
    id: 'armor-grease',
    name: 'Armor Grease',
    rarity: 'rare',
    effects: [
      { kind: 'stat', stat: 'moveSpeed', value: 0.05 },
      { kind: 'custom', description: '+2% dodge while moving, 3s duration, stacks 5x' },
    ],
    description: '+5% Move Speed / Increase your dodge by +2% while moving. Lasts 3s, stacks 5x.',
  },
  {
    id: 'barley-bulb-juice',
    name: 'Barley Bulb Juice',
    rarity: 'rare',
    effects: [
      { kind: 'custom', description: '+5% Move Speed for 3s when standing still; stacks 5x' },
    ],
    description: 'Gain temporary movespeed buff when standing still: +5% Move Speed for 3 seconds. Stacks 5x.',
  },
  {
    id: 'blt-ration-pack',
    name: 'BLT Ration Pack',
    rarity: 'epic',
    effects: [
      { kind: 'stat', stat: 'health', value: 80 },
      { kind: 'stat', stat: 'lifeRegen', value: 2 },
    ],
    description: '+80 Max HP, +2 Life Regen.',
  },
  {
    id: 'brn-shield-belt',
    name: 'BRN Shield Belt',
    rarity: 'rare',
    effects: [
      { kind: 'taggedStat', stat: 'damage', value: 0.15, tags: [WeaponTag.fire] },
      { kind: 'custom', description: 'On taking damage: ring-of-fire explosion damaging and burning nearby enemies; 15s cooldown' },
    ],
    description: '+[FIRE] 15% Damage / Explode in ring of fire dealing damage, burning nearby enemies when damaged. 15s cooldown.',
  },
  {
    id: 'chemist-kit',
    name: 'Chemist Kit',
    rarity: 'rare',
    effects: [
      { kind: 'stat', stat: 'potency', value: 0.15 },
      { kind: 'stat', stat: 'statusDamage', value: 0.15 },
    ],
    description: '+15% Potency, +15% Status Effect Damage.',
  },
  {
    id: 'clipboard-of-grudges',
    name: 'Clipboard of Grudges',
    rarity: 'rare',
    effects: [
      { kind: 'stat', stat: 'xpGain', value: 0.10 },
      { kind: 'custom', description: 'Gain XP when you take damage' },
    ],
    description: '+10% XP Gain / Gain XP when you take damage.',
  },
  {
    id: 'company-issued-magnet',
    name: 'Company-issued Magnet',
    rarity: 'rare',
    effects: [
      { kind: 'stat', stat: 'xpGain', value: 0.10 },
      { kind: 'custom', description: 'Spawns magnet at end of stage collecting 50% of XP' },
    ],
    description: '+10% XP Gain / Spawns magnet at end of stage collecting 50% of XP.',
  },
  {
    id: 'divers-manual',
    name: "Diver's Manual",
    rarity: 'rare',
    effects: [
      { kind: 'stat', stat: 'damage', value: 0.10 },
      { kind: 'stat', stat: 'reloadSpeed', value: 0.10 },
      { kind: 'stat', stat: 'critChance', value: 0.05 },
      { kind: 'stat', stat: 'critDamage', value: 0.15 },
    ],
    description: '+10% Damage, +10% Reload Speed, +5% Critical Chance, +15% Critical Damage.',
  },
  {
    id: 'drg-coupon',
    name: 'DRG Coupon',
    rarity: 'rare',
    effects: [
      { kind: 'custom', description: '20% discount on all shop purchases' },
    ],
    description: 'Gives 20% discount to all shop purchases.',
  },
  {
    id: 'energy-bars',
    name: 'Energy Bars',
    rarity: 'epic',
    effects: [
      { kind: 'custom', description: '+1% Damage and -3 Max HP for every player level' },
    ],
    description: '+1% Damage, -3 Max HP for every player level.',
  },
  {
    id: 'frz-shield-belt',
    name: 'FRZ Shield Belt',
    rarity: 'rare',
    effects: [
      { kind: 'taggedStat', stat: 'damage', value: 0.15, tags: [WeaponTag.cold] },
      { kind: 'custom', description: 'On taking damage: knock back and slow nearby enemies; 15s cooldown' },
    ],
    description: '+[COLD] 15% Damage / Knock back and slow nearby enemies when damaged. 15s cooldown.',
  },
  {
    id: 'gold-scanner',
    name: 'Gold Scanner',
    rarity: 'rare',
    effects: [
      { kind: 'custom', description: 'Small chance to find Gold when mining any rock' },
    ],
    description: 'Small chance to find Gold when mining any rock.',
  },
  {
    id: 'gold-tipped-bullets',
    name: 'Gold-Tipped Bullets',
    rarity: 'rare',
    effects: [
      { kind: 'custom', description: '+1% Damage per 5 Gold held, max 250 stacks' },
    ],
    description: 'Increase damage by 1% for every 5 Gold held. Max 250 stacks.',
  },
  {
    id: 'huuli-bait',
    name: 'Huuli Bait',
    rarity: 'epic',
    effects: [
      { kind: 'custom', description: 'Lures Huuli Hoarders' },
    ],
    description: 'Lure out bunch of Huuli Hoarders - Gotta catch them all!',
  },
  {
    id: 'jet-boots',
    name: 'Jet Boots',
    rarity: 'epic',
    effects: [
      { kind: 'custom', description: 'Quick escape on taking damage; 20s cooldown' },
    ],
    description: 'Quick escape when taking damage. 20s cooldown.',
  },
  {
    id: 'multi-tool',
    name: 'Multi Tool',
    rarity: 'epic',
    effects: [
      { kind: 'stat', stat: 'reloadSpeed', value: -0.25 },
      { kind: 'custom', description: '+5% Reload Speed for every unique weapon tag equipped' },
    ],
    description: '-25% Reload Speed, +5% Reload Speed for every unique [Tag] equipped.',
  },
  {
    id: 'nitra-scanner',
    name: 'Nitra Scanner',
    rarity: 'rare',
    effects: [
      { kind: 'custom', description: 'Small chance to find Nitra when mining any rock' },
    ],
    description: 'Small chance to find Nitra when mining any rock.',
  },
  {
    id: 'nitragenic-powder',
    name: 'Nitragenic Powder',
    rarity: 'rare',
    effects: [
      { kind: 'custom', description: '+0.5% Critical Chance per Nitra held, max 500 stacks' },
    ],
    description: '+0.5% Critical Chance for every Nitra held. Max 500 stacks.',
  },
  {
    id: 'pay2win-console',
    name: 'Pay2Win Console',
    rarity: 'epic',
    effects: [
      { kind: 'custom', description: '+2.5% Damage per reroll, stacks up to 100 rerolls' },
    ],
    description: 'Increases damage (+2.5%) whenever you reroll. Stacks up to 100 rerolls.',
  },
  {
    id: 'pick-axtender',
    name: 'Pick Axtender',
    rarity: 'epic',
    effects: [
      { kind: 'stat', stat: 'miningSpeed', value: -0.10 },
      { kind: 'custom', description: 'Increased mining reach' },
    ],
    description: '-10% Mining Speed / Increases reach when mining.',
  },
  {
    id: 'pickled-nitra',
    name: 'Pickled Nitra',
    rarity: 'epic',
    effects: [
      { kind: 'custom', description: '+2% Damage and -0.5% Move Speed per Nitra held' },
    ],
    description: 'Increases damage (+2%) and decreases move speed (-0.5%) for every Nitra held.',
  },
  {
    id: 'piercing-projectiles',
    name: 'Piercing Projectiles',
    rarity: 'rare',
    effects: [
      { kind: 'stat', stat: 'piercing', value: 0.50 },
    ],
    description: '+50% Piercing.',
  },
  {
    id: 'popup-tripod',
    name: 'Popup Tripod',
    rarity: 'rare',
    effects: [
      { kind: 'custom', description: '+2% Fire Rate and +2% Reload Speed while standing still; 3s duration, stacks 15x' },
    ],
    description: 'Increase fire rate (+2%) and reload speed (+2%) while standing still. 3s duration, stacks 15x.',
  },
  {
    id: 'red-sugar-cube',
    name: 'Red Sugar Cube',
    rarity: 'rare',
    effects: [
      { kind: 'custom', description: '+3 Max HP per Red Sugar collected' },
    ],
    description: 'Collecting Red Sugar increases Max HP by 3.',
  },
  {
    id: 'reflex-calibrator',
    name: 'Reflex Calibrator',
    rarity: 'rare',
    effects: [
      { kind: 'stat', stat: 'armor', value: 5 },
      { kind: 'custom', description: '+5% dodge for 10s on taking damage, stacks 5x' },
    ],
    description: '+5% Armor / Increase dodge (+5%) when taking damage for 10s. Stacks 5x.',
  },
  {
    id: 'salty-pretzel',
    name: 'Salty Pretzel',
    rarity: 'epic',
    effects: [
      { kind: 'custom', description: '+1 Armor per 2% missing HP' },
    ],
    description: '+1 Armor for every 2% of missing HP.',
  },
  {
    id: 'squint-ee5',
    name: 'Squint-EE5',
    rarity: 'epic',
    effects: [
      { kind: 'stat', stat: 'critChance', value: 0.30 },
      { kind: 'stat', stat: 'critDamage', value: 1.00 },
      { kind: 'stat', stat: 'damage', value: -0.30 },
    ],
    description: '+30% Critical Chance, +100% Critical Damage, -30% Damage.',
  },
  {
    id: 'tactical-cookie',
    name: 'Tactical Cookie',
    rarity: 'rare',
    effects: [
      { kind: 'custom', description: '+5% Max HP; heals 50% of Max HP when entering Drop Pod' },
    ],
    description: '+5% Max HP / Heals 50% of Max HP when entering Drop Pod.',
  },
  {
    id: 'the-mocap',
    name: 'The MoCap',
    rarity: 'epic',
    effects: [
      { kind: 'custom', description: '+1% Damage per % missing HP' },
    ],
    description: 'Increases damage (+1%) for every (%) of missing HP.',
  },
  {
    id: 'turbo-encabulator',
    name: 'Turbo Encabulator',
    rarity: 'epic',
    effects: [
      { kind: 'custom', description: '+3% Damage, +3% Reload Speed, -5% Mining Speed per equipped Overclock' },
    ],
    description: '+3% Damage, +3% Reload Speed, -5% Mining Speed per equipped Overclock.',
  },
  {
    id: 'vita-miner-pills',
    name: 'Vita-miner Pills',
    rarity: 'rare',
    effects: [
      { kind: 'custom', description: '+5% Max HP; increases healing granted on level up' },
    ],
    description: '+5% Max HP / Increases healing granted on level up.',
  },
  {
    id: 'weapon-box',
    name: 'Weapon Box',
    rarity: 'epic',
    effects: [
      { kind: 'custom', description: 'Equip additional random level-6 weapon with random overclock' },
    ],
    description: 'Equip additional random level 6 weapon with random overclock.',
  },
  {
    id: 'xp-scanner',
    name: 'XP Scanner',
    rarity: 'rare',
    effects: [
      { kind: 'custom', description: 'Small chance to find XP when mining any rock' },
    ],
    description: 'Small chance to find XP when mining any rock.',
  },
]
