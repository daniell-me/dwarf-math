<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { ClassMod, Class } from '@/data/types'

interface Props {
  classMods: ClassMod[]
  selectedClassMod: ClassMod | null
}

interface Emits {
  (e: 'update:selectedClassMod', value: ClassMod): void
  (e: 'openMetaUpgrades'): void
  (e: 'startNewDive'): void
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
  <header class="header-v2">
    <div class="left-section">
      <select
        :value="selectedClass || ''"
        @change="selectClass"
        class="class-select"
      >
        <option v-for="className in classes" :key="className" :value="className">
          {{ className }}
        </option>
      </select>

      <select
        v-if="selectedClass"
        :value="selectedClassMod?.name || ''"
        @change="selectModByName"
        class="mod-select"
      >
        <option value="" disabled>Select class mod</option>
        <option v-for="mod in availableMods" :key="mod.name" :value="mod.name">
          {{ mod.name }}
        </option>
      </select>
    </div>

    <div class="center-section">
      <button @click="emit('startNewDive')" class="header-button new-dive-button">
        Start New Dive
      </button>
    </div>

    <div class="right-section">
      <button @click="emit('openMetaUpgrades')" class="header-button">
        Meta Upgrades
      </button>
    </div>
  </header>
</template>

<style scoped>
.header-v2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
  height: 50px;
  min-height: 50px;
}

.left-section,
.center-section,
.right-section {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex: 1;
}

.left-section {
  justify-content: flex-start;
}

.center-section {
  justify-content: center;
}

.right-section {
  justify-content: flex-end;
}

.class-select,
.mod-select {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
  font-size: 0.9rem;
  cursor: pointer;
}

.class-select:hover,
.mod-select:hover {
  border-color: var(--color-border-hover);
}

.header-button {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
  font-size: 0.9rem;
  cursor: pointer;
}

.header-button:hover {
  background: var(--color-background-mute);
}

.new-dive-button {
  font-weight: 600;
}
</style>
