<script setup lang="ts">
import type { Weapon } from '@/data/types'

interface Props {
  slotIndex: number
  availableWeapons: Weapon[]
}

interface Emits {
  (e: 'selectWeapon', weapon: Weapon): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function handleSelection(event: Event) {
  const target = event.target as HTMLSelectElement
  const weaponName = target.value
  if (!weaponName) return

  const weapon = props.availableWeapons.find(w => w.name === weaponName)
  if (weapon) {
    emit('selectWeapon', weapon)
  }
}
</script>

<template>
  <div class="empty-weapon-slot">
    <span class="slot-label">Slot {{ slotIndex + 1 }}:</span>
    <select @change="handleSelection" class="weapon-select">
      <option value="">+ Add Weapon</option>
      <option v-for="weapon in availableWeapons" :key="weapon.id" :value="weapon.name">
        {{ weapon.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.empty-weapon-slot {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--color-background-mute);
  border: 1px dashed var(--color-border);
  border-radius: 4px;
  height: 30px;
}

.slot-label {
  font-size: 0.9rem;
  color: var(--color-text);
  font-weight: 500;
}

.weapon-select {
  flex: 1;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
  font-size: 0.85rem;
  cursor: pointer;
}

.weapon-select:hover {
  border-color: var(--color-border-hover);
}
</style>
