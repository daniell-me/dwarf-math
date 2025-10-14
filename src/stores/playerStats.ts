import { defineStore } from 'pinia'
import { ref } from 'vue'
import { statDefinitions, orderedStatIds, bucketingFunctions, type StatId } from '@/data/statDefinitions'
import type { CharacterStats, ClassMod } from '@/data/types'
import { classBaseStats } from '@/data/classes'
import { metaUpgrades } from '@/data/metaUpgrades'
import { useMetaUpgradesStore } from './metaUpgrades'

/**
 * Player Stats Store - New stat system
 *
 * This store manages the player's stats during a dive, calculated from:
 * - Class base stats
 * - Class mod bonuses
 * - Meta upgrades
 * - Gear bonuses
 *
 * Resets when:
 * - Meta upgrades are modified
 * - Gear is modified
 * - A new dive is started
 */

export type StatValues = Record<StatId, number>

export const usePlayerStatsStore = defineStore('playerStats', () => {
  // Current stat values (initialized to zero)
  const stats = ref<StatValues>(createEmptyStats())

  // Dependencies that trigger recalculation
  const currentClassMod = ref<ClassMod | null>(null)
  const flatGearBonuses = ref<Partial<CharacterStats>>({})
  const percentGearBonuses = ref<Partial<CharacterStats>>({})

  // Create empty stats object (all zeros)
  function createEmptyStats(): StatValues {
    const emptyStats: Partial<StatValues> = {}
    for (const statId of orderedStatIds) {
      emptyStats[statId] = 0
    }
    return emptyStats as StatValues
  }

  // Calculate player stats from all sources
  function calculateStats(
    classMod: ClassMod | null,
    flat: Partial<CharacterStats>,
    percent: Partial<CharacterStats>
  ): StatValues {
    if (!classMod) {
      return createEmptyStats()
    }

    const metaStore = useMetaUpgradesStore()
    const baseStats = classBaseStats[classMod.class]
    const result = createEmptyStats()

    // For each stat, collect all sources and use bucketing function to combine them
    for (const statId of orderedStatIds) {
      const statDef = statDefinitions[statId]
      const values: number[] = []

      // Base value from class
      const baseValue = (baseStats[statId as keyof CharacterStats] as number) ?? 0
      if (baseValue !== 0) {
        values.push(baseValue)
      }

      // Flat gear bonuses
      const flatBonus = (flat[statId as keyof CharacterStats] as number) ?? 0
      if (flatBonus !== 0) {
        values.push(flatBonus)
      }

      // Meta upgrades (both percentage and flat)
      for (const metaUpgrade of metaUpgrades) {
        if (metaUpgrade.stat === statId) {
          const level = metaStore.levels[metaUpgrade.id] ?? 0
          if (level > 0) {
            const bonus = metaUpgrade.bonusValues[level - 1] ?? 0
            if (bonus !== 0) {
              values.push(bonus)
            }
          }
        }
      }

      // Class mod bonuses
      if (classMod.statMultipliers?.[statId as keyof CharacterStats] !== undefined) {
        const classModValue = classMod.statMultipliers[statId as keyof CharacterStats]!
        if (classModValue !== 0) {
          values.push(classModValue)
        }
      }

      // Percent gear bonuses
      const percentBonus = (percent[statId as keyof CharacterStats] as number) ?? 0
      if (percentBonus !== 0) {
        values.push(percentBonus)
      }

      // Use the stat's bucketing function to combine all values
      const bucketingFn = bucketingFunctions[statDef.bucketingFunction]
      result[statId] = bucketingFn(values)
    }

    return result
  }

  // Initialize stats from class, meta upgrades, and gear
  function initialize(
    classMod: ClassMod | null,
    flat: Partial<CharacterStats> = {},
    percent: Partial<CharacterStats> = {}
  ) {
    currentClassMod.value = classMod
    flatGearBonuses.value = flat
    percentGearBonuses.value = percent
    recalculate()
  }

  // Recalculate stats from current sources
  function recalculate() {
    stats.value = calculateStats(
      currentClassMod.value,
      flatGearBonuses.value,
      percentGearBonuses.value
    )
  }

  // Reset when meta upgrades change
  function onMetaUpgradesChanged() {
    recalculate()
  }

  // Reset when gear changes
  function onGearChanged(flat: Partial<CharacterStats>, percent: Partial<CharacterStats>) {
    flatGearBonuses.value = flat
    percentGearBonuses.value = percent
    recalculate()
  }

  // Reset when starting a new dive
  function onNewDive() {
    currentClassMod.value = null
    flatGearBonuses.value = {}
    percentGearBonuses.value = {}
    stats.value = createEmptyStats()
  }

  // Get a specific stat value
  function getStat(statId: StatId): number {
    return stats.value[statId]
  }

  return {
    stats,
    initialize,
    recalculate,
    onMetaUpgradesChanged,
    onGearChanged,
    onNewDive,
    getStat
  }
})
