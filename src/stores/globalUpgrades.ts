import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { WeaponTag, Rarity } from '@/data/types'

const STORAGE_KEY = 'dwarf-math-global-upgrades'

function createUpgradeKey(name: string, tags: WeaponTag[], rarity: Rarity): string {
  const tagKey = tags && tags.length > 0 ? tags.join(',') : 'no-tags'
  return `${name}-${tagKey}-${rarity}`
}

function loadFromStorage(): Record<string, number> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load global upgrades from localStorage:', e)
  }
  return {}
}

function saveToStorage(upgrades: Record<string, number>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(upgrades))
  } catch (e) {
    console.error('Failed to save global upgrades to localStorage:', e)
  }
}

export const useGlobalUpgradesStore = defineStore('globalUpgrades', () => {
  const upgrades = ref<Record<string, number>>(loadFromStorage())

  function getUpgradeCount(name: string, tags: WeaponTag[], rarity: Rarity): number {
    const key = createUpgradeKey(name, tags, rarity)
    return upgrades.value[key] || 0
  }

  function addUpgrade(name: string, tags: WeaponTag[], rarity: Rarity, value: number) {
    const key = createUpgradeKey(name, tags, rarity)
    upgrades.value = {
      ...upgrades.value,
      [key]: (upgrades.value[key] || 0) + 1
    }
    saveToStorage(upgrades.value)
  }

  function removeOneUpgrade(name: string, tags: WeaponTag[], rarity: Rarity) {
    const key = createUpgradeKey(name, tags, rarity)
    const currentCount = upgrades.value[key] || 0

    if (currentCount > 0) {
      const newUpgrades = { ...upgrades.value }
      if (currentCount === 1) {
        delete newUpgrades[key]
      } else {
        newUpgrades[key] = currentCount - 1
      }
      upgrades.value = newUpgrades
      saveToStorage(upgrades.value)
    }
  }

  function resetAll() {
    upgrades.value = {}
    saveToStorage(upgrades.value)
  }

  return {
    upgrades,
    getUpgradeCount,
    addUpgrade,
    removeOneUpgrade,
    resetAll
  }
})
