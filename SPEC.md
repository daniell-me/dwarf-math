# Dwarf Math - Application Specification

## Overview
A build optimizer for Deep Rock Galactic: Survivor that calculates optimal damage combinations from weapons and upgrades.

## Game Context
**Deep Rock Galactic: Survivor** is a survival game where:
- Players control a dwarf on missions called "Dives"
- During dives, players collect XP and level up
- Each level offers a selection of weapons and upgrades that modify stats
- **Goal**: Determine which weapon/upgrade combination provides maximum damage output
- Dive upgrades reset after each dive (temporary)
- Meta upgrades persist across runs (permanent base stat boosts)
- Classes and subclasses provide additional stat modifiers

## User Requirements

### Primary Use Case
- **Target User**: Deep Rock Galactic: Survivor players optimizing their builds
- **Context**: Pre-dive planning and mid-dive decision making
- **Goal**: Calculate and compare damage output of different weapon/upgrade combinations

### Core Functionality

1. **Damage Calculation Engine**
   - Calculate total damage output from weapon + upgrade combinations
   - Account for multiplicative and additive stat bonuses
   - Handle complex stat interactions and dependencies

2. **Build Comparison**
   - Compare multiple weapon/upgrade combinations side-by-side
   - Rank options by damage output
   - Show damage difference between options

3. **Character Configuration**
   - Set base character class and subclass
   - Configure persistent meta upgrades
   - Input current character stats

4. **Upgrade Selection Interface**
   - Browse available weapons and upgrades
   - Select combinations to analyze
   - Real-time damage calculation as selections change

### Data Structure
- **~500 numbers**: All possible weapons, upgrades, and their stat modifiers
- **Base Stats**: Class/subclass modifiers and meta upgrades
- **Combinations**: Calculated damage values for each possible build

### User Workflow
1. Configure character (class, subclass, meta upgrades)
2. Select available weapons/upgrades for current dive
3. Compare damage output of different combinations
4. Choose optimal build based on calculations

### Non-Functional Requirements
- **Performance**: Real-time calculations with ~500 stat values
- **Persistence**: Save character configurations and meta upgrades
- **Traffic**: Low volume (~10 users/day)
- **Platform**: Desktop web only (no mobile support required)
- **Hosting**: Static site on GitHub Pages

## Damage Calculation System

### Stats That Affect Single-Target Damage
- **Damage**: Base weapon damage per shot
- **Critical Chance**: Probability of landing a critical hit
- **Critical Damage**: Damage multiplier for critical hits
- **Reload Time**: Time to reload weapon
- **Fire Rate**: Shots per second
- **Clip Size**: Shots per magazine

### Bonus Stacking Rules
- **Within Buckets**: Bonuses are additive (e.g., +10% damage + +15% damage = +25% damage)
- **Between Buckets**: Each bucket multiplies with others (e.g., Base × Bucket1 × Bucket2 × Bucket3)

### Bonus Buckets (in order)
1. **Meta Upgrades**: Persistent upgrades across all dives
2. **Class Modifiers**: Base class and subclass stat bonuses
3. **Weapon Mastery**: Weapon-specific mastery bonuses
4. **Weapon Skills**: Weapon skill tree bonuses
5. **Artifacts**: Each artifact is its own bucket (multiple per dive possible)
6. **Overclocks**: Each overclock is its own bucket (up to 3 per weapon per dive)

### Data Scale
- **Weapons & Upgrades**: Hundreds of different items with stat values (estimated scale, not exactly 500)
- **Combinations**: Exponential combinations possible from weapon + upgrade selections

## Open Questions
1. How do class/subclass modifiers work specifically?
2. Are there conditional bonuses or complex interactions between upgrades?
3. What's the exact damage formula? (will be implemented during coding phase)
4. How should the UI handle the complexity of multiple artifacts and overclocks?

---
*This specification will be updated based on user feedback and requirements gathering.*