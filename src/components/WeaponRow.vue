<script setup lang="ts">
import type { Weapon, CharacterStats, Upgrade } from '@/data/types'
import WeaponCard from '@/components/WeaponCard.vue'
import UpgradeTable from '@/components/UpgradeTable.vue'
import DPSDisplay from '@/components/DPSDisplay.vue'

interface Props {
  weapon: Weapon
  characterStats: CharacterStats
  upgrades: Upgrade[]
  getUpgradedDPS: (weapon: Weapon, upgrade: Upgrade, rarity: keyof Upgrade['values']) => number | null
  removable?: boolean
}

defineProps<Props>()

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
    <DPSDisplay :weapon="weapon" :character-stats="characterStats" />

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
