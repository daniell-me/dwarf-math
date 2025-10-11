<script setup lang="ts">
import { useGlobalUpgradesStore } from '@/stores/globalUpgrades'
import type { Upgrade, Rarity } from '@/data/types'
import { rarities } from '@/data/types'

interface Props {
  tagUpgrades: Upgrade[]
  playerUpgrades: Upgrade[]
}

const props = defineProps<Props>()
const globalUpgradesStore = useGlobalUpgradesStore()

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

function getUpgradeValue(upgrade: Upgrade, rarity: Rarity): number | null {
  if (Array.isArray(upgrade.values)) {
    const rarityIndex = rarities.indexOf(rarity)
    return upgrade.values[rarityIndex]
  }
  // Backwards compatibility with old format
  return upgrade.values[rarity] ?? null
}

function formatUpgradeValue(upgrade: Upgrade, rarity: Rarity): string {
  const value = getUpgradeValue(upgrade, rarity)

  if (value === null || value === undefined) {
    return '-'
  }

  // Flat values (armor, max health)
  if (upgrade.stat === 'armor' || upgrade.stat === 'maxHealth') {
    return `+${value}`
  }

  // Percentage values
  return `+${(value * 100).toFixed(0)}%`
}

function handleCellClick(upgrade: Upgrade, rarity: Rarity, event: MouseEvent) {
  const value = getUpgradeValue(upgrade, rarity)
  if (value === null || value === undefined) return

  // Add pulse animation
  const target = event.currentTarget as HTMLElement
  target.classList.add('pulse')
  setTimeout(() => target.classList.remove('pulse'), 300)

  // Shift+click to remove one
  if (event.shiftKey) {
    globalUpgradesStore.removeOneUpgrade(upgrade.name, upgrade.tags, rarity)
  } else {
    // Regular click to add one
    globalUpgradesStore.addUpgrade(upgrade.name, upgrade.tags, rarity, value)
  }
}

function getUpgradeKey(upgrade: Upgrade): string {
  return upgrade.tags && upgrade.tags.length > 0
    ? `${upgrade.name}-${upgrade.tags.join(',')}`
    : upgrade.name
}

function getUpgradeTooltip(upgrade: Upgrade): string {
  return upgrade.description
    ? `${upgrade.name} - ${upgrade.description}`
    : upgrade.name
}
</script>

<template>
  <div class="global-upgrade-table">
    <!-- Tag Upgrades Section -->
    <div v-if="tagUpgrades.length > 0" class="upgrade-section">
      <h3 class="section-title">Tag Upgrades</h3>
      <table class="rarity-headers-table">
        <thead>
          <tr>
            <th class="upgrade-name-spacer">Upgrade</th>
            <th
              v-for="rarity in rarities"
              :key="rarity"
              class="rarity-header"
              :class="`rarity-${rarity}`"
            >
              {{ rarity.charAt(0).toUpperCase() + rarity.slice(1) }}
            </th>
          </tr>
        </thead>
      </table>
      <table class="upgrade-table">
        <tbody>
          <tr v-for="upgrade in tagUpgrades" :key="getUpgradeKey(upgrade)">
            <td class="upgrade-name" :title="getUpgradeTooltip(upgrade)">
              {{ formatStatName(upgrade.stat) }}
              <span v-if="upgrade.tags && upgrade.tags.length > 0 && !upgrade.tags.includes('all')" class="tag-badge">
                {{ upgrade.tags[0].toUpperCase() }}
              </span>
            </td>
            <td
              v-for="rarity in rarities"
              :key="rarity"
              class="upgrade-cell"
              :class="{ disabled: getUpgradeValue(upgrade, rarity) === null }"
              @click="handleCellClick(upgrade, rarity, $event)"
            >
              <span class="upgrade-value">{{ formatUpgradeValue(upgrade, rarity) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Player Upgrades Section -->
    <div v-if="playerUpgrades.length > 0" class="upgrade-section">
      <h3 class="section-title">Player Upgrades</h3>
      <table class="rarity-headers-table">
        <thead>
          <tr>
            <th class="upgrade-name-spacer">Upgrade</th>
            <th
              v-for="rarity in rarities"
              :key="rarity"
              class="rarity-header"
              :class="`rarity-${rarity}`"
            >
              {{ rarity.charAt(0).toUpperCase() + rarity.slice(1) }}
            </th>
          </tr>
        </thead>
      </table>
      <table class="upgrade-table">
        <tbody>
          <tr v-for="upgrade in playerUpgrades" :key="getUpgradeKey(upgrade)">
            <td class="upgrade-name" :title="getUpgradeTooltip(upgrade)">
              {{ formatStatName(upgrade.stat) }}
            </td>
            <td
              v-for="rarity in rarities"
              :key="rarity"
              class="upgrade-cell"
              :class="{ disabled: getUpgradeValue(upgrade, rarity) === null }"
              @click="handleCellClick(upgrade, rarity, $event)"
            >
              <span class="upgrade-value">{{ formatUpgradeValue(upgrade, rarity) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.global-upgrade-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.upgrade-section {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 0.5rem;
}

.section-title {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

.rarity-headers-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: var(--upgrade-table-font-size);
}

.rarity-headers-table th {
  padding: var(--upgrade-table-padding);
  border: 1px solid var(--color-border);
  text-align: center;
}

.upgrade-name-spacer {
  text-align: left !important;
  font-size: var(--upgrade-cell-font-size);
  font-weight: 600;
  background: var(--color-background-soft);
  width: var(--upgrade-name-width);
  white-space: nowrap;
  min-width: var(--upgrade-name-width);
  max-width: var(--upgrade-name-width);
}

.rarity-header {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  width: calc((100% - var(--upgrade-name-width)) / 5);
}

.rarity-common {
  color: var(--rarity-common);
  font-weight: bold;
}

.rarity-uncommon {
  color: var(--rarity-uncommon);
  font-weight: bold;
}

.rarity-rare {
  color: var(--rarity-rare);
  font-weight: bold;
}

.rarity-epic {
  color: var(--rarity-epic);
  font-weight: bold;
}

.rarity-legendary {
  color: var(--rarity-legendary);
  font-weight: bold;
}

.upgrade-table {
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: help;
  width: var(--upgrade-name-width);
}

.tag-badge {
  display: inline-block;
  margin-left: 0.25rem;
  padding: 0.1rem 0.3rem;
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.upgrade-cell {
  font-family: monospace;
  background: var(--color-background);
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: var(--upgrade-cell-font-size);
  width: calc((100% - var(--upgrade-name-width)) / 5);
}

.upgrade-cell:hover:not(.disabled) {
  background: var(--color-background-soft);
}

.upgrade-cell.disabled {
  background: var(--color-background-mute);
  color: var(--color-text-muted);
  cursor: not-allowed;
  opacity: 0.5;
}

.upgrade-value {
  font-size: var(--upgrade-value-font-size);
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

.upgrade-cell.pulse {
  animation: pulse 0.3s ease-out;
}
</style>
