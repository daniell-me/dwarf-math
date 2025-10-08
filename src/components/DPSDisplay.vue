<script setup lang="ts">
import { computed } from 'vue'
import type { Weapon, CharacterStats } from '@/data/types'
import { calculateDPS } from '@/services/calculations'

interface Props {
  weapon: Weapon
  characterStats: CharacterStats
}

const props = defineProps<Props>()

const dps = computed(() => {
  // Apply character stat bonuses to weapon stats
  // damage and reloadSpeed are multipliers (1.0 = no bonus, 1.5 = 50% bonus)
  const damageMultiplier = props.characterStats.damage ?? 1.0
  const reloadSpeedMultiplier = props.characterStats.reloadSpeed ?? 1.0

  const modifiedDamage = props.weapon.baseDmg * damageMultiplier
  // Reload speed bonus reduces reload time (higher multiplier = faster reload = lower time)
  const modifiedReloadTime = props.weapon.reloadTime / reloadSpeedMultiplier

  return calculateDPS(
    modifiedDamage,
    props.weapon.fireRate,
    modifiedReloadTime,
    props.weapon.clipSize,
    props.characterStats.critChance,
    props.characterStats.critDamage
  )
})
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
