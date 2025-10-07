<script setup lang="ts">
import ClassModSelector from '@/components/ClassModSelector.vue'
import type { ClassMod } from '@/data/types'

interface Props {
  classMods: ClassMod[]
  selectedClassMod: ClassMod | null
}

defineProps<Props>()

interface Emits {
  (e: 'update:selectedClassMod', value: ClassMod): void
}

const emit = defineEmits<Emits>()

const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const
</script>

<template>
  <div class="header-row">
    <!-- Class Selector spanning weapon-card and DPS display width -->
    <div class="class-selector-container">
      <ClassModSelector
        :class-mods="classMods"
        :selected-class-mod="selectedClassMod"
        @update:selected-class-mod="emit('update:selectedClassMod', $event)"
      />
    </div>

    <!-- Rarity headers matching UpgradeTable -->
    <div class="upgrade-table-header">
      <table>
        <thead>
          <tr>
            <th class="upgrade-type-header">Upgrade Type</th>
            <th
              v-for="rarity in rarities"
              :key="rarity"
              class="rarity-header"
              :class="`rarity-${rarity}`"
            >
              {{ rarity }}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<style scoped>
.header-row {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 0;
}

.class-selector-container {
  /* Span weapon card (300px) + gap (2rem) + DPS (120px) */
  width: calc(300px + 2rem + 120px);
  min-width: calc(300px + 2rem + 120px);
  max-width: calc(300px + 2rem + 120px);
}

/* No spacer needed since class selector spans both areas */

.upgrade-table-header {
  flex: 1;
}

.upgrade-table-header table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.upgrade-table-header th {
  padding: 0.5rem;
  border: 1px solid var(--color-border-hover);
  text-align: center;
  background: var(--color-background-soft);
  font-weight: bold;
}

.upgrade-type-header {
  text-align: center;
  width: 140px;
  min-width: 140px;
  max-width: 140px;
}

.rarity-header {
  text-transform: capitalize;
  width: 95px;
  min-width: 95px;
  max-width: 95px;
}

/* Rarity colors */
.rarity-common {
  color: var(--rarity-common);
}

.rarity-uncommon {
  color: var(--rarity-uncommon);
}

.rarity-rare {
  color: var(--rarity-rare);
}

.rarity-epic {
  color: var(--rarity-epic);
}

.rarity-legendary {
  color: var(--rarity-legendary);
}
</style>
