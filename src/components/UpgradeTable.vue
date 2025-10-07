<script setup lang="ts">
import type { Weapon, CharacterStats, Upgrade } from '@/data/types'

interface Props {
  weapon: Weapon
  characterStats: CharacterStats
  upgrades: Upgrade[]
  getUpgradedDPS: (weapon: Weapon, upgrade: Upgrade, rarity: keyof Upgrade['values']) => number | null
}

defineProps<Props>()

const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const
</script>

<template>
  <div class="upgrade-table">
    <table>
      <tbody>
        <tr v-for="upgrade in upgrades" :key="upgrade.name">
          <td class="upgrade-type">{{ upgrade.name }}</td>
          <td v-for="rarity in rarities" :key="rarity" class="dps-cell">
            {{ getUpgradedDPS(weapon, upgrade, rarity) || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
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

.upgrade-type {
  text-align: left !important;
  font-weight: 500;
  width: 140px;
  min-width: 140px;
  max-width: 140px;
}

.dps-cell {
  font-family: monospace;
  background: var(--color-background);
  width: 95px;
  min-width: 95px;
  max-width: 95px;
}

.dps-cell:hover {
  background: var(--color-background-soft);
}
</style>
