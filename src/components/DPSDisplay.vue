<script setup lang="ts">
import type { Weapon, CharacterStats } from '@/data/types'
import { calculateDPS } from '@/services/calculations'

interface Props {
  weapon: Weapon
  characterStats: CharacterStats
}

const props = defineProps<Props>()

const dps = calculateDPS(
  props.weapon.baseDmg,
  props.weapon.fireRate,
  props.weapon.reloadTime,
  props.weapon.clipSize,
  props.characterStats.critChance,
  props.characterStats.critDamage
)
</script>

<template>
  <div class="current-dps">
    <div class="dps-label">Current DPS</div>
    <div class="dps-value">{{ dps }}</div>
  </div>
</template>

<style scoped>
.current-dps {
  width: 120px;
  text-align: center;
}

.dps-label {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.dps-value {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: monospace;
}
</style>
