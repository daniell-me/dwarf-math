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
  <div class="weapon-info-bar">
    <span class="weapon-name">{{ weapon.name }}</span>
    <span class="weapon-dps">DPS: {{ currentDPS.toFixed(1) }}</span>
    <button
      v-if="removable"
      @click="emit('remove')"
      class="remove-button"
      title="Remove weapon"
    >
      ×
    </button>
  </div>
</template>

<style scoped>
.weapon-info-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 4px 4px 0 0;
  height: 30px;
  position: relative;
}

.weapon-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-heading);
}

.weapon-dps {
  font-size: 0.9rem;
  font-weight: bold;
  font-family: monospace;
  color: var(--color-text);
  margin-left: auto;
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
}

.remove-button:hover {
  background: #ff4444;
  color: white;
}
</style>
