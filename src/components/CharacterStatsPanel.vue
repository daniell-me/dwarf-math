<template>
  <div class="character-stats-panel">
    <div v-if="characterStats" class="stats-list">
      <div v-for="stat in orderedStats" :key="stat.key" class="stat-item">
        <span class="stat-label">{{ stat.label }}:</span>
        <span class="stat-value">{{ formatStatValue(stat) }}</span>
      </div>
    </div>
    <div v-else class="no-stats">
      <p>Select a class to view stats</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CharacterStats } from '@/data/types'

interface Props {
  characterStats: CharacterStats | null
}

const props = defineProps<Props>()

type StatConfig = {
  key: keyof CharacterStats
  label: string
  format: 'number' | 'percentage' | 'multiplier' | 'flat'
}

const statConfigs: StatConfig[] = [
  { key: 'health', label: 'Max HP', format: 'number' },
  { key: 'lifeRegen', label: 'Life Regen', format: 'flat' },
  { key: 'armor', label: 'Armor', format: 'number' },
  { key: 'dodgeChance', label: 'Dodge', format: 'percentage' },
  { key: 'moveSpeed', label: 'Move Speed', format: 'percentage' },
  { key: 'damage', label: 'Damage', format: 'percentage' },
  { key: 'fireRate', label: 'Fire Rate', format: 'percentage' },
  { key: 'reloadSpeed', label: 'Reload Speed', format: 'percentage' },
  { key: 'critChance', label: 'Critical Chance', format: 'percentage' },
  { key: 'critDamage', label: 'Critical Damage', format: 'multiplier' },
  { key: 'statusDamage', label: 'Status Effect Damage', format: 'percentage' },
  { key: 'pickupRadius', label: 'Pickup Radius', format: 'percentage' },
  { key: 'xpGain', label: 'XP Gain', format: 'percentage' },
  { key: 'miningSpeed', label: 'Mining Speed', format: 'percentage' },
  { key: 'lifetime', label: 'Lifetime', format: 'percentage' }
]

const orderedStats = computed(() => {
  if (!props.characterStats) return []
  return statConfigs
})

function formatStatValue(stat: StatConfig): string {
  if (!props.characterStats) return 'N/A'

  const value = props.characterStats[stat.key]
  if (value === undefined) return 'N/A'

  switch (stat.format) {
    case 'number':
      return Math.round(value).toString()
    case 'percentage':
      return `${(value * 100).toFixed(0)}%`
    case 'multiplier':
      return `${value.toFixed(2)}x`
    case 'flat':
      return value.toFixed(1)
    default:
      return value.toString()
  }
}
</script>

<style scoped>
.character-stats-panel {
  display: flex;
  flex-direction: column;
}

.stats-list {
  display: flex;
  flex-direction: column;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-heading);
}

.stat-value {
  font-family: monospace;
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-text);
}

.no-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--color-text-muted);
  font-size: 1rem;
}
</style>
