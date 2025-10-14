<script setup lang="ts">
import type { Weapon } from '@/data/types'

interface Props {
  weapon: Weapon
  currentDPS: number
  removable?: boolean
}

interface Emits {
  (e: 'remove'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="weapon-stats">
    <div class="weapon-header">
      <h3 class="weapon-name">{{ weapon.name }}</h3>
      <button
        v-if="removable"
        @click="emit('remove')"
        class="remove-button"
        title="Remove weapon"
      >
        ×
      </button>
    </div>

    <div class="current-dps">
      <span class="label">Current DPS:</span>
      <span class="value">{{ currentDPS.toFixed(1) }}</span>
    </div>

    <div class="base-stats">
      <div class="stat-row">
        <span class="stat-label">Base Damage:</span>
        <span class="stat-value">{{ weapon.baseDmg }}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Fire Rate:</span>
        <span class="stat-value">{{ weapon.fireRate }}/s</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Clip Size:</span>
        <span class="stat-value">{{ weapon.clipSize }}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Reload Time:</span>
        <span class="stat-value">{{ weapon.reloadTime }}s</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weapon-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  width: var(--weapon-stats-width);
  flex-shrink: 0;
}

.weapon-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.weapon-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
}

.remove-button {
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  border-radius: 3px;
  background: var(--color-background-mute);
  color: var(--color-text);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.remove-button:hover {
  background: #ff4444;
  color: white;
}

.current-dps {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  background: var(--color-background-mute);
  border-radius: 4px;
}

.current-dps .label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  font-weight: 600;
}

.current-dps .value {
  font-size: 1.25rem;
  font-weight: bold;
  font-family: monospace;
  color: var(--color-heading);
}

.base-stats {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.stat-label {
  color: var(--color-text-muted);
}

.stat-value {
  font-family: monospace;
  font-weight: 600;
  color: var(--color-text);
}
</style>
