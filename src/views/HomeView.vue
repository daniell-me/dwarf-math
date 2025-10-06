<script setup lang="ts">
import { weapons, defaultCharacterStats } from '@/data/weapons'
import { upgrades } from '@/data/upgrades'
import type { Weapon, CharacterStats, Upgrade } from '@/data/types'
import { calculateDPS, calculateDPSWithStatUpgrade } from '@/services/calculations'
import { getValidUpgradesForWeapon } from '@/utils/weaponFunctions'
import WeaponRow from '@/components/WeaponRow.vue'
import RarityHeader from '@/components/RarityHeader.vue'
import { ref } from 'vue'

const characterStats = ref<CharacterStats>({ ...defaultCharacterStats })

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
</script>

<template>
  <main>
    <h1>Dwarf Math - Weapon Damage Calculator</h1>

    <RarityHeader />

    <div class="weapon-list">
      <WeaponRow
        v-for="weapon in weapons"
        :key="weapon.name"
        :weapon="weapon"
        :character-stats="characterStats"
        :upgrades="getValidUpgrades(weapon)"
        :get-weapon-d-p-s="getWeaponDPS"
        :get-upgraded-d-p-s="getUpgradedDPS"
      />
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

.weapon-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
