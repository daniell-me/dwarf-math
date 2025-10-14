<template>
  <div class="meta-upgrades-overlay" @click.self="$emit('close')">
    <div class="meta-upgrades-panel">
      <div class="panel-header">
        <h2>Meta Upgrades</h2>
        <button @click="store.resetAll()" class="reset-button">Reset All</button>
        <button @click="$emit('close')" class="close-button">×</button>
      </div>

      <div class="upgrades-list">
        <div v-for="upgrade in store.upgradeLevels" :key="upgrade.id" class="upgrade-item">
          <div class="upgrade-info">
            <div class="upgrade-name">{{ upgrade.name }}</div>
            <div class="upgrade-description">
              {{ upgrade.description || formatStatName(upgrade.stat) }}
              <span v-if="upgrade.currentLevel > 0" class="upgrade-bonus">
                {{ formatBonus(upgrade) }}
              </span>
            </div>
          </div>

          <div class="upgrade-controls">
            <button
              @click="store.decrementLevel(upgrade.id)"
              :disabled="upgrade.currentLevel === 0"
              class="level-button"
            >
              −
            </button>
            <span class="level-display">{{ upgrade.currentLevel }} / {{ upgrade.maxLevel }}</span>
            <button
              @click="store.incrementLevel(upgrade.id)"
              :disabled="upgrade.currentLevel >= upgrade.maxLevel"
              class="level-button"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMetaUpgradesStore } from '@/stores/metaUpgrades'
import type { MetaUpgrade } from '@/data/types'

defineEmits<{
  close: []
}>()

const store = useMetaUpgradesStore()

function formatStatName(stat: string): string {
  return stat.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

function formatBonus(upgrade: MetaUpgrade & { currentLevel: number }): string {
  if (upgrade.currentLevel === 0) {
    return '+0'
  }

  const totalBonus = upgrade.bonusValues[upgrade.currentLevel - 1] ?? 0

  if (upgrade.bonusType === 'percentage') {
    return `+${(totalBonus * 100).toFixed(0)}%`
  } else {
    return `+${totalBonus}`
  }
}
</script>

<style scoped>
.meta-upgrades-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.meta-upgrades-panel {
  background: var(--color-background-soft);
  border: 2px solid var(--color-border);
  border-radius: 8px;
  width: 95%;
  max-width: 1400px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  gap: 1rem;
}

.panel-header h2 {
  margin: 0;
  flex: 1;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  color: var(--color-text);
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: var(--color-heading);
}

.reset-button {
  padding: 0.5rem 1rem;
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-text);
  font-size: 0.9rem;
}

.reset-button:hover {
  background: var(--color-background);
}

.upgrades-list {
  overflow-y: auto;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, auto);
  grid-auto-flow: column;
  gap: 0.75rem;
}

.upgrade-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.upgrade-info {
  flex: 1;
  min-width: 0;
}

.upgrade-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-heading);
  margin-bottom: 0.25rem;
}

.upgrade-description {
  font-size: 0.75rem;
  color: var(--color-text);
}

.upgrade-bonus {
  color: hsla(160, 100%, 37%, 1);
  font-weight: 600;
  margin-left: 0.25rem;
  display: block;
  margin-top: 0.25rem;
}

.upgrade-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.level-button {
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  line-height: 1;
}

.level-button:hover:not(:disabled) {
  background: var(--color-background-soft);
  border-color: var(--color-border-hover);
}

.level-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.level-display {
  min-width: 3rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
}
</style>
