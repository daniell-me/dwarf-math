<script setup lang="ts">
const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const
</script>

<template>
  <div class="rarity-header-row">
    <!-- Spacer matching weapon-card-container -->
    <div class="weapon-spacer"></div>

    <!-- Spacer matching current-dps -->
    <div class="dps-spacer"></div>

    <!-- Table structure matching UpgradeTable -->
    <div class="upgrade-table-header">
      <table>
        <thead>
          <tr>
            <th class="upgrade-type-header">Upgrade Type</th>
            <th
              v-for="rarity in rarities"
              :key="rarity"
              class="rarity-header"
              :class="`rarity-${rarity}`"
            >
              {{ rarity }}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<style scoped>
.rarity-header-row {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: flex-start;
  padding: 1.5rem;
  margin-bottom: 0;
}

.weapon-spacer {
  width: 300px;
  min-width: 300px;
  max-width: 300px;
}

.dps-spacer {
  width: 120px;
}

.upgrade-table-header {
  flex: 1;
  min-width: 600px;
}

.upgrade-table-header table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.upgrade-table-header th {
  padding: 0.5rem;
  border: 1px solid var(--color-border-hover);
  text-align: center;
  background: var(--color-background-soft);
  font-weight: bold;
}

.upgrade-type-header {
  text-align: center;
  width: 140px;
  min-width: 140px;
  max-width: 140px;
}

.rarity-header {
  text-transform: capitalize;
  width: 95px;
  min-width: 95px;
  max-width: 95px;
}

/* Rarity colors */
.rarity-common {
  color: var(--rarity-common);
}

.rarity-uncommon {
  color: var(--rarity-uncommon);
}

.rarity-rare {
  color: var(--rarity-rare);
}

.rarity-epic {
  color: var(--rarity-epic);
}

.rarity-legendary {
  color: var(--rarity-legendary);
}
</style>
