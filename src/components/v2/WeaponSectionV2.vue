<script setup lang="ts">
import type { Weapon, CharacterStats, Upgrade, Rarity } from '@/data/types'
import WeaponStatsV2 from './WeaponStatsV2.vue'
import UpgradeTableV2 from './UpgradeTableV2.vue'
import EmptyWeaponSlotV2 from './EmptyWeaponSlotV2.vue'

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
        <WeaponStatsV2
          :weapon="weapon"
          :current-d-p-s="getCurrentDPS(weapon)"
          :removable="slotIndex !== 0"
          @remove="emit('removeWeapon')"
        />
        <UpgradeTableV2
          :upgrades="upgrades"
          :weapon="weapon"
          :character-stats="characterStats"
          :get-upgraded-d-p-s="getUpgradedDPS"
        />
      </div>
    </template>
    <EmptyWeaponSlotV2
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
