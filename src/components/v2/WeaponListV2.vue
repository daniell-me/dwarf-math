<script setup lang="ts">
import type { Weapon, CharacterStats, Upgrade, Rarity } from '@/data/types'
import RarityHeaderV2 from './RarityHeaderV2.vue'
import WeaponSectionV2 from './WeaponSectionV2.vue'

interface Props {
  weapons: (Weapon | null)[]
  characterStats: CharacterStats | null
  getAvailableWeapons: (index: number) => Weapon[]
  getValidUpgrades: (weapon: Weapon) => Upgrade[]
  getUpgradedDPS: (weapon: Weapon, upgrade: Upgrade, rarity: Rarity) => number | null
  getCurrentDPS: (weapon: Weapon) => number
}

interface Emits {
  (e: 'selectWeapon', index: number, weapon: Weapon): void
  (e: 'removeWeapon', index: number): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="weapon-list">
    <RarityHeaderV2 />
    <WeaponSectionV2
      v-for="(weapon, index) in weapons"
      :key="index"
      :weapon="weapon"
      :slot-index="index"
      :character-stats="characterStats"
      :available-weapons="getAvailableWeapons(index)"
      :upgrades="weapon ? getValidUpgrades(weapon) : []"
      :get-upgraded-d-p-s="getUpgradedDPS"
      :get-current-d-p-s="getCurrentDPS"
      @select-weapon="emit('selectWeapon', index, $event)"
      @remove-weapon="emit('removeWeapon', index)"
    />
  </div>
</template>

<style scoped>
.weapon-list {
  /* Shared dimensions for all child components */
  --weapon-stats-width: 220px;
  --weapon-stats-gap: 1rem;
  --upgrade-name-width: 140px;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
