import type { MetaUpgrade } from './types'

export const metaUpgrades: MetaUpgrade[] = [
  {
    id: 'heavy-bullets',
    name: 'Heavy Bullets',
    stat: 'damage',
    maxLevel: 12,
    bonusValues: [0.04, 0.08, 0.12, 0.16, 0.20, 0.24, 0.28, 0.32, 0.36, 0.40, 0.44, 0.48],
    bonusType: 'percentage'
  },
  {
    id: 'trigger-training',
    name: 'Trigger Training',
    stat: 'fireRate',
    maxLevel: 12,
    bonusValues: [0.02, 0.04, 0.06, 0.08, 0.10, 0.12, 0.14, 0.16, 0.18, 0.20, 0.22, 0.24],
    bonusType: 'percentage',
    description: 'Fire Rate'
  },
  {
    id: 'reload-speed',
    name: 'Reload Speed',
    stat: 'reloadSpeed',
    maxLevel: 12,
    bonusValues: [0.02, 0.04, 0.06, 0.08, 0.10, 0.12, 0.14, 0.16, 0.18, 0.20, 0.22, 0.24],
    bonusType: 'percentage'
  },
  {
    id: 'better-boots',
    name: 'Better Boots',
    stat: 'moveSpeed',
    maxLevel: 12,
    bonusValues: [0.02, 0.04, 0.06, 0.08, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16],
    bonusType: 'percentage'
  },
  {
    id: 'catalyst-booster',
    name: 'Catalyst Booster',
    stat: 'statusDamage',
    maxLevel: 12,
    bonusValues: [0.02, 0.04, 0.06, 0.08, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16],
    bonusType: 'percentage',
    description: 'Status Effect Damage'
  },
  {
    id: 'mining-101',
    name: 'Mining 101',
    stat: 'miningSpeed',
    maxLevel: 12,
    bonusValues: [0.02, 0.04, 0.06, 0.08, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16],
    bonusType: 'percentage'
  },
  {
    id: 'upgraded-armor',
    name: 'Upgraded Armor',
    stat: 'armor',
    maxLevel: 12,
    bonusValues: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
    bonusType: 'flat',
    description: 'Damage reduction'
  },
  {
    id: 'me-lucky-charms',
    name: 'Me Lucky Charms',
    stat: 'luck',
    maxLevel: 12,
    bonusValues: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
    bonusType: 'flat',
    description: 'Higher rarity upgrade chance'
  },
  {
    id: 'more-juice',
    name: 'More Juice',
    stat: 'potency',
    maxLevel: 12,
    bonusValues: [0.02, 0.04, 0.06, 0.08, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16],
    bonusType: 'percentage'
  },
  {
    id: 'fast-learner',
    name: 'Fast Learner',
    stat: 'xpGain',
    maxLevel: 12,
    bonusValues: [0.02, 0.04, 0.06, 0.08, 0.10, 0.12, 0.14, 0.16, 0.18, 0.20, 0.22, 0.24],
    bonusType: 'percentage',
    description: 'XP Gain'
  },
  {
    id: 'pocket-magnets',
    name: 'Pocket Magnets',
    stat: 'pickupRadius',
    maxLevel: 12,
    bonusValues: [0.04, 0.08, 0.12, 0.16, 0.20, 0.24, 0.28, 0.32, 0.36, 0.40, 0.44, 0.48],
    bonusType: 'percentage'
  },
  {
    id: 'nitra-cache',
    name: 'Nitra Cache',
    stat: 'startingNitra',
    maxLevel: 12,
    bonusValues: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
    bonusType: 'flat',
    description: 'Starting Nitra'
  },
  {
    id: 'getting-fit',
    name: 'Getting Fit',
    stat: 'health',
    maxLevel: 12,
    bonusValues: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
    bonusType: 'flat',
    description: 'Max HP'
  },
  {
    id: 'first-aid-kit',
    name: 'First Aid Kit',
    stat: 'lifeRegen',
    maxLevel: 12,
    bonusValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    bonusType: 'flat',
    description: 'Life Regeneration'
  },
  {
    id: 'gold-cache',
    name: 'Gold Cache',
    stat: 'startingGold',
    maxLevel: 12,
    bonusValues: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    bonusType: 'flat',
    description: 'Starting Gold'
  },
  {
    id: 'target-practice',
    name: 'Target Practice',
    stat: 'critChance',
    maxLevel: 12,
    bonusValues: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.12],
    bonusType: 'percentage',
    description: 'Critical Chance'
  },
  {
    id: 'mind-blowing',
    name: 'Mind Blowing',
    stat: 'critDamage',
    maxLevel: 12,
    bonusValues: [0.04, 0.08, 0.12, 0.16, 0.20, 0.24, 0.28, 0.32, 0.36, 0.40, 0.44, 0.48],
    bonusType: 'percentage',
    description: 'Critical Damage'
  },
  {
    id: 'artifact-rerolls',
    name: 'Artifact Rerolls',
    stat: 'artifactRerolls',
    maxLevel: 12,
    bonusValues: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    bonusType: 'flat',
    description: 'Allows rerolling artifacts from Supply Pod'
  }
]
