<script setup lang="ts">
import { weapons, weaponsMap } from '@/data/weapons'
import { upgrades } from '@/data/upgrades'
import { classMods } from '@/data/classMods'
import { classBaseStats } from '@/data/classes'
import { metaUpgrades } from '@/data/metaUpgrades'
import type { Weapon, CharacterStats, Upgrade, ClassMod } from '@/data/types'
import { calculateCurrentStats, calculateDPSWithUpgrade } from '@/services/calculations'
import { getValidUpgradesForWeapon } from '@/utils/weaponFunctions'
import { useMetaUpgradesStore } from '@/stores/metaUpgrades'
import { useSelectedUpgradesStore } from '@/stores/selectedUpgrades'
import WeaponRow from '@/components/WeaponRow.vue'
import HeaderRow from '@/components/HeaderRow.vue'
import { ref, watch, computed } from 'vue'

const selectedClassMod = ref<ClassMod | null>(null)
const equippedWeapons = ref<(Weapon | null)[]>([null, null, null, null])
const metaUpgradesStore = useMetaUpgradesStore()
const selectedUpgradesStore = useSelectedUpgradesStore()

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

// When class mod changes, initialize with starting weapon
watch(selectedClassMod, (newClassMod) => {
  if (newClassMod) {
    const startingWeapon = weaponsMap[newClassMod.startingWeaponId]
    equippedWeapons.value = [startingWeapon, null, null, null]
  } else {
    equippedWeapons.value = [null, null, null, null]
  }
})

function getUpgradedDPS(weapon: Weapon, upgrade: Upgrade, rarity: keyof Upgrade['values']): number | null {
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

function getValidUpgrades(weapon: Weapon): Upgrade[] {
  return getValidUpgradesForWeapon(weapon, upgrades)
}

function setWeapon(index: number, weapon: Weapon | null) {
  equippedWeapons.value[index] = weapon
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

function formatStatValue(value: number | undefined): string {
  if (value === undefined) return 'N/A'
  return typeof value === 'number' ? value.toFixed(2) : String(value)
}

function getWeaponName(weaponId: string): string {
  const weapon = weaponsMap[weaponId]
  return weapon ? weapon.name : weaponId
}

function formatUpgradeValue(value: number): string {
  return `+${(value * 100).toFixed(0)}%`
}
</script>

<template>
  <main>
    <h1>Dwarf Math - Weapon Damage Calculator</h1>

    <HeaderRow
      :class-mods="classMods"
      :selected-class-mod="selectedClassMod"
      @update:selected-class-mod="selectedClassMod = $event"
    />

    <div v-if="selectedClassMod" class="equipped-weapons-section">
      <div class="weapon-list">
        <div v-for="(weapon, index) in equippedWeapons" :key="index" class="weapon-slot">
          <WeaponRow
            v-if="weapon && characterStats"
            :weapon="weapon"
            :character-stats="characterStats"
            :upgrades="getValidUpgrades(weapon)"
            :get-upgraded-d-p-s="getUpgradedDPS"
            :removable="index !== 0"
            @remove="setWeapon(index, null)"
          />

          <div v-else class="empty-weapon-slot">
            <h3>Weapon Slot {{ index + 1 }}</h3>
            <select @change="(e) => {
              const target = e.target as HTMLSelectElement
              const weaponName = target.value
              if (weaponName) {
                const weapon = weapons.find(w => w.name === weaponName)
                if (weapon) setWeapon(index, weapon)
              }
            }">
              <option value="">Select a weapon...</option>
              <option v-for="weapon in getAvailableWeapons(index)" :key="weapon.name" :value="weapon.name">
                {{ weapon.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-class-selected">
      <p>Select a class mod to begin</p>
    </div>

    <!-- Debug Stats Display -->
    <div v-if="characterStats" class="debug-stats">
      <h4>Character Stats</h4>
      <div class="stats-grid">
        <div v-for="(value, key) in characterStats" :key="key" class="stat-item">
          <span class="stat-name">{{ key }}:</span>
          <span class="stat-value">{{ formatStatValue(value) }}</span>
        </div>
      </div>
    </div>

    <!-- Selected Upgrades Display -->
    <div class="selected-upgrades-panel">
      <div class="panel-header-row">
        <h4>Selected Upgrades</h4>
        <span class="total-count">{{ selectedUpgradesStore.totalCount }} / 50</span>
      </div>
      <div v-if="selectedUpgradesStore.selectedUpgrades.length === 0" class="empty-message">
        No upgrades selected
      </div>
      <div v-else class="upgrades-list">
        <div
          v-for="(upgrade, index) in selectedUpgradesStore.selectedUpgrades"
          :key="index"
          class="upgrade-item"
        >
          <div class="upgrade-header">
            <span class="weapon-name">{{ getWeaponName(upgrade.weaponId) }}</span>
            <span class="rarity-badge" :class="`rarity-${upgrade.rarity}`">
              {{ upgrade.rarity }}
            </span>
          </div>
          <div class="upgrade-details">
            <span class="upgrade-name">{{ upgrade.upgradeName }}</span>
            <span class="upgrade-value">{{ formatUpgradeValue(upgrade.value) }}</span>
          </div>
        </div>
      </div>
      <button
        v-if="selectedUpgradesStore.selectedUpgrades.length > 0"
        @click="selectedUpgradesStore.clearAll()"
        class="restart-button"
      >
        Restart
      </button>
    </div>
  </main>
</template>

<style scoped>
main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.section-header {
  margin-bottom: 1rem;
}

.section-header h2 {
  font-size: 1.5rem;
  color: var(--color-heading);
}

.weapon-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.weapon-slot {
  min-height: 100px;
}

.empty-weapon-slot {
  padding: 1.5rem;
  border: 2px dashed var(--color-border);
  border-radius: 8px;
  background: var(--color-background-mute);
}

.empty-weapon-slot h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.empty-weapon-slot select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
}

.empty-weapon-slot select:hover {
  border-color: var(--color-border-hover);
}

.no-class-selected {
  padding: 3rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 1.2rem;
}

.debug-stats {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  max-width: 300px;
  max-height: 600px;
  overflow-y: auto;
  background: var(--color-background-soft);
  border: 2px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  font-size: 0.875rem;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.debug-stats h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  color: var(--color-heading);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.25rem 0;
}

.stat-name {
  color: var(--color-text-muted);
  font-family: monospace;
}

.stat-value {
  color: var(--color-text);
  font-family: monospace;
  font-weight: bold;
}

.selected-upgrades-panel {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  max-width: 350px;
  max-height: 600px;
  overflow-y: auto;
  background: var(--color-background-soft);
  border: 2px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  font-size: 0.875rem;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.panel-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.selected-upgrades-panel h4 {
  margin: 0;
  font-size: 1rem;
  color: var(--color-heading);
}

.total-count {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  font-weight: 600;
  font-family: monospace;
}

.empty-message {
  color: var(--color-text-muted);
  text-align: center;
  padding: 1rem 0;
  font-style: italic;
}

.upgrades-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.upgrade-item {
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 0.75rem;
}

.upgrade-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.weapon-name {
  font-weight: 600;
  color: var(--color-heading);
  font-size: 0.9rem;
}

.rarity-badge {
  padding: 0.125rem 0.5rem;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
}

.rarity-common {
  background: var(--rarity-common);
  color: #333;
}

.rarity-uncommon {
  background: var(--rarity-uncommon);
}

.rarity-rare {
  background: var(--rarity-rare);
}

.rarity-epic {
  background: var(--rarity-epic);
}

.rarity-legendary {
  background: var(--rarity-legendary);
}

.upgrade-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upgrade-name {
  color: var(--color-text);
  font-size: 0.85rem;
}

.upgrade-value {
  color: var(--vt-c-green);
  font-weight: bold;
  font-family: monospace;
}

.restart-button {
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.restart-button:hover {
  background: #cc0000;
}
</style>
