<template>
  <div class="selected-upgrades-panel">
    <div v-if="hasAnyUpgrades" class="weapons-list">
      <div v-for="(weapon, index) in weapons" :key="index" class="weapon-build">
        <template v-if="weapon">
          <h3 class="weapon-name">{{ weapon.name }}</h3>
          <div v-if="getWeaponUpgrades(weapon).length > 0" class="upgrades-list">
            <div
              v-for="upgrade in getWeaponUpgrades(weapon)"
              :key="`${upgrade.name}-${upgrade.rarity}`"
              class="upgrade-item"
            >
              <span class="upgrade-name">{{ formatStatName(upgrade.name) }}</span>
              <span class="upgrade-rarity" :class="`rarity-${upgrade.rarity}`">
                {{ formatRarity(upgrade.rarity) }}
              </span>
              <span class="upgrade-count">×{{ upgrade.count }}</span>
            </div>
          </div>
          <div v-else class="no-upgrades">No upgrades selected</div>
        </template>
      </div>
    </div>
    <div v-else class="no-build">
      <p>No weapons or upgrades selected</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Weapon, Rarity } from '@/data/types'
import { useSelectedUpgradesStore } from '@/stores/selectedUpgrades'

interface Props {
  weapons: (Weapon | null)[]
}

const props = defineProps<Props>()
const selectedUpgradesStore = useSelectedUpgradesStore()

interface UpgradeDisplay {
  name: string
  rarity: Rarity
  count: number
}

const hasAnyUpgrades = computed(() => {
  return props.weapons.some(weapon => weapon && getWeaponUpgrades(weapon).length > 0)
})

function getWeaponUpgrades(weapon: Weapon): UpgradeDisplay[] {
  const weaponUpgrades = selectedUpgradesStore.selectedUpgrades.filter(
    u => u.weaponId === weapon.id
  )

  // Group by upgrade name and rarity
  const grouped = new Map<string, UpgradeDisplay>()

  weaponUpgrades.forEach(upgrade => {
    const key = `${upgrade.upgradeName}-${upgrade.rarity}`
    const existing = grouped.get(key)

    if (existing) {
      existing.count++
    } else {
      grouped.set(key, {
        name: upgrade.upgradeName,
        rarity: upgrade.rarity,
        count: 1
      })
    }
  })

  return Array.from(grouped.values())
}

function formatStatName(stat: string): string {
  return stat
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

function formatRarity(rarity: Rarity): string {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1)
}
</script>

<style scoped>
.selected-upgrades-panel {
  display: flex;
  flex-direction: column;
}

.weapons-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.weapon-build {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.weapon-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.upgrades-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.upgrade-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.9rem;
}

.upgrade-name {
  flex: 1;
  font-weight: 500;
  color: var(--color-text);
}

.upgrade-rarity {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.rarity-common {
  background: var(--rarity-common);
  color: #333;
}

.rarity-uncommon {
  background: var(--rarity-uncommon);
  color: white;
}

.rarity-rare {
  background: var(--rarity-rare);
  color: white;
}

.rarity-epic {
  background: var(--rarity-epic);
  color: white;
}

.rarity-legendary {
  background: var(--rarity-legendary);
  color: white;
}

.upgrade-count {
  font-family: monospace;
  font-weight: bold;
  color: var(--color-text);
  min-width: 2rem;
  text-align: right;
}

.no-upgrades {
  padding: 1rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-style: italic;
}

.no-build {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--color-text-muted);
  font-size: 1rem;
}
</style>
