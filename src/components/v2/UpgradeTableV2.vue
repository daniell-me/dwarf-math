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
  // Special case mappings for abbreviations
  const specialCases: Record<string, string> = {
    dmg: 'Damage',
    xpGain: 'XP Gain'
  }

  if (specialCases[stat]) {
    return specialCases[stat]
  }

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

  // Add pulse animation
  const target = event.currentTarget as HTMLElement
  target.classList.add('pulse')
  setTimeout(() => target.classList.remove('pulse'), 300)

  // Shift+click to remove one
  if (event.shiftKey) {
    selectedUpgradesStore.removeOneUpgrade(props.weapon.id, upgrade.name, rarity)
  } else {
    // Regular click to add one
    selectedUpgradesStore.addUpgrade(props.weapon.id, upgrade.name, rarity, value)
  }
}

function getUpgradeTooltip(upgrade: Upgrade): string {
  return upgrade.description
    ? `${upgrade.name} - ${upgrade.description}`
    : upgrade.name
}
</script>

<template>
  <div class="upgrade-table">
    <table>
      <tbody>
        <tr v-for="upgrade in upgrades" :key="upgrade.name">
          <td class="upgrade-name" :title="getUpgradeTooltip(upgrade)">{{ formatStatName(upgrade.stat) }}</td>
          <td
            v-for="rarity in rarities"
            :key="rarity"
            class="dps-cell"
            :class="{
              disabled: !weapon || !getUpgradedDPS(weapon, upgrade, rarity)
            }"
            @click="weapon && getUpgradedDPS(weapon, upgrade, rarity) && handleCellClick(upgrade, rarity, $event)"
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
  font-size: var(--upgrade-table-font-size);
}

.upgrade-table td {
  padding: var(--upgrade-table-padding);
  border: 1px solid var(--color-border);
  text-align: center;
}

.upgrade-name {
  text-align: left !important;
  font-weight: 500;
  font-size: var(--upgrade-name-font-size);
  width: var(--upgrade-name-width);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: help;
}

.dps-cell {
  font-family: monospace;
  background: var(--color-background);
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: var(--upgrade-cell-font-size);
  width: calc((100% - var(--upgrade-name-width)) / 5);
}

.dps-cell:hover:not(.disabled) {
  background: var(--color-background-soft);
}

.dps-cell.disabled {
  background: var(--color-background-mute);
  color: var(--color-text-muted);
  cursor: not-allowed;
  opacity: 0.5;
}

.dps-value {
  display: block;
  width: 100%;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    background: var(--color-background-soft);
  }
  50% {
    transform: scale(1.05);
    background: var(--vt-c-green-soft);
  }
  100% {
    transform: scale(1);
    background: var(--color-background);
  }
}

.dps-cell.pulse {
  animation: pulse 0.3s ease-out;
}
</style>
