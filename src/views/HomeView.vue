<script setup lang="ts">
import { weapons, weaponsMap } from '@/data/weapons'
import { upgrades } from '@/data/upgrades'
import { classMods } from '@/data/classMods'
import { classBaseStats } from '@/data/classes'
import { metaUpgrades } from '@/data/metaUpgrades'
import type { Weapon, CharacterStats, Upgrade, ClassMod } from '@/data/types'
import { calculateCurrentStats, calculateDPSWithUpgrade } from '@/services/calculations'
import { getValidUpgradesForWeapon } from '@/utils/weaponFunctions'
import WeaponRow from '@/components/WeaponRow.vue'
import HeaderRow from '@/components/HeaderRow.vue'
import { ref, watch, computed } from 'vue'

const selectedClassMod = ref<ClassMod | null>(null)
const equippedWeapons = ref<(Weapon | null)[]>([null, null, null, null])

// TODO: Implement cross-session state tracking for meta upgrade levels
const metaUpgradeLevels = ref<Record<string, number>>({})

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
    metaUpgradeLevels.value,
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
    rarity
  )
}

function getValidUpgrades(weapon: Weapon): Upgrade[] {
  return getValidUpgradesForWeapon(weapon, upgrades)
}

function setWeapon(index: number, weapon: Weapon | null) {
  equippedWeapons.value[index] = weapon
}

function getAvailableWeapons(currentIndex: number): Weapon[] {
  return weapons.filter(weapon => {
    // Check if weapon is not already equipped in other slots
    return !equippedWeapons.value.some((w, i) => i !== currentIndex && w?.name === weapon.name)
  })
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
</style>
