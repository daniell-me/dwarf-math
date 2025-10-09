# Dwarf Math - UI v2 Design Document

## Overview
This document outlines the v2 UI redesign for the Dwarf Math application. The new UI will be built alongside the existing implementation, accessible via a `/v2` route.

## Current State Analysis

### What the App Does
- Weapon damage calculator for a game (appears to be Deep Rock Galactic themed)
- Select a class and class mod
- Equip up to 4 weapons (first is fixed based on class mod)
- View DPS calculations for each weapon
- Compare DPS impact of different upgrades at different rarities
- Select upgrades (click to add, shift+click to remove, max 50 total)
- Track meta upgrades (persistent progression bonuses)
- Apply character stats (from class, class mod, meta upgrades) to all calculations

### Current Pain Points
1. **Information density is overwhelming** - Hard to fit everything on screen
2. **Difficult to see all relevant data at once** - Too much scrolling
3. **Code debt** - Iteratively built, has old/ugly code from earlier iterations
4. **No component tests** - Only calculation tests exist

## V2 Design Goals

### Primary Goals
1. **Manage information density** - Progressive disclosure, collapsible sections, better hierarchy
2. **Cleaner, more maintainable code** - Fresh start with better architecture
3. **Test coverage** - Write tests for components as we build them
4. **Better visual organization** - Make it easier to scan and compare information

### User Experience Improvements
- **Speed is critical** - User is mid-dive, needs to make decisions quickly and get back to playing
- **Minimize clicks** - Show all available upgrades at once for instant comparison
- **Persistent setup stays hidden** - Meta upgrades, gear, class selection are pre-dive setup, hide them in panels
- **Optional info stays collapsed** - Character stats and selected upgrades list are reference info, hide by default

### Core Use Case: Mid-Dive Upgrade Decision
**Scenario**: User levels up in-game, gets offered 3 upgrade choices

**Workflow**:
1. User opens calculator (already has class/meta upgrades configured)
2. User sees all their equipped weapons with ALL possible upgrade options visible
3. User visually scans to find which of the 3 offered upgrades gives best DPS boost
4. User clicks to mark the upgrade as selected
5. User returns to game (< 10 seconds total)

**Critical Path**: Step 3 - must be able to scan and compare instantly

### Information Priority

**Always Visible (Primary Focus)**:
- Equipped weapons
- All possible upgrades for each weapon
- DPS values/gains for each upgrade tier

**Hidden by Default (Secondary/Setup)**:
- Meta upgrades panel (persistent progression)
- Gear bonuses panel (future feature)
- Class/class mod selection
- Character stats breakdown (debug/reference)
- Selected upgrades list (reference/summary)

## Component Architecture

### Component List

#### Core Layout Components

1. **HomeViewV2.vue** (`src/views/v2/HomeViewV2.vue`)
   - Main container view
   - Manages state: selected class mod, equipped weapons
   - Computes character stats
   - Two-column layout structure

2. **HeaderV2.vue** (`src/components/v2/HeaderV2.vue`)
   - Compact horizontal header bar
   - Class selector, Class mod selector
   - Buttons: Meta Upgrades, Stats, Build
   - Props: classMods, selectedClassMod
   - Emits: update:selectedClassMod, openMetaUpgrades, openStats, openBuild

#### Weapon Section Components

3. **WeaponListV2.vue** (`src/components/v2/WeaponListV2.vue`)
   - Container for 4 weapon sections (left column)
   - Handles dynamic spacing based on content
   - Props: weapons[], characterStats
   - Emits: selectWeapon, removeWeapon

4. **WeaponSectionV2.vue** (`src/components/v2/WeaponSectionV2.vue`)
   - Single weapon section (weapon info + upgrade table OR empty slot)
   - Switches between filled/empty states
   - Props: weapon | null, slotIndex, characterStats, availableWeapons
   - Emits: selectWeapon, removeWeapon

5. **WeaponInfoBarV2.vue** (`src/components/v2/WeaponInfoBarV2.vue`)
   - Compact weapon info (name, DPS, maybe tags)
   - ~30px height
   - Props: weapon, currentDPS
   - Optional: Remove button for non-primary weapons

6. **UpgradeTableV2.vue** (`src/components/v2/UpgradeTableV2.vue`)
   - The core upgrade table (reused for weapons AND global)
   - Compact styling, tight rows
   - Click to select, shift-click to remove
   - Props: upgrades[], weapon | null, characterStats, getUpgradedDPS
   - Handles selectedUpgradesStore integration

7. **EmptyWeaponSlotV2.vue** (`src/components/v2/EmptyWeaponSlotV2.vue`)
   - Single line: "Slot X: [+ Add Weapon]" with dropdown
   - Props: slotIndex, availableWeapons
   - Emits: selectWeapon

#### Global Upgrades Components

8. **GlobalUpgradesSectionV2.vue** (`src/components/v2/GlobalUpgradesSectionV2.vue`)
   - Right column container
   - Header + UpgradeTableV2
   - Scrollable if content exceeds height
   - Props: globalUpgrades[], characterStats
   - Uses UpgradeTableV2 internally

#### Modal/Panel Components

9. **MetaUpgradesPanelV2.vue** (`src/components/v2/MetaUpgradesPanelV2.vue`)
   - Modal overlay for meta upgrades
   - Similar functionality to v1, cleaner design
   - Uses metaUpgradesStore

10. **SlideOutDrawerV2.vue** (`src/components/v2/SlideOutDrawerV2.vue`)
    - Reusable slide-out drawer component
    - Slides in from right side
    - Props: isOpen, title
    - Emits: close
    - Slot for content

11. **CharacterStatsPanelV2.vue** (`src/components/v2/CharacterStatsPanelV2.vue`)
    - Content for character stats drawer
    - Shows computed character stats
    - Props: characterStats
    - Used inside SlideOutDrawerV2

12. **SelectedUpgradesPanelV2.vue** (`src/components/v2/SelectedUpgradesPanelV2.vue`)
    - Content for selected upgrades drawer
    - Shows all selected upgrades, count, restart button
    - Uses selectedUpgradesStore
    - Used inside SlideOutDrawerV2

### Component Hierarchy

```
HomeViewV2
├── HeaderV2
│   └── (dropdown selectors, buttons)
├── (Two-column layout)
│   ├── WeaponListV2
│   │   └── WeaponSectionV2 (×4)
│   │       ├── WeaponInfoBarV2
│   │       ├── UpgradeTableV2
│   │       └── OR EmptyWeaponSlotV2
│   └── GlobalUpgradesSectionV2
│       └── UpgradeTableV2
├── MetaUpgradesPanelV2 (conditional, modal)
├── SlideOutDrawerV2 (for stats, conditional)
│   └── CharacterStatsPanelV2
└── SlideOutDrawerV2 (for build, conditional)
    └── SelectedUpgradesPanelV2
```

### Implementation Order

**Phase 1: Foundation & Setup**
1. Install `@vue/test-utils`
2. Create HomeViewV2 (basic structure, dummy data) + test
3. Create HeaderV2 + test
4. Add `/v2` route

**Phase 2: Weapon Display**
5. Create EmptyWeaponSlotV2 + test (simplest component)
6. Create WeaponInfoBarV2 + test
7. Create WeaponSectionV2 + test
8. Create WeaponListV2 + test

**Phase 3: Upgrade Tables**
9. Create UpgradeTableV2 + test (core component)
10. Connect to selectedUpgradesStore

**Phase 4: Global Upgrades**
11. Create GlobalUpgradesSectionV2 + test
12. Wire up with upgrade table

**Phase 5: Panels**
13. Create SlideOutDrawerV2 + test (reusable)
14. Create MetaUpgradesPanelV2 + test (modal)
15. Create CharacterStatsPanelV2 + test
16. Create SelectedUpgradesPanelV2 + test

**Phase 6: Polish**
17. Responsive tweaks
18. Styling polish
19. Integration testing

## Visual Design Direction

[To be discussed - What aesthetic are we going for?]

## Layout & Navigation

### Proposed Layout (ASCII Mockup)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Header: [Class ▼] [Class Mod ▼]    [Meta Upgrades] [Stats] [Build]     │ ~50px
├──────────────────────────────────────────┬──────────────────────────────┤
│ WEAPON UPGRADES (70% width)             │ GLOBAL UPGRADES (30% width)  │
│                                          │                              │
│ ┌──────────────────────────────────────┐ │ ┌──────────────────────────┐ │
│ │ Weapon 1: [Name] | DPS: 123.4       │ │ │ Global Upgrade Table     │ │
│ │ [Upgrade Table: 5-8 rows × 5 cols]  │ │ │ [All rarities visible]   │ │
│ └──────────────────────────────────────┘ │ │                          │ │
│                                          │ │ [Scrollable if needed]   │ │
│ ┌──────────────────────────────────────┐ │ │                          │ │
│ │ Weapon 2: [Name] | DPS: 456.7       │ │ │                          │ │
│ │ [Upgrade Table: 5-8 rows × 5 cols]  │ │ │                          │ │
│ └──────────────────────────────────────┘ │ │                          │ │
│                                          │ │                          │ │
│ ┌──────────────────────────────────────┐ │ │                          │ │
│ │ Weapon 3: [Empty/Add weapon]        │ │ │                          │ │
│ └──────────────────────────────────────┘ │ │                          │ │
│                                          │ │                          │ │
│ ┌──────────────────────────────────────┐ │ │                          │ │
│ │ Weapon 4: [Empty/Add weapon]        │ │ │                          │ │
│ └──────────────────────────────────────┘ │ └──────────────────────────┘ │
└──────────────────────────────────────────┴──────────────────────────────┘
```

### Space Budget (for ~1080p height = ~900px usable)
- Header: ~50px
- Each weapon section: ~200px (tight)
  - Weapon info: ~30px
  - Upgrade table: ~170px (5-8 upgrade rows + header)
- 4 weapons = ~800px
- Total: ~850px (fits with small margin)

### Key Questions
1. **Can we fit weapon upgrade tables in ~170px?**
   - Need compact row height (~20-25px per upgrade)
   - Small font size for DPS values
   - Tight padding

2. **What if a weapon has 10+ applicable upgrades?**
   - Make that section scrollable?
   - Reduce font size further?
   - Collapse some upgrades?

3. **Empty weapon slots** - how much space do they take?
   - If collapsed/minimal, we get more space for equipped weapons
   - Just show "Slot 3: [+ Add Weapon]" as single line?

## Implementation Notes

### Technical Constraints
- Must use existing data structures and types
- Must use existing stores (Pinia)
- Must use existing calculation services
- Should coexist with v1 during development

### Testing Strategy
- **Current state**: Vitest + jsdom configured, calculation tests exist
- **Need to add**: `@vue/test-utils` for component testing
- **Approach**: Write tests alongside components (TDD where practical)
- **What to test**:
  - Component rendering with different props
  - User interactions (clicks, selections)
  - Computed properties and reactive state
  - Store integration
  - Edge cases (no data, loading states, etc.)

### File Structure
```
src/
├── views/
│   └── v2/
│       └── HomeViewV2.vue
└── components/
    └── v2/
        └── [components to be designed]
```

---

## Design Session Notes

### What's Working
- **Upgrade table format** - Horizontal table with rarities as columns is scannable and works well
- **Weapon list approach** - Vertical list of weapons with their upgrade tables

### What Needs Improvement
- Overall page layout (header, panels, spacing)
- Need to add space for **global upgrades** (new category)

### New Requirement: Global Upgrades
- Type of upgrade that applies to all weapons, not weapon-specific
- **Separate pool** from weapon upgrades (data not yet available)
- Available global upgrades depend on which weapons are equipped
- Same rarity system (common → legendary)
- Mix of combat and utility upgrades
- Needs its own section/display, as visible as weapon-specific upgrades

### Screen Constraints
- **Target**: 16:9 screens, variety of sizes (laptop to desktop)
- **Goal**: Everything fits on one screen, NO scrolling
- **Strategy**: Shrink non-critical elements to maximize space for upgrade tables

### Layout Direction: Two-Column Design

**Left Column (Wider)**: Weapon Upgrades
- 4 weapon sections, vertically stacked
- Each section: minimal weapon info + full upgrade table
- Weapon info should be condensed (name, current DPS, maybe tags?)
- Upgrade tables remain prominent and scannable

**Right Column (Narrower)**: Global Upgrades
- Single section for all global upgrades
- Same table format as weapon upgrades
- Takes up full height of right column

**Header (Minimal)**:
- Slim horizontal bar at top
- Class/class mod selector (compact)
- Buttons to open: Meta Upgrades, Gear (future), maybe Settings
- Should take minimal vertical space

**Panels (Hidden by Default)**:
- Character stats → slide-out drawer or modal
- Selected upgrades → slide-out drawer or modal
- Meta upgrades → modal
- NO fixed overlays covering content
