import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Rarity } from '@/data/types'

export interface SelectedUpgrade {
  weaponId: string
  upgradeName: string
  rarity: Rarity
  value: number
}

const MAX_UPGRADES = 50
const STORAGE_KEY = 'dwarf-math-selected-upgrades'

function loadFromStorage(): SelectedUpgrade[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load selected upgrades from localStorage:', e)
  }
  return []
}

function saveToStorage(upgrades: SelectedUpgrade[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(upgrades))
  } catch (e) {
    console.error('Failed to save selected upgrades to localStorage:', e)
  }
}

export const useSelectedUpgradesStore = defineStore('selectedUpgrades', () => {
  const selectedUpgrades = ref<SelectedUpgrade[]>(loadFromStorage())

  const totalCount = computed(() => selectedUpgrades.value.length)

  function addUpgrade(weaponId: string, upgradeName: string, rarity: Rarity, value: number) {
    if (selectedUpgrades.value.length >= MAX_UPGRADES) {
      return false
    }

    selectedUpgrades.value.push({
      weaponId,
      upgradeName,
      rarity,
      value
    })

    saveToStorage(selectedUpgrades.value)
    return true
  }

  function removeOneUpgrade(weaponId: string, upgradeName: string, rarity: Rarity) {
    const index = selectedUpgrades.value.findIndex(
      u => u.weaponId === weaponId && u.upgradeName === upgradeName && u.rarity === rarity
    )

    if (index !== -1) {
      selectedUpgrades.value.splice(index, 1)
      saveToStorage(selectedUpgrades.value)
      return true
    }

    return false
  }

  function getUpgradeCount(weaponId: string, upgradeName: string, rarity: Rarity): number {
    return selectedUpgrades.value.filter(
      u => u.weaponId === weaponId && u.upgradeName === upgradeName && u.rarity === rarity
    ).length
  }

  function clearAllForWeapon(weaponId: string) {
    selectedUpgrades.value = selectedUpgrades.value.filter(u => u.weaponId !== weaponId)
    saveToStorage(selectedUpgrades.value)
  }

  function clearAll() {
    selectedUpgrades.value = []
    saveToStorage(selectedUpgrades.value)
  }

  return {
    selectedUpgrades,
    totalCount,
    addUpgrade,
    removeOneUpgrade,
    getUpgradeCount,
    clearAllForWeapon,
    clearAll
  }
})
