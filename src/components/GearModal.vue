<template>
  <div class="gear-overlay" @click.self="$emit('close')">
    <div class="gear-panel">
      <div class="panel-header">
        <h2>Gear Bonuses</h2>
        <button @click="handleReset" class="reset-button">Reset All</button>
        <button @click="$emit('close')" class="close-button">×</button>
      </div>

      <div class="gear-content">
        <div class="stat-section">
          <h3>Flat Bonuses</h3>
          <div class="stat-grid">
            <div class="stat-item">
              <label for="flat-health">Max Health</label>
              <input
                id="flat-health"
                type="number"
                v-model.number="localFlatBonuses.health"
                @input="emitUpdate"
                placeholder="0"
              />
            </div>
            <div class="stat-item">
              <label for="flat-armor">Armor</label>
              <input
                id="flat-armor"
                type="number"
                v-model.number="localFlatBonuses.armor"
                @input="emitUpdate"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div class="stat-section">
          <h3>Percentage Bonuses</h3>
          <p class="help-text">Enter percentages as decimals (e.g., 0.10 for 10%)</p>
          <div class="stat-grid">
            <div class="stat-item">
              <label for="percent-damage">Damage</label>
              <input
                id="percent-damage"
                type="number"
                step="0.01"
                v-model.number="localPercentBonuses.damage"
                @input="emitUpdate"
                placeholder="0.00"
              />
            </div>
            <div class="stat-item">
              <label for="percent-reload">Reload Speed</label>
              <input
                id="percent-reload"
                type="number"
                step="0.01"
                v-model.number="localPercentBonuses.reloadSpeed"
                @input="emitUpdate"
                placeholder="0.00"
              />
            </div>
            <div class="stat-item">
              <label for="percent-crit-chance">Crit Chance</label>
              <input
                id="percent-crit-chance"
                type="number"
                step="0.01"
                v-model.number="localPercentBonuses.critChance"
                @input="emitUpdate"
                placeholder="0.00"
              />
            </div>
            <div class="stat-item">
              <label for="percent-crit-damage">Crit Damage</label>
              <input
                id="percent-crit-damage"
                type="number"
                step="0.01"
                v-model.number="localPercentBonuses.critDamage"
                @input="emitUpdate"
                placeholder="0.00"
              />
            </div>
            <div class="stat-item">
              <label for="percent-dodge">Dodge Chance</label>
              <input
                id="percent-dodge"
                type="number"
                step="0.01"
                v-model.number="localPercentBonuses.dodgeChance"
                @input="emitUpdate"
                placeholder="0.00"
              />
            </div>
            <div class="stat-item">
              <label for="percent-move-speed">Move Speed</label>
              <input
                id="percent-move-speed"
                type="number"
                step="0.01"
                v-model.number="localPercentBonuses.moveSpeed"
                @input="emitUpdate"
                placeholder="0.00"
              />
            </div>
            <div class="stat-item">
              <label for="percent-mining-speed">Mining Speed</label>
              <input
                id="percent-mining-speed"
                type="number"
                step="0.01"
                v-model.number="localPercentBonuses.miningSpeed"
                @input="emitUpdate"
                placeholder="0.00"
              />
            </div>
            <div class="stat-item">
              <label for="percent-xp-gain">XP Gain</label>
              <input
                id="percent-xp-gain"
                type="number"
                step="0.01"
                v-model.number="localPercentBonuses.xpGain"
                @input="emitUpdate"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { CharacterStats } from '@/data/types'

interface Props {
  flatBonuses: Partial<CharacterStats>
  percentBonuses: Partial<CharacterStats>
}

interface Emits {
  (e: 'close'): void
  (e: 'update', flat: Partial<CharacterStats>, percent: Partial<CharacterStats>): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Local state for inputs
const localFlatBonuses = ref<Partial<CharacterStats>>({ ...props.flatBonuses })
const localPercentBonuses = ref<Partial<CharacterStats>>({ ...props.percentBonuses })

// Watch for external changes
watch(() => props.flatBonuses, (newValue) => {
  localFlatBonuses.value = { ...newValue }
}, { deep: true })

watch(() => props.percentBonuses, (newValue) => {
  localPercentBonuses.value = { ...newValue }
}, { deep: true })

function emitUpdate() {
  // Clean up undefined/null values and convert empty strings to undefined
  const cleanFlat: Partial<CharacterStats> = {}
  const cleanPercent: Partial<CharacterStats> = {}

  for (const [key, value] of Object.entries(localFlatBonuses.value)) {
    // v-model.number can still give us empty strings, so we need to check for that
    if (value !== undefined && value !== null && (value as any) !== '' && !Number.isNaN(value as number)) {
      cleanFlat[key as keyof CharacterStats] = value as any
    }
  }

  for (const [key, value] of Object.entries(localPercentBonuses.value)) {
    // v-model.number can still give us empty strings, so we need to check for that
    if (value !== undefined && value !== null && (value as any) !== '' && !Number.isNaN(value as number)) {
      cleanPercent[key as keyof CharacterStats] = value as any
    }
  }

  emit('update', cleanFlat, cleanPercent)
}

function handleReset() {
  localFlatBonuses.value = {}
  localPercentBonuses.value = {}
  emitUpdate()
}
</script>

<style scoped>
.gear-overlay {
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

.gear-panel {
  background: var(--color-background-soft);
  border: 2px solid var(--color-border);
  border-radius: 8px;
  width: 90%;
  max-width: 700px;
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

.gear-content {
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stat-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: var(--color-heading);
}

.help-text {
  margin: 0 0 1rem 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  font-style: italic;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-item label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.stat-item input {
  padding: 0.5rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-text);
  font-size: 0.95rem;
  font-family: monospace;
}

.stat-item input:focus {
  outline: none;
  border-color: var(--color-border-hover);
  background: var(--color-background-mute);
}

.stat-item input::placeholder {
  color: var(--color-text-muted);
  opacity: 0.5;
}
</style>
