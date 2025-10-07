import type { MetaUpgrade } from './types'

export const metaUpgrades: MetaUpgrade[] = [
  {
    id: 'heavy-bullets',
    name: 'Heavy Bullets',
    stat: 'damage',
    maxLevel: 12,
    bonusPerLevel: 0.04,
    bonusType: 'percentage'
  },
  {
    id: 'trigger-training',
    name: 'Trigger Training',
    stat: 'fireRate',
    maxLevel: 12,
    bonusPerLevel: 0.02,
    bonusType: 'percentage',
    description: 'Fire Rate'
  },
  {
    id: 'reload-speed',
    name: 'Reload Speed',
    stat: 'reloadSpeed',
    maxLevel: 12,
    bonusPerLevel: 0.02,
    bonusType: 'percentage'
  },
  {
    id: 'better-boots',
    name: 'Better Boots',
    stat: 'moveSpeed',
    maxLevel: 16,
    bonusPerLevel: 0.01,
    bonusType: 'percentage'
  },
  {
    id: 'catalyst-booster',
    name: 'Catalyst Booster',
    stat: 'statusDamage',
    maxLevel: 16,
    bonusPerLevel: 0.01,
    bonusType: 'percentage',
    description: 'Status Effect Damage'
  },
  {
    id: 'mining-101',
    name: 'Mining 101',
    stat: 'miningSpeed',
    maxLevel: 16,
    bonusPerLevel: 0.01,
    bonusType: 'percentage'
  },
  {
    id: 'upgraded-armor',
    name: 'Upgraded Armor',
    stat: 'armor',
    maxLevel: 24,
    bonusPerLevel: 0,
    bonusType: 'flat',
    description: 'Damage reduction (exact values unknown)'
  },
  {
    id: 'me-lucky-charms',
    name: 'Me Lucky Charms',
    stat: 'luck',
    maxLevel: 24,
    bonusPerLevel: 0,
    bonusType: 'percentage',
    description: 'Higher rarity upgrade chance (exact values unknown)'
  },
  {
    id: 'more-juice',
    name: 'More Juice',
    stat: 'potency',
    maxLevel: 16,
    bonusPerLevel: 0.01,
    bonusType: 'percentage'
  },
  {
    id: 'fast-learner',
    name: 'Fast Learner',
    stat: 'xpGain',
    maxLevel: 24,
    bonusPerLevel: 0.01,
    bonusType: 'percentage',
    description: 'XP Gain'
  },
  {
    id: 'pocket-magnets',
    name: 'Pocket Magnets',
    stat: 'pickupRadius',
    maxLevel: 24,
    bonusPerLevel: 0.02,
    bonusType: 'percentage'
  },
  {
    id: 'nitra-cache',
    name: 'Nitra Cache',
    stat: 'startingNitra',
    maxLevel: 24,
    bonusPerLevel: 0,
    bonusType: 'flat',
    description: 'Starting Nitra (exact values unknown)'
  },
  {
    id: 'getting-fit',
    name: 'Getting Fit',
    stat: 'health',
    maxLevel: 12,
    bonusPerLevel: 10,
    bonusType: 'flat',
    description: 'Max HP'
  },
  {
    id: 'first-aid-kit',
    name: 'First Aid Kit',
    stat: 'lifeRegen',
    maxLevel: 12,
    bonusPerLevel: 0,
    bonusType: 'flat',
    description: 'Life Regeneration (exact values unknown)'
  },
  {
    id: 'gold-cache',
    name: 'Gold Cache',
    stat: 'startingGold',
    maxLevel: 24,
    bonusPerLevel: 0,
    bonusType: 'flat',
    description: 'Starting Gold (exact values unknown)'
  },
  {
    id: 'target-practice',
    name: 'Target Practice',
    stat: 'critChance',
    maxLevel: 12,
    bonusPerLevel: 0.01,
    bonusType: 'percentage',
    description: 'Critical Chance'
  },
  {
    id: 'mind-blowing',
    name: 'Mind Blowing',
    stat: 'critDamage',
    maxLevel: 12,
    bonusPerLevel: 0.04,
    bonusType: 'percentage',
    description: 'Critical Damage'
  },
  {
    id: 'artifact-rerolls',
    name: 'Artifact Rerolls',
    stat: 'artifactRerolls',
    maxLevel: 24,
    bonusPerLevel: 0,
    bonusType: 'flat',
    description: 'Allows rerolling artifacts from Supply Pod (exact values unknown)'
  }
]
