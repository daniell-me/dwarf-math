<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { weapons, weaponsMap } from '@/data/weapons'
import { weaponUpgrades, tagUpgrades, playerUpgrades } from '@/data/upgrades'
import { classMods } from '@/data/classMods'
import { classBaseStats } from '@/data/classes'
import { metaUpgrades } from '@/data/metaUpgrades'
import type { Weapon, CharacterStats, ClassMod, Upgrade, Rarity } from '@/data/types'
import { calculateCurrentStats, calculateDPSWithUpgrade, calculateDPS, calculateDPSWithAllUpgrades } from '@/services/calculations'
import { aggregateMidDiveUpgrades } from '@/utils/upgradeAggregation'
import { allUpgrades } from '@/data/upgrades'
import { getValidUpgradesForWeapon, getUpgradeValue } from '@/utils/weaponFunctions'
import { useMetaUpgradesStore } from '@/stores/metaUpgrades'
import { useSelectedUpgradesStore } from '@/stores/selectedUpgrades'
import { useGlobalUpgradesStore } from '@/stores/globalUpgrades'
import HeaderV2 from '@/components/v2/HeaderV2.vue'
import WeaponListV2 from '@/components/v2/WeaponListV2.vue'
import GlobalUpgradesSectionV2 from '@/components/v2/GlobalUpgradesSectionV2.vue'
import MetaUpgradesPanelV2 from '@/components/v2/MetaUpgradesPanelV2.vue'
import GearModalV2 from '@/components/v2/GearModalV2.vue'
import SlideOutDrawerV2 from '@/components/v2/SlideOutDrawerV2.vue'
import CharacterStatsPanelV2 from '@/components/v2/CharacterStatsPanelV2.vue'
import SelectedUpgradesPanelV2 from '@/components/v2/SelectedUpgradesPanelV2.vue'

// Storage keys
const CLASS_MOD_STORAGE_KEY = 'dwarf-math-selected-class-mod'
const EQUIPPED_WEAPONS_STORAGE_KEY = 'dwarf-math-equipped-weapons'
const FLAT_GEAR_BONUSES_STORAGE_KEY = 'dwarf-math-flat-gear-bonuses'
const PERCENT_GEAR_BONUSES_STORAGE_KEY = 'dwarf-math-percent-gear-bonuses'

// Load functions
function loadSelectedClassMod(): ClassMod | null {
  try {
    const stored = localStorage.getItem(CLASS_MOD_STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      // Find the class mod by name to ensure we have the full object
      return classMods.find(cm => cm.name === data.name) ?? null
    }
  } catch (e) {
    console.error('Failed to load selected class mod from localStorage:', e)
  }
  return null
}

function loadEquippedWeapons(): (Weapon | null)[] {
  try {
    const stored = localStorage.getItem(EQUIPPED_WEAPONS_STORAGE_KEY)
    if (stored) {
      const weaponIds = JSON.parse(stored) as (string | null)[]
      // Map weapon IDs back to full weapon objects
      return weaponIds.map(id => id ? weaponsMap[id] ?? null : null)
    }
  } catch (e) {
    console.error('Failed to load equipped weapons from localStorage:', e)
  }
  return [null, null, null, null]
}

// Save functions
function saveSelectedClassMod(classMod: ClassMod | null): void {
  try {
    if (classMod) {
      // Only store the name to avoid storing the full object
      localStorage.setItem(CLASS_MOD_STORAGE_KEY, JSON.stringify({ name: classMod.name }))
    } else {
      localStorage.removeItem(CLASS_MOD_STORAGE_KEY)
    }
  } catch (e) {
    console.error('Failed to save selected class mod to localStorage:', e)
  }
}

function saveEquippedWeapons(weapons: (Weapon | null)[]): void {
  try {
    // Only store weapon IDs to avoid storing full objects
    const weaponIds = weapons.map(w => w?.id ?? null)
    localStorage.setItem(EQUIPPED_WEAPONS_STORAGE_KEY, JSON.stringify(weaponIds))
  } catch (e) {
    console.error('Failed to save equipped weapons to localStorage:', e)
  }
}

function loadGearBonuses(key: string): Partial<CharacterStats> {
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error(`Failed to load gear bonuses from localStorage (${key}):`, e)
  }
  return {}
}

function saveGearBonuses(key: string, bonuses: Partial<CharacterStats>): void {
  try {
    localStorage.setItem(key, JSON.stringify(bonuses))
  } catch (e) {
    console.error(`Failed to save gear bonuses to localStorage (${key}):`, e)
  }
}

const selectedClassMod = ref<ClassMod | null>(loadSelectedClassMod())
const equippedWeapons = ref<(Weapon | null)[]>(loadEquippedWeapons())
const metaUpgradesStore = useMetaUpgradesStore()
const selectedUpgradesStore = useSelectedUpgradesStore()
const globalUpgradesStore = useGlobalUpgradesStore()
const showMetaUpgrades = ref(false)
const showGear = ref(false)
const showStatsDrawer = ref(false)
const showBuildDrawer = ref(false)
const showClassModal = ref(false)

// Gear bonuses
const flatGearBonuses = ref<Partial<CharacterStats>>(loadGearBonuses(FLAT_GEAR_BONUSES_STORAGE_KEY))
const percentGearBonuses = ref<Partial<CharacterStats>>(loadGearBonuses(PERCENT_GEAR_BONUSES_STORAGE_KEY))

// Watchers for persistence
watch(selectedClassMod, (newValue) => {
  saveSelectedClassMod(newValue)
})

watch(equippedWeapons, (newValue) => {
  saveEquippedWeapons(newValue)
}, { deep: true })

// Calculate current character stats based on class, class mod, meta upgrades, and gear
const characterStats = computed<CharacterStats | null>(() => {
  if (!selectedClassMod.value) return null

  const baseStats = classBaseStats[selectedClassMod.value.class]

  return calculateCurrentStats(
    baseStats,
    selectedClassMod.value,
    metaUpgrades,
    metaUpgradesStore.levels,
    flatGearBonuses.value,
    percentGearBonuses.value
  )
})

function handleClassModChange(classMod: ClassMod) {
  selectedClassMod.value = classMod

  // Only initialize with starting weapon if no weapons are equipped
  // (allows restoration from localStorage to work)
  const hasEquippedWeapons = equippedWeapons.value.some(w => w !== null)
  if (!hasEquippedWeapons) {
    const startingWeapon = weaponsMap[classMod.startingWeaponId]
    equippedWeapons.value = [startingWeapon, null, null, null]
  }

  // Close the modal after selection
  showClassModal.value = false
}

function getAvailableWeapons(currentIndex: number): Weapon[] {
  if (!selectedClassMod.value) return []

  return weapons
    .filter(weapon => {
      // Check if weapon is not already equipped in other slots
      if (equippedWeapons.value.some((w, i) => i !== currentIndex && w?.name === weapon.name)) {
        return false
      }

      // Allow if weapon is of the selected class
      if (weapon.class === selectedClassMod.value!.class) {
        return true
      }

      // Allow if weapon has any tag that matches the class mod's available weapon tags
      const hasMatchingTag = selectedClassMod.value!.availableWeaponTags.some(tag =>
        weapon.tags.includes(tag)
      )

      return hasMatchingTag
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

function getValidUpgrades(weapon: Weapon): Upgrade[] {
  return getValidUpgradesForWeapon(weapon, weaponUpgrades)
}

function getUpgradedDPS(weapon: Weapon, upgrade: Upgrade, rarity: Rarity): number | null {
  if (!characterStats.value) return null

  const upgradeValue = getUpgradeValue(upgrade, rarity)
  if (upgradeValue === undefined) {
    return null
  }

  // Aggregate all current mid-dive upgrades for this weapon
  const aggregatedUpgrades = aggregateMidDiveUpgrades(
    weapon.id,
    weapon,
    selectedUpgradesStore.selectedUpgrades,
    globalUpgradesStore.upgrades,
    allUpgrades
  )

  // Add one more instance of this upgrade to the aggregated totals
  const aggregatedWithOneMore = { ...aggregatedUpgrades }
  const currentValue = aggregatedWithOneMore[upgrade.stat] ?? 0
  aggregatedWithOneMore[upgrade.stat] = currentValue + upgradeValue

  // Calculate DPS with the additional upgrade
  return calculateDPSWithAllUpgrades(
    weapon.baseDmg,
    weapon.fireRate,
    weapon.reloadTime,
    weapon.clipSize,
    characterStats.value,
    aggregatedWithOneMore
  )
}

function getCurrentDPS(weapon: Weapon): number {
  if (!characterStats.value) return 0

  // Aggregate all mid-dive upgrades for this weapon
  const aggregatedUpgrades = aggregateMidDiveUpgrades(
    weapon.id,
    weapon,
    selectedUpgradesStore.selectedUpgrades,
    globalUpgradesStore.upgrades,
    allUpgrades
  )

  // Calculate DPS with all upgrades applied
  return calculateDPSWithAllUpgrades(
    weapon.baseDmg,
    weapon.fireRate,
    weapon.reloadTime,
    weapon.clipSize,
    characterStats.value,
    aggregatedUpgrades
  )
}

function setWeapon(index: number, weapon: Weapon) {
  equippedWeapons.value[index] = weapon
}

function removeWeapon(index: number) {
  equippedWeapons.value[index] = null
}

function handleGearUpdate(flat: Partial<CharacterStats>, percent: Partial<CharacterStats>) {
  flatGearBonuses.value = flat
  percentGearBonuses.value = percent
  saveGearBonuses(FLAT_GEAR_BONUSES_STORAGE_KEY, flat)
  saveGearBonuses(PERCENT_GEAR_BONUSES_STORAGE_KEY, percent)
}

function handleStartNewDive() {
  // Clear class selection (watcher will handle localStorage)
  selectedClassMod.value = null

  // Clear equipped weapons (watcher will handle localStorage)
  equippedWeapons.value = [null, null, null, null]

  // Clear upgrade stores (but NOT meta upgrades)
  selectedUpgradesStore.clearAll()
  globalUpgradesStore.resetAll()

  // Open class selection modal
  showClassModal.value = true
}
</script>

<template>
  <div class="home-v2">
    <HeaderV2
      :class-mods="classMods"
      :selected-class-mod="selectedClassMod"
      :show-class-modal="showClassModal"
      @update:selected-class-mod="handleClassModChange"
      @update:show-class-modal="showClassModal = $event"
      @open-meta-upgrades="showMetaUpgrades = true"
      @open-gear="showGear = true"
      @start-new-dive="handleStartNewDive"
    />

    <div v-if="selectedClassMod" class="main-layout">
      <div class="left-column">
        <WeaponListV2
          :weapons="equippedWeapons"
          :character-stats="characterStats"
          :get-available-weapons="getAvailableWeapons"
          :get-valid-upgrades="getValidUpgrades"
          :get-upgraded-d-p-s="getUpgradedDPS"
          :get-current-d-p-s="getCurrentDPS"
          @select-weapon="setWeapon"
          @remove-weapon="removeWeapon"
        />
      </div>

      <div class="right-column">
        <GlobalUpgradesSectionV2
          :tag-upgrades="tagUpgrades"
          :player-upgrades="playerUpgrades"
          :equipped-weapons="equippedWeapons"
        />
      </div>
    </div>

    <div v-else class="no-class-selected">
      <p>Select a class to begin</p>
    </div>

    <MetaUpgradesPanelV2 v-if="showMetaUpgrades" @close="showMetaUpgrades = false" />
    <GearModalV2
      v-if="showGear"
      :flat-bonuses="flatGearBonuses"
      :percent-bonuses="percentGearBonuses"
      @update="handleGearUpdate"
      @close="showGear = false"
    />

    <!-- Floating buttons on left side -->
    <div class="floating-buttons">
      <button @click="showStatsDrawer = true" class="floating-button" title="Character Stats">
        <span>📊</span>
      </button>
      <button @click="showBuildDrawer = true" class="floating-button" title="Current Build">
        <span>🔧</span>
      </button>
    </div>

    <!-- Slide-out drawers -->
    <SlideOutDrawerV2 :is-open="showStatsDrawer" title="Character Stats" @close="showStatsDrawer = false">
      <CharacterStatsPanelV2 :character-stats="characterStats" />
    </SlideOutDrawerV2>

    <SlideOutDrawerV2 :is-open="showBuildDrawer" title="Current Build" @close="showBuildDrawer = false">
      <SelectedUpgradesPanelV2 :weapons="equippedWeapons" />
    </SlideOutDrawerV2>
  </div>
</template>

<style scoped>
.home-v2 {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.main-layout {
  display: flex;
  flex: 1;
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
}

.left-column {
  flex: 6;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.right-column {
  flex: 4;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

h2 {
  margin-top: 0;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.no-class-selected {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: 1.2rem;
}

.floating-buttons {
  position: fixed;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 100;
}

.floating-button {
  width: 3rem;
  height: 3rem;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-background-soft);
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
}

.floating-button:hover {
  background: var(--color-background-mute);
  border-color: var(--color-border-hover);
  transform: scale(1.1);
}

.floating-button span {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
