<template>
  <div class="player-stats-panel">
    <div v-if="hasStats" class="stats-list">
      <div v-for="statId in orderedStatIds" :key="statId" class="stat-item">
        <span class="stat-label">{{ statDefinitions[statId].name }}:</span>
        <span class="stat-value">{{ getFormattedValue(statId) }}</span>
      </div>
    </div>
    <div v-else class="no-stats">
      <p>Select a class to view stats</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStatsStore } from '@/stores/playerStats'
import { statDefinitions, orderedStatIds, formatStatValue } from '@/data/statDefinitions'
import type { StatId } from '@/data/statDefinitions'

const playerStatsStore = usePlayerStatsStore()

const hasStats = computed(() => {
  // Check if any stat has a non-zero value
  return orderedStatIds.some(statId => playerStatsStore.stats[statId] !== 0)
})

function getFormattedValue(statId: StatId): string {
  const stat = statDefinitions[statId]
  const value = playerStatsStore.stats[statId]
  return formatStatValue(stat, value)
}
</script>

<style scoped>
.player-stats-panel {
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
