<script setup lang="ts">
import { computed, watch } from 'vue'
import type { ClassMod } from '@/data/types'
import ClassSelectionModal from './ClassSelectionModal.vue'

interface Props {
  classMods: ClassMod[]
  selectedClassMod: ClassMod | null
  showClassModal: boolean
}

interface Emits {
  (e: 'update:selectedClassMod', value: ClassMod): void
  (e: 'update:showClassModal', value: boolean): void
  (e: 'openMetaUpgrades'): void
  (e: 'openGear'): void
  (e: 'startNewDive'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Debug watcher
watch(() => props.showClassModal, (newValue, oldValue) => {
  console.log('HeaderV2: showClassModal prop changed from', oldValue, 'to', newValue)
})

const buttonText = computed(() => {
  if (props.selectedClassMod) {
    return `${props.selectedClassMod.class} - ${props.selectedClassMod.name}`
  }
  return 'Select Class'
})

function selectClassMod(mod: ClassMod) {
  emit('update:selectedClassMod', mod)
}

function openClassModal() {
  emit('update:showClassModal', true)
}

function closeClassModal() {
  emit('update:showClassModal', false)
}

function handleStartNewDive() {
  console.log('HeaderV2: handleStartNewDive called')
  emit('startNewDive')
  console.log('HeaderV2: startNewDive emitted')
}
</script>

<template>
  <header class="header-v2">
    <div class="left-section">
      <button @click="openClassModal" class="header-button class-button">
        {{ buttonText }}
      </button>
    </div>

    <div class="center-section">
      <button @click="handleStartNewDive" class="header-button new-dive-button">
        Start New Dive
      </button>
    </div>

    <div class="right-section">
      <button @click="emit('openGear')" class="header-button">
        Gear
      </button>
      <button @click="emit('openMetaUpgrades')" class="header-button">
        Meta Upgrades
      </button>
    </div>

    <ClassSelectionModal
      v-if="showClassModal"
      :class-mods="classMods"
      @select="selectClassMod"
      @close="closeClassModal"
    />
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

.class-button {
  width: 250px;
  text-align: left;
}

.new-dive-button {
  font-weight: 600;
}
</style>
