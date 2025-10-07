<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { ClassMod, Class } from '@/data/types'

interface Props {
  classMods: ClassMod[]
  selectedClassMod: ClassMod | null
}

interface Emits {
  (e: 'update:selectedClassMod', value: ClassMod): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Initialize with first class mod on mount
onMounted(() => {
  if (!props.selectedClassMod && props.classMods.length > 0) {
    emit('update:selectedClassMod', props.classMods[0])
  }
})

// Get unique classes
const classes = computed(() => {
  const uniqueClasses = new Set(props.classMods.map(mod => mod.class))
  return Array.from(uniqueClasses)
})

// Get selected class
const selectedClass = computed(() => props.selectedClassMod?.class || null)

// Get class mods for selected class
const availableMods = computed(() => {
  if (!selectedClass.value) return []
  return props.classMods.filter(mod => mod.class === selectedClass.value)
})

function selectClass(event: Event) {
  const target = event.target as HTMLSelectElement
  const className = target.value as Class
  // Select the first mod for this class
  const firstMod = props.classMods.find(mod => mod.class === className)
  if (firstMod) {
    emit('update:selectedClassMod', firstMod)
  }
}

function selectModByName(event: Event) {
  const target = event.target as HTMLSelectElement
  const modName = target.value
  const mod = props.classMods.find(m => m.name === modName)
  if (mod) {
    emit('update:selectedClassMod', mod)
  }
}
</script>

<template>
  <div class="class-mod-selector">
    <div class="selector-section">
      <label for="class-select" class="selector-label">Class:</label>
      <select
        id="class-select"
        :value="selectedClass || ''"
        @change="selectClass"
        class="selector-dropdown"
      >
        <option v-for="className in classes" :key="className" :value="className">
          {{ className }}
        </option>
      </select>
    </div>

    <div v-if="selectedClass" class="selector-section">
      <label for="mod-select" class="selector-label">Class Mod:</label>
      <select
        id="mod-select"
        :value="selectedClassMod?.name || ''"
        @change="selectModByName"
        class="selector-dropdown"
      >
        <option value="" disabled>Select a class mod</option>
        <option v-for="mod in availableMods" :key="mod.name" :value="mod.name">
          {{ mod.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.class-mod-selector {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  align-items: center;
}

.selector-section {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
}

.selector-label {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
}

.selector-dropdown {
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--color-border-hover);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
  font-size: 0.85rem;
  cursor: pointer;
  text-transform: capitalize;
  min-width: 120px;
}

.selector-dropdown:hover {
  border-color: var(--color-border);
}

.selector-dropdown:focus {
  outline: 2px solid var(--color-heading);
  outline-offset: 1px;
}
</style>
