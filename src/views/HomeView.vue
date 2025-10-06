<script setup lang="ts">
import { weapons, defaultCharacterStats } from '@/data/weapons'
import { upgrades } from '@/data/upgrades'
import { classMods } from '@/data/classMods'
import type { Weapon, CharacterStats, Upgrade, ClassMod } from '@/data/types'
import { calculateDPS, calculateDPSWithStatUpgrade } from '@/services/calculations'
import { getValidUpgradesForWeapon } from '@/utils/weaponFunctions'
import WeaponRow from '@/components/WeaponRow.vue'
import RarityHeader from '@/components/RarityHeader.vue'
import ClassModSelector from '@/components/ClassModSelector.vue'
import { ref, watch } from 'vue'

const characterStats = ref<CharacterStats>({ ...defaultCharacterStats })
const selectedClassMod = ref<ClassMod | null>(null)
const equippedWeapons = ref<Weapon[]>([])

// When class mod changes, initialize with starting weapon
watch(selectedClassMod, (newClassMod) => {
  if (newClassMod && newClassMod.startingWeapon) {
    equippedWeapons.value = [newClassMod.startingWeapon]
  } else {
    equippedWeapons.value = []
  }
})

function getWeaponDPS(weapon: Weapon): number {
  return calculateDPS(weapon, characterStats.value)
}

function getUpgradedDPS(weapon: Weapon, upgrade: Upgrade, rarity: keyof Upgrade['values']): number | null {
  const upgradeValue = upgrade.values[rarity]
  if (upgradeValue === undefined) {
    return null
  }
  return calculateDPSWithStatUpgrade(weapon, characterStats.value, upgrade.stat, upgradeValue)
}

function getValidUpgrades(weapon: Weapon): Upgrade[] {
  return getValidUpgradesForWeapon(weapon, upgrades)
}

function addWeapon(weapon: Weapon) {
  if (equippedWeapons.value.length < 4 && !equippedWeapons.value.includes(weapon)) {
    equippedWeapons.value.push(weapon)
  }
}

function removeWeapon(weapon: Weapon) {
  const index = equippedWeapons.value.indexOf(weapon)
  if (index > -1) {
    equippedWeapons.value.splice(index, 1)
  }
}

// Get weapons available to add (not already equipped)
const availableWeapons = ref<Weapon[]>([])
watch([equippedWeapons, selectedClassMod], () => {
  availableWeapons.value = weapons.filter(weapon => !equippedWeapons.value.includes(weapon))
}, { immediate: true })
</script>

<template>
  <main>
    <h1>Dwarf Math - Weapon Damage Calculator</h1>

    <ClassModSelector
      :class-mods="classMods"
      :selected-class-mod="selectedClassMod"
      @update:selected-class-mod="selectedClassMod = $event"
    />

    <RarityHeader />

    <div v-if="selectedClassMod" class="equipped-weapons-section">
      <div class="section-header">
        <h2>Equipped Weapons ({{ equippedWeapons.length }}/4)</h2>
      </div>

      <div class="weapon-list">
        <WeaponRow
          v-for="weapon in equippedWeapons"
          :key="weapon.name"
          :weapon="weapon"
          :character-stats="characterStats"
          :upgrades="getValidUpgrades(weapon)"
          :get-weapon-d-p-s="getWeaponDPS"
          :get-upgraded-d-p-s="getUpgradedDPS"
          :removable="equippedWeapons.length > 1"
          @remove="removeWeapon(weapon)"
        />
      </div>

      <div v-if="equippedWeapons.length < 4" class="add-weapon-section">
        <h3>Add Weapon</h3>
        <select @change="(e) => {
          const target = e.target as HTMLSelectElement
          const weaponName = target.value
          if (weaponName) {
            const weapon = weapons.find(w => w.name === weaponName)
            if (weapon) addWeapon(weapon)
            target.value = ''
          }
        }">
          <option value="">Select a weapon to add...</option>
          <option v-for="weapon in availableWeapons" :key="weapon.name" :value="weapon.name">
            {{ weapon.name }}
          </option>
        </select>
      </div>
    </div>

    <div v-else class="no-class-selected">
      <p>Select a class mod to begin</p>
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

.add-weapon-section {
  padding: 1.5rem;
  border: 2px dashed var(--color-border);
  border-radius: 8px;
  background: var(--color-background-mute);
}

.add-weapon-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.add-weapon-section select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
}

.add-weapon-section select:hover {
  border-color: var(--color-border-hover);
}

.no-class-selected {
  padding: 3rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 1.2rem;
}
</style>
