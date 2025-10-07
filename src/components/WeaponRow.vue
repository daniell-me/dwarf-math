<script setup lang="ts">
import type { Weapon, CharacterStats, Upgrade } from '@/data/types'
import WeaponCard from '@/components/WeaponCard.vue'
import UpgradeTable from '@/components/UpgradeTable.vue'

interface Props {
  weapon: Weapon
  characterStats: CharacterStats
  upgrades: Upgrade[]
  getWeaponDPS: (weapon: Weapon) => number
  getUpgradedDPS: (weapon: Weapon, upgrade: Upgrade, rarity: keyof Upgrade['values']) => number | null
  removable?: boolean
}

const props = defineProps<Props>()

interface Emits {
  (e: 'remove'): void
}

const emit = defineEmits<Emits>()
</script>

<template>
  <div class="weapon-row">
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
    <UpgradeTable
      :weapon="weapon"
      :character-stats="characterStats"
      :upgrades="upgrades"
      :get-upgraded-d-p-s="getUpgradedDPS"
    />

    <!-- Remove Button -->
    <button v-if="removable" class="remove-button" @click="emit('remove')" title="Remove weapon">
      ×
    </button>
  </div>
</template>

<style scoped>
.weapon-row {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: stretch;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background-soft);
  position: relative;
}

.weapon-card-container {
  width: 300px;
  min-width: 300px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
}

.current-dps {
  width: 120px;
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

.remove-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 4px;
  background: var(--color-background-mute);
  color: var(--color-text);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.remove-button:hover {
  background: #ff4444;
  color: white;
}
</style>
