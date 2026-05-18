# Build Lab — Direction & Design

*Authoritative design doc. Created 2026-05-18, superseding [SPEC.md](SPEC.md) and [UI_V2_DESIGN.md](UI_V2_DESIGN.md).*

## In one paragraph

Dwarf Math is a **pre-dive build research tool** for Deep Rock Galactic: Survivor. The user picks a class + weapon, and the tool runs a small simulator over a search of reachable builds to emit **heuristics** the user can carry into the dive mentally: which overclocks are strong on this weapon, what stat profile the optimal build wants, and how to recognize on-target picks while playing. The tool does not run during play, does not read game state, and does not attempt to optimize meta-strategy — that intelligence lives in the player's head, informed by the model's outputs.

## Why this direction

The project's original premise — pointwise "which of these 3 upgrades gives the most DPS right now" — has been outgrown:

- Real play involves **path-dependent** decisions (a worse upgrade now unlocks a better overclock later).
- Real play involves **scarcity-weighted** decisions (a hard-to-roll stat is worth more than its local DPS would suggest).
- Late-dive levels arrive too fast for alt-tabbing to a calculator mid-flight.

Full meta-strategy optimization (the planner) is intractable — encoding "what build to chase" requires hundreds of hours of player learning that the model cannot synthesize. The tractable middle ground is:

- A **small simulator** that scores builds (DPS under two scenarios).
- An **analysis layer** that searches over reachable builds and extracts heuristic profiles.
- A **glass-box UI** that exposes the model's reasoning so the user can audit and tune it.

The player provides the strategic intent ("I want to plan Gunner with Leadstorm"); the tool answers the math-heavy sub-questions that arise.

## Explicitly out of scope

Decisions ruled out during design — do not relitigate without strong new evidence:

- **Mid-dive overlay / Overwolf / BepInEx integration / OCR / auto-detection.** Tool is pre-dive only. The user carries conclusions mentally into the dive.
- **Full dive simulation.** No modeling of enemy spawns, movement, positioning, survival.
- **Monte Carlo.** Deterministic with analytic crit handling.
- **Multi-weapon loadout interactions.** Per-weapon scoring only, until v0 proves out.
- **"Best 3 OCs together" recommendation.** OCs are independent multiplicative buckets per the original SPEC; their best-3 set should be the top 3 individually unless OCs prove to compose non-linearly (see Open Questions).
- **Self-tuning feedback loops.** Bias adjustments are author-coded for now, not user-exposed.

## Game context (relevant facts for fresh agents)

- **Bullet heaven.** Weapons fire continuously with little to no aiming — no firing uptime, no aim quality. Stats fully determine damage output.
- **Upgrade economy.** Each level offers a random set of upgrade options. Late-dive levels arrive every few seconds.
- **Pick budget.** A typical full dive reaches ~level 60. Of those picks, ~10 are non-DPS (movement, utility), leaving ~50 DPS-affecting picks as the default budget for "what does an optimal build look like." Make this parameterized — different dive depths produce different optima.
- **Upgrade granularity.** Stats have wildly different chunk sizes. A single damage upgrade might give +50%; fire rate upgrades might give +10%. Granularity shapes both reachability and pick scheduling during a dive.
- **Overclocks.** Each dive shows a random 6 OCs from a larger pool; the player picks 3. Players cannot pick a specific OC — they recognize and grab good rolls. The tool's job is to make the entire OC pool **memorable and rankable**, not to recommend a top 3.
- **Damage stacking.** Bonuses are additive within a "bucket" and multiplicative across buckets. Buckets: meta upgrades, class modifiers, weapon mastery, weapon skills, artifacts, overclocks. (See `plans/SPEC.md` for the original spec; the bucket model survives the pivot.)

## Simulator scope

Per (weapon, OC, build, scenario) → DPS.

- **Single-target scenario.** Standard damage math. Used for evaluating priority-target killing.
- **Swarm (AoE) scenario.** `single_target_DPS × per_weapon_target_count_modifier`. The modifier captures "this weapon covers the whole screen" (modifier near max) vs "this weapon hits one direction" (modifier ~0.5) vs "this weapon is a single-target" (modifier 1.0). The modifier is per-weapon authored data; it's the model's main assumption about AoE, exposed clearly so it can be tuned.
- **Deterministic.** No randomness. Crit is computed analytically: `effective_damage = damage × (1 + crit_chance × (crit_mult - 1))`.
- **No survival, no positioning, no firing uptime.**

Inputs to the simulator at query time:
- Weapon base stats (data: `src/data/weapons.ts`)
- OC effect (data — to be authored)
- Build: a vector of selected upgrades (each upgrade contributes to one or more stats with a known chunk size)
- Player stats: class + class mod + meta upgrades (sourced from existing `playerStats` store / `MetaUpgradesPanel`)
- Pick budget (default 50, configurable)

## Analysis layer: how heuristics are extracted

For a given inquiry (weapon, class, meta-config):

1. **For each OC** (and a no-OC baseline):
   1. Search the space of reachable builds (combinations of upgrade chunks within the pick budget) for the build that maximizes the **single-target DPS** scenario.
   2. Repeat for **swarm DPS**.
   3. Record both peak scores.
2. **Extract the stat profile** of the optimal build per (OC, scenario):
   - Target distribution as percent of total bonus
   - Pick count per stat
   - Available chunk sizes per stat (data, not search output)

The search can start naive (exhaustive within budget, prune obviously dominated builds). Performance optimization is a later concern.

## Outputs

The model emits, for each inquiry:

### 1. OC ranking table (the spine)

Every OC in the weapon's pool, ranked, with two scenario scores. Players memorize this table to recognize good rolls.

| OC          | Single-target DPS | Swarm DPS | Best at      |
|-------------|------------------:|----------:|--------------|
| OC-A        |             1,100 |       600 | priority     |
| OC-B        |               850 |     1,200 | swarm        |
| OC-C        |               720 |       900 | balanced     |
| (none)      |               600 |       500 | baseline     |

Optionally tier-grouped (S/A/B/C) once the dataset is large enough that flat ranking is hard to scan.

### 2. Per-OC drill-down

When the user expands a row, show the *optimal build profile* under that OC, per scenario. Format:

| Stat       | Target % | Avg chunk size  | Expected picks |
|------------|---------:|-----------------|---------------:|
| Damage     |      40% | +50% / +30%     |          ~1-2  |
| Reload     |      25% | +15% / +8%      |          ~2-3  |
| Fire rate  |      30% | +10% / +5%      |          ~4-5  |
| Crit       |       5% | +5% / +3%       |          ~1    |

Three columns intentionally:
- **Target %** — model's raw output, the destination
- **Avg chunk size** — the granularity, so the user can mentally judge effectiveness per pick
- **Expected picks** — the schedule implication

Below the table, **always-accessible glass-box**: the specific upgrade combination the model considered optimal, with the DPS calculation broken out. Critical for trust during the early phase when the model and reality diverge.

### 3. Pairing suggestions *(deferred)*
### 4. Feedback bias weights *(deferred — author-coded, not user-facing)*

## UX shape

Single-page application, weapon-first.

```
┌──────────────────────────────────────────────────────────────┐
│  [Class ▼]  [Weapon ▼]    Meta: 24/40 upgrades   [Configure] │
├──────────────────────────────────────────────────────────────┤
│  Overclock Rankings                                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ OC          Single-target    Swarm     Best at          │  │
│  │ ─────────   ─────────────   ──────    ─────────         │  │
│  │ OC-A         1,100           600       priority    ▶    │  │
│  │ OC-B           850         1,200       swarm       ▼    │  │
│  │                                                          │  │
│  │   ─ Expanded OC-B ───────────────────────────            │  │
│  │   Single-target profile:                                  │  │
│  │     [stat ratio table]                                    │  │
│  │   Swarm profile:                                          │  │
│  │     [stat ratio table]                                    │  │
│  │   [Show canonical build]                                  │  │
│  │                                                          │  │
│  │ OC-C           720           900       balanced    ▶    │  │
│  │ (none)         600           500       baseline    ▶    │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

Key UX decisions captured:

- **Entry point:** weapon + class selector at top. Both required (class mods are a damage bucket).
- **Meta config:** persistent state, reuses `MetaUpgradesPanel` (or its successor in the new stat system). The user updates it occasionally, not per-session.
- **OC table shows the entire pool.** No "top 3" recommendation — the player picks from a random subset, so they need the full ranking memorized.
- **Two scenario columns are always visible.** Specialist OCs (great at one, weak at the other) are visually obvious.
- **Drill-down shows both scenario profiles**, not a merged one. Truthful even if it doubles the table.
- **Glass box is always reachable** behind a "show canonical build" toggle. Initially expanded by default until trust is established.
- **No mid-dive UI surfaces.** Drawer/modal patterns from `UI_V2_DESIGN.md` (slide-out, modal overlays) may be reused for configuration screens but no longer drive the main flow.

## Prerequisites

The model's outputs are only as good as the underlying math. Before building the new UI:

1. **Land the in-game-values bugfix.** Branch `daniell/bugfix-against-in-game-values` has uncommitted edits to `metaUpgrades.ts`, `MetaUpgradesPanel.vue` + test, `types.ts`, `calculations.ts`, `playerStats.ts`. Finish reconciling math against in-game values.
2. **Finish the new stat-system migration.** See [`NEW_STAT_SYSTEM.md`](NEW_STAT_SYSTEM.md). The new stores (`playerStats`, `weaponSlotStats`) are the right substrate for the simulator — "apply a bucket, recompute DPS" is exactly what they expose. Migrating off the old `CharacterStats` path is required before slice 1.

These are not glamorous but the entire build lab depends on them.

## Implementation slices

Each slice is meant to be self-contained enough that a fresh agent can be briefed against it.

### Slice 1 — OC ranker (no build search)

Hardcode a "canonical default build" per weapon (or use a simple heuristic — e.g., equal distribution within budget). Apply each OC, compute single-target DPS, render a ranked table.

- **Goal:** validate underlying math is trustworthy; deliver immediate user value (a ranked OC list per weapon).
- **Out of scope:** stat profiles, swarm scenario, search.
- **Done when:** for at least one weapon, the OC ranking matches the user's intuition from play. Discrepancies surface math bugs; fix or document them.

### Slice 2 — Build search + stat-ratio recommender

Add the search over reachable builds. For each (weapon, OC), find the optimal build under the pick budget. Emit the stat profile table (target %, chunk size, expected picks). Wire the glass-box "show canonical build" view.

- **Goal:** the model emits ratios; the user can see *why*.
- **Open implementation question:** exhaustive search vs greedy vs branch-and-bound. Start with exhaustive and prune; performance later.

### Slice 3 — Swarm scenario

Add per-weapon target-count modifier as authored data. Compute swarm DPS. Add second score column to OC table. Add second profile to drill-down. Tune the modifier values weapon-by-weapon as part of authoring.

### Slice 4 — Tier grouping in OC table

UX polish. Once OC pools are large enough that ranked lists are hard to memorize, group into S/A/B/C tiers based on score thresholds (or score gaps). Defer until at least one weapon's OC pool is fully authored.

### Slice 5 — Weapon pairing scoring *(later)*

Given a primary weapon + OC, score each potential secondary. Likely a separate query view rather than a section of the primary report. Defer until the single-weapon model is trusted.

### Slice 6 — Feedback bias weights *(later)*

When the model's output diverges from play experience ("this build felt bad, it needs more reload"), add per-(weapon, OC, stat) bias multipliers in code. Not a user-facing feature; author-coded. Don't design the data shape until the second or third bias is added — patterns will be obvious by then.

## Existing UI: what survives

The current `HomeView.vue` flow ("configure character → pick weapons → see DPS table → mark selected upgrades") is fundamentally the wrong shape for the new direction. It can be **overwritten**. Salvage:

- **Math primitives** in `calculations.ts` (after the bugfix lands).
- **Data files:** `weapons.ts`, `upgrades.ts`, `metaUpgrades.ts`, `classes.ts`, `classMods.ts`. These remain the source of truth.
- **`MetaUpgradesPanel`** component — meta upgrade configuration is still part of the new flow.
- **The new stat-system stores** (`playerStats`, `weaponSlotStats`) — they're well-suited to the simulator.
- **`SlideOutDrawer`, modal patterns** from UI v2 — reusable for configuration surfaces.

Don't preserve the current main view as a "sandbox" route — its correctness is in doubt and maintaining it is a distraction.

## Open questions to verify before building

1. **Do OCs compose linearly?** SPEC.md says yes (independent multiplicative buckets). If false in practice (e.g., conditional OCs that gate on each other), Slice 5+ needs a combo view. Verify by checking actual OC effects in `upgrades.ts` / game documentation before building Slice 5.
2. **Granularity data — is it captured?** The stat-ratio recommender needs each upgrade's chunk size per stat. Audit `upgrades.ts` to confirm this is already encoded; if not, capture it as part of Slice 2.
3. **Pick budget value.** Default 50 is a guess from "~level 60 dive, ~10 utility picks." Revisit after one weapon is fully modeled — does the model's output feel right at this budget, or does it need to be lower/higher?
4. **OC pool data.** The full per-weapon OC pool needs to be authored. Scope unknown until inventoried — may be a significant content effort.
