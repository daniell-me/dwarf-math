<script setup lang="ts">
import type { Weapon, CharacterStats, Upgrade, Rarity } from '@/data/types'
import WeaponStats from './WeaponStats.vue'
import UpgradeTable from './UpgradeTable.vue'
import EmptyWeaponSlot from './EmptyWeaponSlot.vue'

interface Props {
  weapon: Weapon | null
  slotIndex: number
  characterStats: CharacterStats | null
  availableWeapons: Weapon[]
  upgrades: Upgrade[]
  getUpgradedDPS: (weapon: Weapon, upgrade: Upgrade, rarity: Rarity) => number | null
  getCurrentDPS: (weapon: Weapon) => number
}

interface Emits {
  (e: 'selectWeapon', weapon: Weapon): void
  (e: 'removeWeapon'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="weapon-section">
    <template v-if="weapon && characterStats">
      <div class="weapon-row">
        <WeaponStats
          :weapon="weapon"
          :current-d-p-s="getCurrentDPS(weapon)"
          :removable="slotIndex !== 0"
          @remove="emit('removeWeapon')"
        />
        <UpgradeTable
          :upgrades="upgrades"
          :weapon="weapon"
          :character-stats="characterStats"
          :get-upgraded-d-p-s="getUpgradedDPS"
        />
      </div>
    </template>
    <EmptyWeaponSlot
      v-else
      :slot-index="slotIndex"
      :available-weapons="availableWeapons"
      @select-weapon="emit('selectWeapon', $event)"
    />
  </div>
</template>

<style scoped>
.weapon-section {
  margin-bottom: 0.5rem;
}

.weapon-row {
  display: flex;
  gap: var(--weapon-stats-gap);
  align-items: stretch;
}
</style>
