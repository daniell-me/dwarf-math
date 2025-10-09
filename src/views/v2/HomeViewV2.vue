<script setup lang="ts">
import { ref, computed } from 'vue'
import { weapons, weaponsMap } from '@/data/weapons'
import { upgrades } from '@/data/upgrades'
import { classMods } from '@/data/classMods'
import { classBaseStats } from '@/data/classes'
import { metaUpgrades } from '@/data/metaUpgrades'
import type { Weapon, CharacterStats, ClassMod, Upgrade, Rarity } from '@/data/types'
import { calculateCurrentStats, calculateDPSWithUpgrade, calculateDPS } from '@/services/calculations'
import { getValidUpgradesForWeapon } from '@/utils/weaponFunctions'
import { useMetaUpgradesStore } from '@/stores/metaUpgrades'
import HeaderV2 from '@/components/v2/HeaderV2.vue'
import WeaponListV2 from '@/components/v2/WeaponListV2.vue'
import GlobalUpgradesSectionV2 from '@/components/v2/GlobalUpgradesSectionV2.vue'
import MetaUpgradesPanelV2 from '@/components/v2/MetaUpgradesPanelV2.vue'
import SlideOutDrawerV2 from '@/components/v2/SlideOutDrawerV2.vue'
import CharacterStatsPanelV2 from '@/components/v2/CharacterStatsPanelV2.vue'
import SelectedUpgradesPanelV2 from '@/components/v2/SelectedUpgradesPanelV2.vue'

const selectedClassMod = ref<ClassMod | null>(null)
const equippedWeapons = ref<(Weapon | null)[]>([null, null, null, null])
const metaUpgradesStore = useMetaUpgradesStore()
const showMetaUpgrades = ref(false)
const showStatsDrawer = ref(false)
const showBuildDrawer = ref(false)

// TODO: Add UI for gear bonuses
const flatGearBonuses = ref<Partial<CharacterStats>>({})
const percentGearBonuses = ref<Partial<CharacterStats>>({})

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
  // Initialize with starting weapon
  const startingWeapon = weaponsMap[classMod.startingWeaponId]
  equippedWeapons.value = [startingWeapon, null, null, null]
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
  return getValidUpgradesForWeapon(weapon, upgrades)
}

function getUpgradedDPS(weapon: Weapon, upgrade: Upgrade, rarity: Rarity): number | null {
  if (!characterStats.value) return null

  const upgradeValue = upgrade.values[rarity]
  if (upgradeValue === undefined) {
    return null
  }
  return calculateDPSWithUpgrade(
    weapon.baseDmg,
    weapon.fireRate,
    weapon.reloadTime,
    weapon.clipSize,
    characterStats.value.critChance,
    characterStats.value.critDamage,
    upgrade,
    rarity,
    characterStats.value.damage ?? 1.0,
    characterStats.value.reloadSpeed ?? 1.0
  )
}

function getCurrentDPS(weapon: Weapon): number {
  if (!characterStats.value) return 0

  const damageMultiplier = characterStats.value.damage ?? 1.0
  const reloadSpeedMultiplier = characterStats.value.reloadSpeed ?? 1.0

  const modifiedDamage = weapon.baseDmg * damageMultiplier
  const modifiedReloadTime = weapon.reloadTime / reloadSpeedMultiplier

  return calculateDPS(
    modifiedDamage,
    weapon.fireRate,
    modifiedReloadTime,
    weapon.clipSize,
    characterStats.value.critChance,
    characterStats.value.critDamage
  )
}

function setWeapon(index: number, weapon: Weapon) {
  equippedWeapons.value[index] = weapon
}

function removeWeapon(index: number) {
  equippedWeapons.value[index] = null
}
</script>

<template>
  <div class="home-v2">
    <HeaderV2
      :class-mods="classMods"
      :selected-class-mod="selectedClassMod"
      @update:selected-class-mod="handleClassModChange"
      @open-meta-upgrades="showMetaUpgrades = true"
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
        <h2>Global Upgrades</h2>
        <GlobalUpgradesSectionV2 />
      </div>
    </div>

    <div v-else class="no-class-selected">
      <p>Select a class to begin</p>
    </div>

    <MetaUpgradesPanelV2 v-if="showMetaUpgrades" @close="showMetaUpgrades = false" />

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
  flex: 7;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.right-column {
  flex: 3;
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
