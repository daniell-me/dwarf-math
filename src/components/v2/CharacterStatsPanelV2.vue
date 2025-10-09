<template>
  <div class="character-stats-panel">
    <div v-if="characterStats" class="stats-list">
      <div class="stat-item">
        <span class="stat-label">Health:</span>
        <span class="stat-value">{{ characterStats.health }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Damage:</span>
        <span class="stat-value">{{ formatPercentage(characterStats.damage) }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Critical Chance:</span>
        <span class="stat-value">{{ formatPercentage(characterStats.critChance) }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Critical Damage:</span>
        <span class="stat-value">{{ formatMultiplier(characterStats.critDamage) }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Reload Speed:</span>
        <span class="stat-value">{{ formatPercentage(characterStats.reloadSpeed) }}</span>
      </div>
    </div>
    <div v-else class="no-stats">
      <p>Select a class to view stats</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CharacterStats } from '@/data/types'

interface Props {
  characterStats: CharacterStats | null
}

defineProps<Props>()

function formatPercentage(value: number | undefined): string {
  if (value === undefined) return 'N/A'
  return `${(value * 100).toFixed(0)}%`
}

function formatMultiplier(value: number | undefined): string {
  if (value === undefined) return 'N/A'
  return `${value.toFixed(2)}x`
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
  gap: 0.75rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.stat-label {
  font-weight: 600;
  color: var(--color-heading);
}

.stat-value {
  font-family: monospace;
  font-size: 1.1rem;
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
