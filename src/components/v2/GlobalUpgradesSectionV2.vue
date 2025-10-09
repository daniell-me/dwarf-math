<script setup lang="ts">
// TODO: Add global upgrades data and types
// import type { CharacterStats } from '@/data/types'
// import UpgradeTableV2 from './UpgradeTableV2.vue'

// interface Props {
//   globalUpgrades: GlobalUpgrade[]
//   characterStats: CharacterStats | null
// }

// defineProps<Props>()
</script>

<template>
  <div class="global-upgrades-section">
    <div class="placeholder">
      <p>Global Upgrades</p>
      <p class="note">Data not yet available</p>
    </div>
    <!-- TODO: Replace with UpgradeTableV2 when data is ready -->
  </div>
</template>

<style scoped>
.global-upgrades-section {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.placeholder {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  color: var(--color-text-muted);
}

.placeholder p {
  margin: 0;
}

.note {
  font-size: 0.85rem;
  font-style: italic;
}
</style>
