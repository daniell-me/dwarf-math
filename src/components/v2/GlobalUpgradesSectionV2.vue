<script setup lang="ts">
import { computed } from 'vue'
import type { Upgrade, Weapon, WeaponTag } from '@/data/types'
import GlobalUpgradeTableV2 from './GlobalUpgradeTableV2.vue'

interface Props {
  tagUpgrades: Upgrade[]
  playerUpgrades: Upgrade[]
  equippedWeapons: (Weapon | null)[]
}

const props = defineProps<Props>()

// Get all unique tags from equipped weapons
const equippedWeaponTags = computed<Set<WeaponTag>>(() => {
  const tags = new Set<WeaponTag>()
  props.equippedWeapons.forEach(weapon => {
    if (weapon) {
      weapon.tags.forEach(tag => tags.add(tag))
    }
  })
  return tags
})

// Filter tag upgrades to only show ones that match equipped weapon tags (or apply to all weapons)
const visibleTagUpgrades = computed<Upgrade[]>(() => {
  return props.tagUpgrades.filter(upgrade => {
    if (upgrade.tags.length === 0 || upgrade.tags.includes('all' as WeaponTag)) {
      return true
    }
    return upgrade.tags.some(tag => equippedWeaponTags.value.has(tag))
  })
})
</script>

<template>
  <div class="global-upgrades-section">
    <GlobalUpgradeTableV2
      v-if="visibleTagUpgrades.length > 0 || playerUpgrades.length > 0"
      :tag-upgrades="visibleTagUpgrades"
      :player-upgrades="playerUpgrades"
    />
    <div v-else class="empty-state">
      <p>No upgrades available</p>
      <p class="note">Equip weapons to unlock tag upgrades</p>
    </div>
  </div>
</template>

<style scoped>
.global-upgrades-section {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.empty-state {
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

.empty-state p {
  margin: 0;
}

.note {
  font-size: 0.85rem;
  font-style: italic;
}
</style>
