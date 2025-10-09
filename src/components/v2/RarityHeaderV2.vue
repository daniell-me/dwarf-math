<script setup lang="ts">
import { rarities } from '@/data/types'
</script>

<template>
  <div class="weapon-list-header">
    <div class="rarity-header-row">
      <div class="weapon-stats-spacer">
        <h2>Weapon Upgrades</h2>
      </div>
      <div class="rarity-headers-wrapper">
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.weapon-list-header {
  margin-bottom: 0.5rem;
}

h2 {
  margin: 0;
  font-size: 1.2rem;
}

.rarity-header-row {
  display: flex;
  gap: var(--weapon-stats-gap);
}

.weapon-stats-spacer {
  width: var(--weapon-stats-width);
  flex-shrink: 0;
}

.rarity-headers-wrapper {
  flex: 1;
}

.rarity-headers-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 0.85rem;
}

.rarity-headers-table th {
  padding: 0.3rem 0.4rem;
  border: 1px solid var(--color-border);
  text-align: center;
}

.upgrade-name-spacer {
  text-align: left !important;
  font-size: 0.8rem;
  font-weight: 600;
  background: var(--color-background-soft);
  width: var(--upgrade-name-width);
  white-space: nowrap;
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
</style>
