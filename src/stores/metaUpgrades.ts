import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { metaUpgrades } from '@/data/metaUpgrades'

export interface MetaUpgradeLevel {
  id: string
  level: number
}

const STORAGE_KEY = 'dwarf-math-meta-upgrades'

function loadFromStorage(): Record<string, number> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load meta upgrades from localStorage:', e)
  }
  return {}
}

function saveToStorage(levels: Record<string, number>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(levels))
  } catch (e) {
    console.error('Failed to save meta upgrades to localStorage:', e)
  }
}

export const useMetaUpgradesStore = defineStore('metaUpgrades', () => {
  const levels = ref<Record<string, number>>(loadFromStorage())

  // Ensure all meta upgrades have a level (default to 0)
  metaUpgrades.forEach(upgrade => {
    if (!(upgrade.id in levels.value)) {
      levels.value[upgrade.id] = 0
    }
  })

  const upgradeLevels = computed(() => {
    return metaUpgrades.map(upgrade => ({
      ...upgrade,
      currentLevel: levels.value[upgrade.id] || 0
    }))
  })

  function setLevel(id: string, level: number) {
    const upgrade = metaUpgrades.find(u => u.id === id)
    if (!upgrade) return

    // Clamp level between 0 and maxLevel
    const clampedLevel = Math.max(0, Math.min(level, upgrade.maxLevel))
    levels.value = { ...levels.value, [id]: clampedLevel }
    saveToStorage(levels.value)
  }

  function incrementLevel(id: string) {
    const upgrade = metaUpgrades.find(u => u.id === id)
    if (!upgrade) return

    const currentLevel = levels.value[id] || 0
    if (currentLevel < upgrade.maxLevel) {
      setLevel(id, currentLevel + 1)
    }
  }

  function decrementLevel(id: string) {
    const currentLevel = levels.value[id] || 0
    if (currentLevel > 0) {
      setLevel(id, currentLevel - 1)
    }
  }

  function resetAll() {
    const resetLevels: Record<string, number> = {}
    metaUpgrades.forEach(upgrade => {
      resetLevels[upgrade.id] = 0
    })
    levels.value = resetLevels
    saveToStorage(levels.value)
  }

  return {
    levels,
    upgradeLevels,
    setLevel,
    incrementLevel,
    decrementLevel,
    resetAll
  }
})
