import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { statDefinitions, orderedStatIds, bucketingFunctions, type StatId } from '@/data/statDefinitions'
import type { Weapon } from '@/data/types'
import { usePlayerStatsStore, type StatValues } from './playerStats'
import { useSelectedUpgradesStore } from './selectedUpgrades'
import { useGlobalUpgradesStore } from './globalUpgrades'

/**
 * Weapon Slot Stats Store - New stat system
 *
 * This store manages the stats for each weapon slot (0-3), calculated from:
 * - Base weapon stats
 * - Player stats (from playerStats store)
 * - Mid-dive upgrades for this weapon
 *
 * Recalculates when:
 * - Player stats change
 * - An upgrade is selected for this weapon
 * - A new weapon is equipped in the slot
 */

export type WeaponSlotStats = Record<StatId, number>

export const useWeaponSlotStatsStore = defineStore('weaponSlotStats', () => {
  // Stats for each weapon slot [0-3]
  const slotStats = ref<(WeaponSlotStats | null)[]>([null, null, null, null])

  // Currently equipped weapons
  const equippedWeapons = ref<(Weapon | null)[]>([null, null, null, null])

  // Create empty stats object (all zeros)
  function createEmptyStats(): WeaponSlotStats {
    const emptyStats: Partial<WeaponSlotStats> = {}
    for (const statId of orderedStatIds) {
      emptyStats[statId] = 0
    }
    return emptyStats as WeaponSlotStats
  }

  // Get base stats from a weapon
  function getWeaponBaseStats(weapon: Weapon): Partial<StatValues> {
    return {
      damage: weapon.baseDmg,
      fireRate: weapon.fireRate,
      reloadSpeed: 1 / weapon.reloadTime, // Convert reload time to reload speed
      // Other weapon stats would go here
    } as Partial<StatValues>
  }

  // Calculate stats for a weapon slot
  function calculateWeaponStats(
    slotIndex: number,
    weapon: Weapon,
    playerStats: StatValues
  ): WeaponSlotStats {
    const result = createEmptyStats()
    const selectedUpgradesStore = useSelectedUpgradesStore()
    const globalUpgradesStore = useGlobalUpgradesStore()

    // Get base weapon stats
    const weaponBaseStats = getWeaponBaseStats(weapon)

    // For each stat, collect all sources and use bucketing function to combine them
    for (const statId of orderedStatIds) {
      const statDef = statDefinitions[statId]
      const values: number[] = []

      // Base weapon stat
      const baseValue = weaponBaseStats[statId] ?? 0
      if (baseValue !== 0) {
        values.push(baseValue)
      }

      // Player stats (from meta upgrades, class mods, gear)
      const playerStatValue = playerStats[statId]
      if (playerStatValue !== 0) {
        values.push(playerStatValue)
      }

      // Mid-dive upgrades for this weapon
      // TODO: Add logic to collect mid-dive upgrades for this slot
      // This will need to aggregate upgrades from:
      // - selectedUpgradesStore.selectedUpgrades[weapon.id]
      // - globalUpgradesStore.upgrades (tag upgrades that apply to this weapon)

      // Use the stat's bucketing function to combine all values
      const bucketingFn = bucketingFunctions[statDef.bucketingFunction]
      result[statId] = bucketingFn(values)
    }

    return result
  }

  // Equip a weapon in a slot
  function equipWeapon(slotIndex: number, weapon: Weapon | null) {
    equippedWeapons.value[slotIndex] = weapon

    if (weapon) {
      const playerStatsStore = usePlayerStatsStore()
      slotStats.value[slotIndex] = calculateWeaponStats(slotIndex, weapon, playerStatsStore.stats)
    } else {
      slotStats.value[slotIndex] = null
    }
  }

  // Recalculate stats for a specific slot
  function recalculateSlot(slotIndex: number) {
    const weapon = equippedWeapons.value[slotIndex]
    if (weapon) {
      const playerStatsStore = usePlayerStatsStore()
      slotStats.value[slotIndex] = calculateWeaponStats(slotIndex, weapon, playerStatsStore.stats)
    }
  }

  // Recalculate all slots
  function recalculateAll() {
    for (let i = 0; i < 4; i++) {
      recalculateSlot(i)
    }
  }

  // Watch for player stats changes and recalculate
  const playerStatsStore = usePlayerStatsStore()
  watch(
    () => playerStatsStore.stats,
    () => {
      recalculateAll()
    },
    { deep: true }
  )

  // Watch for upgrade changes and recalculate
  const selectedUpgradesStore = useSelectedUpgradesStore()
  const globalUpgradesStore = useGlobalUpgradesStore()

  watch(
    () => selectedUpgradesStore.selectedUpgrades,
    () => {
      recalculateAll()
    },
    { deep: true }
  )

  watch(
    () => globalUpgradesStore.upgrades,
    () => {
      recalculateAll()
    },
    { deep: true }
  )

  // Get stats for a specific slot
  function getSlotStats(slotIndex: number): WeaponSlotStats | null {
    return slotStats.value[slotIndex]
  }

  // Reset all slots
  function reset() {
    slotStats.value = [null, null, null, null]
    equippedWeapons.value = [null, null, null, null]
  }

  return {
    slotStats,
    equipWeapon,
    recalculateSlot,
    recalculateAll,
    getSlotStats,
    reset
  }
})
