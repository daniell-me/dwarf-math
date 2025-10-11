<script setup lang="ts">
import { useSelectedUpgradesStore } from '@/stores/selectedUpgrades'
import type { Weapon, CharacterStats, Upgrade, Rarity } from '@/data/types'
import { rarities } from '@/data/types'
import { getUpgradeValue } from '@/utils/weaponFunctions'

interface Props {
  upgrades: Upgrade[]
  weapon: Weapon | null
  characterStats: CharacterStats
  getUpgradedDPS: (weapon: Weapon, upgrade: Upgrade, rarity: Rarity) => number | null
}

const props = defineProps<Props>()
const selectedUpgradesStore = useSelectedUpgradesStore()

function formatStatName(stat: string): string {
  // Convert camelCase to Title Case with spaces
  return stat
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

function handleCellClick(upgrade: Upgrade, rarity: Rarity, event: MouseEvent) {
  if (!props.weapon) return

  const value = getUpgradeValue(upgrade, rarity)
  if (value === undefined) return

  // Shift+click to remove one
  if (event.shiftKey) {
    selectedUpgradesStore.removeOneUpgrade(props.weapon.id, upgrade.name, rarity)
  } else {
    // Regular click to add one
    selectedUpgradesStore.addUpgrade(props.weapon.id, upgrade.name, rarity, value)
  }
}

function getUpgradeCount(upgradeName: string, rarity: Rarity): number {
  if (!props.weapon) return 0
  return selectedUpgradesStore.getUpgradeCount(props.weapon.id, upgradeName, rarity)
}
</script>

<template>
  <div class="upgrade-table">
    <table>
      <tbody>
        <tr v-for="upgrade in upgrades" :key="upgrade.name">
          <td class="upgrade-name">{{ formatStatName(upgrade.stat) }}</td>
          <td
            v-for="rarity in rarities"
            :key="rarity"
            class="dps-cell"
            :class="{ selected: getUpgradeCount(upgrade.name, rarity) > 0 }"
            @click="weapon && handleCellClick(upgrade, rarity, $event)"
          >
            <span class="dps-value">{{ weapon ? (getUpgradedDPS(weapon, upgrade, rarity) || '-') : '-' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.upgrade-table {
  width: 100%;
}

.upgrade-table table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 0.85rem;
}

.upgrade-table td {
  padding: 0.3rem 0.4rem;
  border: 1px solid var(--color-border);
  text-align: center;
}

.upgrade-name {
  text-align: left !important;
  font-weight: 500;
  font-size: 0.85rem;
  width: var(--upgrade-name-width);
  white-space: nowrap;
}

.dps-cell {
  font-family: monospace;
  background: var(--color-background);
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.8rem;
  width: calc((100% - var(--upgrade-name-width)) / 5);
}

.dps-cell:hover {
  background: var(--color-background-soft);
}

.dps-cell.selected {
  background: var(--vt-c-green);
  color: white;
  font-weight: bold;
}

.dps-cell.selected:hover {
  background: hsla(160, 100%, 32%, 1);
}

.dps-value {
  display: block;
  width: 100%;
}
</style>
