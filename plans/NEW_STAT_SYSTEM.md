# New Stat System

This is a parallel implementation of a new stat system that will eventually replace the current `CharacterStats` interface and calculation methods.

## Overview

The new system provides a more flexible and maintainable way to manage stats by:
1. Defining stats with explicit bucketing functions
2. Separating player stats from weapon stats
3. Automatically recalculating when dependencies change

## Files Created

### 1. `/src/data/statDefinitions.ts`

Defines the new stat system foundation:

- **StatDefinition interface**: Each stat has:
  - `id`: Code reference (e.g., 'health', 'damage')
  - `name`: Display name (e.g., 'Max HP', 'Damage')
  - `displayFormat`: Format string with {value} placeholder (e.g., '+{value}%', '{value}')
  - `bucketingFunction`: How to combine multiple values ('additive' or 'multiplicative')

- **Bucketing Functions**:
  - `additive`: Sums all values (e.g., health: 120 + 30 + 10 = 160)
  - `multiplicative`: Multiplies (1 + value) factors (e.g., damage: [0.1, 0.2] → 32% total)

- **statDefinitions**: Record of all stat definitions
- **orderedStatIds**: Array of stat IDs in display order
- **formatStatValue()**: Utility to format stat values for display

### 2. `/src/stores/playerStats.ts`

Manages player stats that apply globally across all weapons:

- **Purpose**: Calculate and store stats from:
  - Class base stats
  - Class mod bonuses
  - Meta upgrades
  - Gear bonuses

- **Key Methods**:
  - `initialize(classMod, flat, percent)`: Set up initial stats
  - `recalculate()`: Recalculate from current sources
  - `onMetaUpgradesChanged()`: Trigger recalculation when meta upgrades change
  - `onGearChanged(flat, percent)`: Update gear and recalculate
  - `onNewDive()`: Reset everything for a new dive
  - `getStat(statId)`: Get a specific stat value

- **Calculation Method**:
  For each stat, collects all sources (base, meta, class mod, gear) into an array, then uses the stat's bucketing function to combine them.

### 3. `/src/stores/weaponSlotStats.ts`

Manages stats for each weapon slot (0-3):

- **Purpose**: Calculate stats for individual weapons by combining:
  - Base weapon stats
  - Player stats (from playerStats store)
  - Mid-dive upgrades for the weapon

- **Key Methods**:
  - `equipWeapon(slotIndex, weapon)`: Set weapon for a slot
  - `recalculateSlot(slotIndex)`: Recalculate one slot
  - `recalculateAll()`: Recalculate all slots
  - `getSlotStats(slotIndex)`: Get stats for a slot
  - `reset()`: Clear all slots

- **Auto-recalculation**:
  - Watches playerStats.stats and recalculates when it changes
  - Watches selectedUpgrades and globalUpgrades stores

## How to Use

### Example: Initialize player stats

```typescript
import { usePlayerStatsStore } from '@/stores/playerStats'

const playerStatsStore = usePlayerStatsStore()

// Initialize with class mod and gear
playerStatsStore.initialize(
  selectedClassMod,
  { health: 10, armor: 5 }, // flat bonuses
  { damage: 0.1 } // percent bonuses (10%)
)

// Get a specific stat
const currentHealth = playerStatsStore.getStat('health')
```

### Example: Equip a weapon and get its stats

```typescript
import { useWeaponSlotStatsStore } from '@/stores/weaponSlotStats'

const weaponSlotStatsStore = useWeaponSlotStatsStore()

// Equip a weapon in slot 0
weaponSlotStatsStore.equipWeapon(0, myWeapon)

// Get the stats for that weapon
const stats = weaponSlotStatsStore.getSlotStats(0)
console.log(stats.damage) // Final damage for this weapon
```

### Example: Handle meta upgrade changes

```typescript
// After meta upgrades are modified
playerStatsStore.onMetaUpgradesChanged()
// This will recalculate playerStats, which will trigger weapon stats recalculation
```

### Example: Format a stat for display

```typescript
import { statDefinitions, formatStatValue } from '@/data/statDefinitions'

const damageStat = statDefinitions.damage
const value = 0.25 // 25%
const formatted = formatStatValue(damageStat, value) // "+25%"
```

## Reset Triggers

The system needs to reset/recalculate in these scenarios:

1. **Meta Upgrades Changed**: Call `playerStatsStore.onMetaUpgradesChanged()`
2. **Gear Changed**: Call `playerStatsStore.onGearChanged(flat, percent)`
3. **New Dive Started**: Call `playerStatsStore.onNewDive()` and `weaponSlotStatsStore.reset()`

## Integration TODO

To fully integrate this system:

1. Wire up reset triggers in HomeView.vue:
   - Call `onMetaUpgradesChanged()` when meta upgrades change
   - Call `onGearChanged()` when gear modal updates
   - Call `onNewDive()` when starting a new dive

2. Update CharacterStatsPanel to use new stat system
3. Update weapon DPS calculations to use weaponSlotStats
4. Add mid-dive upgrade aggregation to weaponSlotStats calculation
5. Migrate away from old CharacterStats interface
6. Add tests for new stores

## Benefits

- **Clearer separation**: Player stats vs weapon stats
- **Flexible bucketing**: Easy to add new stat combination methods
- **Auto-recalculation**: Stats update automatically when dependencies change
- **Better type safety**: Explicit stat IDs and definitions
- **Easier formatting**: Built-in display formatting per stat
