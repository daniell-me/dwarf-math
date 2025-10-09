<script setup lang="ts">
import { useSelectedUpgradesStore } from '@/stores/selectedUpgrades'
import type { Weapon, CharacterStats, Upgrade, Rarity } from '@/data/types'

interface Props {
  weapon: Weapon
  characterStats: CharacterStats
  upgrades: Upgrade[]
  getUpgradedDPS: (weapon: Weapon, upgrade: Upgrade, rarity: keyof Upgrade['values']) => number | null
}

const props = defineProps<Props>()
const selectedUpgradesStore = useSelectedUpgradesStore()

const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const

function handleCellClick(upgrade: Upgrade, rarity: Rarity, event: MouseEvent) {
  const value = upgrade.values[rarity]
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
  return selectedUpgradesStore.getUpgradeCount(props.weapon.id, upgradeName, rarity)
}
</script>

<template>
  <div class="upgrade-table">
    <table>
      <tbody>
        <tr v-for="upgrade in upgrades" :key="upgrade.name">
          <td class="upgrade-type">{{ upgrade.name }}</td>
          <td
            v-for="rarity in rarities"
            :key="rarity"
            class="dps-cell"
            :class="{ selected: getUpgradeCount(upgrade.name, rarity) > 0 }"
            @click="handleCellClick(upgrade, rarity, $event)"
          >
            <div class="cell-content">
              <span class="dps-value">{{ getUpgradedDPS(weapon, upgrade, rarity) || '-' }}</span>
              <span v-if="getUpgradeCount(upgrade.name, rarity) > 0" class="count-badge">
                {{ getUpgradeCount(upgrade.name, rarity) }}
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.upgrade-table {
  flex: 1;
  min-width: 600px;
}

.upgrade-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.upgrade-table th,
.upgrade-table td {
  padding: 0.5rem;
  border: 1px solid var(--color-border-hover);
  text-align: center;
}

.upgrade-type {
  text-align: left !important;
  font-weight: 500;
  width: 140px;
  min-width: 140px;
  max-width: 140px;
}

.dps-cell {
  font-family: monospace;
  background: var(--color-background);
  width: 95px;
  min-width: 95px;
  max-width: 95px;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 0.25rem 0.5rem;
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

.cell-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.dps-value {
  flex: 1;
}

.count-badge {
  background: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 0.125rem 0.375rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: bold;
  min-width: 1.5rem;
  text-align: center;
}
</style>
