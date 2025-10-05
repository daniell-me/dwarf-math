<script setup lang="ts">
import { weapons, defaultCharacterStats } from '@/data/weapons'
import { upgrades } from '@/data/upgrades'
import type { Weapon, CharacterStats, Upgrade } from '@/data/types'
import { Rarity } from '@/data/types'
import { calculateDPS, calculateDPSWithStatUpgrade } from '@/services/calculations'
import { getValidUpgradesForWeapon } from '@/utils/weaponFunctions'
import WeaponCard from '@/components/WeaponCard.vue'
import { ref } from 'vue'

const characterStats = ref<CharacterStats>({ ...defaultCharacterStats })

const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const

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

    <div class="weapon-list">
      <div v-for="weapon in weapons" :key="weapon.name" class="weapon-row">
        <!-- Weapon Card -->
        <div class="weapon-card-container">
          <WeaponCard :weapon="weapon" />
        </div>

        <!-- Current DPS -->
        <div class="current-dps">
          <div class="dps-label">Current DPS</div>
          <div class="dps-value">{{ getWeaponDPS(weapon) }}</div>
        </div>

        <!-- Upgrade Table -->
        <div class="upgrade-table">
          <table>
            <thead>
              <tr>
                <th class="upgrade-type-header">Upgrade Type</th>
                <th v-for="rarity in rarities" :key="rarity" class="rarity-header">
                  {{ rarity }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="upgrade in getValidUpgrades(weapon)" :key="upgrade.name">
                <td class="upgrade-type">{{ upgrade.name }}</td>
                <td v-for="rarity in rarities" :key="rarity" class="dps-cell">
                  {{ getUpgradedDPS(weapon, upgrade, rarity) || '-' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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

/* Column layout variables for consistency */
:root {
  --weapon-col-width: 300px;
  --dps-col-width: 120px;
  --upgrade-type-col-width: 140px;
  --rarity-col-width: 80px;
}


.weapon-row {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: flex-start;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background-soft);
}

.weapon-card-container {
  width: var(--weapon-col-width);
}

.current-dps {
  width: var(--dps-col-width);
  text-align: center;
}

.dps-label {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.dps-value {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: monospace;
}

.upgrade-table {
  flex: 1;
  min-width: 600px;
}

.upgrade-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.upgrade-table th,
.upgrade-table td {
  padding: 0.5rem;
  border: 1px solid var(--color-border-hover);
  text-align: center;
}

.upgrade-table th {
  background: var(--color-background-soft);
  font-weight: bold;
}

.upgrade-table .rarity-header {
  text-transform: capitalize;
}

.upgrade-table .upgrade-type-header {
  text-align: center;
}

.upgrade-type {
  text-align: left !important;
  font-weight: 500;
  width: var(--upgrade-type-col-width);
  min-width: var(--upgrade-type-col-width);
  max-width: var(--upgrade-type-col-width);
}

.dps-cell {
  font-family: monospace;
  background: var(--color-background);
  width: var(--rarity-col-width);
  min-width: var(--rarity-col-width);
  max-width: var(--rarity-col-width);
}

.dps-cell:hover {
  background: var(--color-background-soft);
}
</style>
