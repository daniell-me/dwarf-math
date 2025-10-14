<script setup lang="ts">
import { computed } from 'vue'
import type { ClassMod, Class } from '@/data/types'
import { Class as ClassEnum } from '@/data/types'
import { weaponsMap } from '@/data/weapons'

interface Props {
  classMods: ClassMod[]
}

interface Emits {
  (e: 'select', value: ClassMod): void
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Group class mods by class
const classGroups = computed(() => {
  const groups: Record<Class, ClassMod[]> = {
    [ClassEnum.scout]: [],
    [ClassEnum.gunner]: [],
    [ClassEnum.engineer]: [],
    [ClassEnum.driller]: []
  }

  props.classMods.forEach(mod => {
    groups[mod.class].push(mod)
  })

  return groups
})

const classes = [ClassEnum.scout, ClassEnum.gunner, ClassEnum.engineer, ClassEnum.driller]

function selectClassMod(mod: ClassMod) {
  emit('select', mod)
  emit('close')
}

function formatStatMultipliers(mod: ClassMod): string[] {
  if (!mod.statMultipliers) return []

  return Object.entries(mod.statMultipliers).map(([stat, value]) => {
    const isPercentage = stat !== 'armor' && stat !== 'health' // armor is flat
    const sign = value > 0 ? '+' : ''
    if (isPercentage) {
      return `${sign}${(value * 100).toFixed(0)}% ${formatStatName(stat)}`
    } else {
      return `${sign}${value} ${formatStatName(stat)}`
    }
  })
}

function formatStatName(stat: string): string {
  // Convert camelCase to Title Case with spaces
  return stat
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

function formatWeaponTags(tags: string[]): string {
  if (tags.length === 0) return 'None'
  return tags.map(tag =>
    tag.charAt(0).toUpperCase() + tag.slice(1)
  ).join(', ')
}

function getWeaponName(weaponId: string): string {
  const weapon = weaponsMap[weaponId]
  return weapon ? weapon.name : weaponId
}
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Select Class</h2>
        <button @click="emit('close')" class="close-button">&times;</button>
      </div>

      <div class="class-container">
        <div class="class-grid">
          <div v-for="className in classes" :key="className" class="class-section">
            <div class="class-header">{{ className }}</div>

            <div class="class-mods-row">
              <div
                v-for="mod in classGroups[className]"
                :key="mod.name"
                @click="selectClassMod(mod)"
                class="class-mod-card"
              >
                <h3>{{ mod.name }}</h3>

                <div class="mod-info">
                  <div class="info-section">
                    <strong>Starting Weapon:</strong>
                    <div>{{ getWeaponName(mod.startingWeaponId) }}</div>
                  </div>

                  <div class="info-section" v-if="mod.statMultipliers && Object.keys(mod.statMultipliers).length > 0">
                    <strong>Stats:</strong>
                    <div v-for="stat in formatStatMultipliers(mod)" :key="stat">
                      {{ stat }}
                    </div>
                  </div>

                  <div class="info-section">
                    <strong>Weapon Tags:</strong>
                    <div>{{ formatWeaponTags(mod.availableWeaponTags) }}</div>
                  </div>

                  <div class="info-section" v-if="mod.conditionalEffects && mod.conditionalEffects.length > 0">
                    <strong>Effects:</strong>
                    <div v-for="effect in mod.conditionalEffects" :key="effect" class="effect-text">
                      {{ effect }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
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

.modal-content {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  width: 90vw;
  max-width: 1400px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--color-text);
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.close-button:hover {
  color: var(--color-border-hover);
}

.class-container {
  padding: 1.5rem;
  overflow-y: auto;
}

.class-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.class-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.class-header {
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  padding: 0.5rem;
  background: var(--color-background-soft);
  border-radius: 4px;
  border: 1px solid var(--color-border);
}

.class-mods-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.class-mod-card {
  background: var(--color-background-soft);
  border: 2px solid var(--color-border);
  border-radius: 6px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.class-mod-card:hover {
  border-color: var(--color-border-hover);
  background: var(--color-background-mute);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.class-mod-card h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  color: var(--color-heading);
}

.mod-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-section strong {
  color: var(--color-heading);
  font-size: 0.8rem;
}

.info-section > div {
  color: var(--color-text-muted);
  line-height: 1.4;
}

.effect-text {
  font-style: italic;
  color: var(--color-text-muted);
  font-size: 0.8rem;
}
</style>
