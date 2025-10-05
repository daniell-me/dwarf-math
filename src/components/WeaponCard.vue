<template>
  <div class="weapon-card">
    <h3 class="weapon-name">{{ weapon.name }}</h3>

    <div class="weapon-stats">
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

      <div class="stat-row tags">
        <span class="stat-label">Tags:</span>
        <span class="stat-value">{{ weapon.tags.join(', ') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Weapon } from '@/data/types'

defineProps<{
  weapon: Weapon
}>()
</script>

<style scoped>
.weapon-card {
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.weapon-name {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-heading);
  text-align: center;
}

.weapon-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-weight: 500;
  color: var(--color-text);
}

.stat-value {
  font-family: monospace;
  color: var(--color-text-muted);
  font-weight: bold;
}

.tags .stat-value {
  font-family: inherit;
  font-size: 0.9rem;
  text-transform: capitalize;
}
</style>