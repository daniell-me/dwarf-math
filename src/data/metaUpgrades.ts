import type { MetaUpgrade } from './types'

export const metaUpgrades: MetaUpgrade[] = [
  {
    id: 'heavy-bullets',
    name: 'Heavy Bullets',
    statId: 'damage',
    maxLevel: 12,
    bonusValues: [0.02, 0.04, 0.06, 0.08, 0.10, 0.12, 0.14, 0.16, 0.18, 0.20, 0.22, 0.24]
  },
  {
    id: 'reload-speed',
    name: 'Reload Speed',
    statId: 'reloadSpeed',
    maxLevel: 12,
    bonusValues: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.12]
  },
  {
    id: 'trigger-training',
    name: 'Trigger Training',
    statId: 'fireRate',
    maxLevel: 12,
    bonusValues: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.12],
    description: 'Fire Rate'
  },
  {
    id: 'upgraded-armor',
    name: 'Upgraded Armor',
    statId: 'armor',
    maxLevel: 24,
    bonusValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    description: 'Damage reduction'
  },
  {
    id: 'mining-101',
    name: 'Mining 101',
    statId: 'miningSpeed',
    maxLevel: 12,
    bonusValues: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.12]
  },
  {
    id: 'getting-fit',
    name: 'Getting Fit',
    statId: 'health',
    maxLevel: 24,
    bonusValues: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180],
    description: 'Max HP'
  },
  {
    id: 'fast-learner',
    name: 'Fast Learner',
    statId: 'xpGain',
    maxLevel: 12,
    bonusValues: [0.02, 0.04, 0.06, 0.08, 0.10, 0.12, 0.14, 0.16, 0.18, 0.20, 0.22, 0.24],
    description: 'XP Gain'
  },
  {
    id: 'pocket-magnets',
    name: 'Pocket Magnets',
    statId: 'pickupRadius',
    maxLevel: 24,
    bonusValues: [0.02, 0.04, 0.06, 0.08, 0.10, 0.12, 0.14, 0.16, 0.18, 0.20, 0.22, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.30, 0.31, 0.32, 0.33, 0.34, 0.35, 0.36]
  },
  {
    id: 'more-juice',
    name: 'More Juice',
    statId: 'potency',
    maxLevel: 12,
    bonusValues: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.12]
  },
  {
    id: 'target-practice',
    name: 'Target Practice',
    statId: 'critChance',
    maxLevel: 12,
    bonusValues: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.12],
    description: 'Critical Chance'
  },
  {
    id: 'mind-blowing',
    name: 'Mind Blowing',
    statId: 'critDamage',
    maxLevel: 12,
    bonusValues: [0.02, 0.04, 0.06, 0.08, 0.10, 0.12, 0.14, 0.16, 0.18, 0.20, 0.22, 0.24],
    description: 'Critical Damage'
  },
  {
    id: 'nitra-cache',
    name: 'Nitra Cache',
    statId: 'startingNitra',
    maxLevel: 24,
    bonusValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    description: 'Starting Nitra'
  },
  {
    id: 'catalyst-booster',
    name: 'Catalyst Booster',
    statId: 'statusDamage',
    maxLevel: 12,
    bonusValues: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.12],
    description: 'Status Effect Damage'
  },
  {
    id: 'first-aid-kit',
    name: 'First Aid Kit',
    statId: 'lifeRegen',
    maxLevel: 12,
    bonusValues: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    description: 'Life Regeneration'
  },
  {
    id: 'gold-cache',
    name: 'Gold Cache',
    statId: 'startingGold',
    maxLevel: 24,
    bonusValues: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48],
    description: 'Starting Gold'
  },
  {
    id: 'better-boots',
    name: 'Better Boots',
    statId: 'moveSpeed',
    maxLevel: 12,
    bonusValues: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.12]
  },
  {
    id: 'me-lucky-charms',
    name: 'Me Lucky Charms',
    statId: 'luck',
    maxLevel: 24,
    bonusValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18],
    description: 'Higher rarity upgrade chance'
  },
  {
    id: 'artifact-rerolls',
    name: 'Artifact Rerolls',
    statId: 'artifactRerolls',
    maxLevel: 12,
    bonusValues: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
    description: 'Allows rerolling artifacts from Supply Pod'
  }
]
