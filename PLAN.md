# Dwarf Math — Plan

*Authoritative design doc. Written 2026-05-19, superseding the prior `plans/BUILD_LAB.md`, `SPEC.md`, `UI_V2_DESIGN.md`, and `NEW_STAT_SYSTEM.md` (all deleted).*

## Goal

A **personal, pre-dive build research tool** for Deep Rock Galactic: Survivor. The user provides their class choice and meta-progression state; the tool emits ranked **build archetypes** and the in-dive **policies** that execute them — translated into heuristics the user can carry into a dive mentally. The intent is to bootstrap the user's own intuition about which builds are strong and how to play them; it is not a calculator, a planner, or a public product.

## What it is / isn't

**Is:**
- Pre-dive only.
- Personal tool, local Vue UI, single-purpose page.
- Glass-box: every recommendation traces back to a sim run the user can inspect.
- Meta-aware: masteries / gear / account upgrades are inputs that shift the rankings.

**Isn't:**
- Mid-dive overlay, game-state reader, Overwolf, BepInEx, OCR. The user carries conclusions in their head into the dive.
- A full game simulator. Enemy spawns, positioning, survival, kiting — none of these are modeled.
- A public product. UX is "good enough for the author" and nothing more.
- A point-wise level-up calculator. That premise was outgrown; do not re-introduce it.

## Scope: DPS only

The tool optimizes **upgrade choices for end-of-dive DPS**, and nothing else. It does not model or balance:
- Movement speed (and the breakpoints that gate dodging certain enemies).
- Mining speed (which gates economy / nitra income).
- Survivability investment (shields, regen, armor).
- Any non-DPS quality-of-life stat.

These are the player's job. The heuristic gives DPS-optimal recommendations; the player mentally overrides when a non-DPS concern dominates (e.g., "I need this movement speed breakpoint even though it's low priority for DPS"). Non-DPS picks still appear in the offer model and the policy will naturally rank them low — that's the signal to the user that taking them is a deliberate non-DPS trade.

## Architecture

Two processes, two languages, one HTTP boundary.

**UI client (existing Vue + TypeScript app):**
- Owns the data layer (`src/data/*.ts` — weapons, OCs, stat definitions, offer model). This is where typed authored data lives and stays.
- Owns the UI (`src/views/`, `src/components/`) — input controls, leaderboard, drill-down, score histograms.
- Orchestrates: when the user clicks "Run", the client POSTs the config to the sim service and renders the response.

**Sim service (new Rust binary):**
- Owns the inner sim loop, the discovery search, and the Monte Carlo evaluation.
- Exposes an HTTP API. Minimum shape: `POST /run { class, roster, meta_state, sim_config } → { leaderboard, trajectories, policy_weights, … }`. Schema to be defined in Slice 2.
- Multi-threaded via `rayon`. Parallelizes across seeds within a policy and across candidate policies within an archetype.
- Compiled natively per host (no WASM — we want full SIMD/AVX and zero sandbox overhead).

**Why this shape:**
- The sim's hottest loop is numeric and benefits enormously from native code + multi-threading. On the author's 9800X3D, a well-threaded Rust sim is ~100–200x faster than the current TS path. That headroom is what lets `K` go from ~200 to ~20,000 if discovery quality demands it.
- Splitting at HTTP keeps the languages cleanly separated. Each side compiles and tests independently.
- The boundary is small (one request/response schema) and stable (`(archetype, config) → results`), so the interface doesn't churn even as either side evolves.

**Data-layer flow.** TS remains the source of truth for authored data (weapons, OCs, stats, offer model). At build time (or on demand) the TS data layer exports a JSON snapshot the Rust service loads at startup. This avoids duplicating authored data in two languages.

**Cross-machine workflow.**
- **Dev on the MacBook:** sim binary built for arm64 macOS, runs locally. Vue talks to `localhost`.
- **Full discovery runs on the Windows PC:** sim binary built for Windows, runs as a local HTTP server on the PC. Vue UI either runs on the PC too (it's just static files) or on the Mac pointing at the PC's IP over the local network. Either way the heavy compute runs where the cores are.
- Long-running discovery is fire-and-forget — kick off the request from the UI, let the PC chew on it, inspect results later.

**Explicitly deferred:**
- **GPU compute** (CUDA / WebGPU). The sim's control flow (per-pick branching on weapon/offer/OC state) is hostile to SIMT execution — significant warp divergence would eat most of the gains. Re-evaluate only if the 8-core Rust path proves insufficient at the K values we end up wanting.
- **WASM build of the sim**. Drops ~1.5–2x perf vs. native and complicates threading. Only worth doing if we ever need browser-side sim execution (e.g., for shareable demos), which is not a v1 goal.
- **Cloud / distributed sim** across multiple machines. Single-machine on the 9800X3D is plenty for any K we'd plausibly want.

The CLAUDE.md preferences (TS data files, decimal percentages, App.vue styles, `npm run type-check` + `npm run test:run` gates) apply to the TS+Vue side. The Rust service has its own conventions to be established in Slice 2 (`cargo fmt`, `cargo clippy`, `cargo test`).

## DRG:S mechanics modeled

Relevant facts for fresh agents — the model lives or dies on getting these right.

- **Bullet heaven.** Weapons fire continuously. No aim, no firing-uptime modeling. Stats fully determine damage output.
- **4 weapon slots.** The class determines the slot-1 starting weapon. The other 3 slots are filled during the dive from random weapon offers.
- **Level-ups.** Each level-up presents 3 (sometimes 4) options drawn from a complex pool. Options are a mix of:
  - **Global stat upgrades** — apply to all weapons (e.g. +10% fire rate to all weapons).
  - **Weapon-level picks** — raise a specific weapon's level by 1, 2, or 3.
- **Weapon levels and OCs.** Each weapon's overclock unlocks are fixed by level:
  - **Level 6:** offered 2 *balanced* overclocks from that weapon's pool; pick 1.
  - **Level 12:** offered 2 *balanced* overclocks; pick 1.
  - **Level 18:** offered 2 *unstable* overclocks; pick 1.
  Each weapon has its own OC pool; some OCs appear across multiple weapons' pools.
- **Carry vs. support (author's shorthand).** A *carry* weapon is one the player intends to push to level 18 (unstable OC unlocked). A *support* weapon is leveled enough for 1–2 balanced OCs (level 6 or 12). A typical dive (~60 levels) supports **roughly 2 carries** plus support investment in the other 2 slots.
- **Damage stacking buckets.** Bonuses are additive within a bucket and multiplicative across buckets: meta upgrades, class modifiers, weapon mastery, weapon skills, artifacts, overclocks. Inherited from the prior SPEC; the bucket model survives.

## The archetype (pre-dive object — enumerable)

A build archetype is a tuple:

- **Class** (and its implicit slot-1 weapon).
- **Weapon roster** — the other 3 weapons the player plans to pick up.

The archetype space is enumerable: classes × `C(weapon-pool, 3)` rosters. Pruning trivially dominated rosters keeps the working set tractable.

**Not in the archetype:** stat ratios, weapon-leveling pacing, pick-order rules, role assignments (carry vs. support), OC targets. Those are properties of the *policy*, which is discovered. Role and OC choices **emerge** from the discovered policy (see policy section). If a policy ends up pushing a weapon to 18, that weapon is a carry; if it leaves it at 6 or 12, it's support. The drill-down UI reports the emergent shape as part of each archetype's results.

## The policy (in-dive object — discovered)

A policy is a function `(current_state, 3_offered_options) → chosen_option`. We parameterize it as a **linear scoring function** over offers; the policy picks the highest-scoring of the 3.

**Parameterization:**

```
score(option, state) =
    Σ_w∈roster  w_weaponLevel[w]   × isWeaponLevelPickFor(option, w)
  + w_damage    × damageContribution(option, state)
  + w_fireRate  × fireRateContribution(option, state)
  + w_crit      × critContribution(option, state)
  + w_<other stats> × ...
```

A single weight vector per policy — **no phase dependence**, no OC-conditional weight branching. The expressive power comes from the `*Contribution(option, state)` terms, not from extra weight dimensions.

**Contributions are state-aware.** `damageContribution(option, state)` is not "how much percent does this option add to the damage bucket" — it's "how much DPS does this option add given the current state (current OCs, current weapon levels, current stat stacks)." This is what makes a single weight vector sufficient to express:

- **Diminishing returns on stacked stats.** A +20% fire rate offer at +0% fire rate is worth more (in DPS) than the same offer at +200% fire rate. The contribution function returns the right number; the weight stays the same.
- **OC-shaped stat valuation.** If the player has just taken Thick Boy on Bulldog (which collapses all shots into one), `fireRateContribution(offer, state)` for further fire-rate offers drops near zero — the OC reshaped what the stat is worth. The policy reacts without needing OC-conditional weights.
- **Robustness across OC uncertainty.** Because contributions react to whichever OC the dive ends up rolling, the policy doesn't have to plan around a specific OC. Stat priorities are inherently averaged across OC outcomes (you can't build *around* an OC because the OC roll is random; the policy plays what it gets).

**Role is emergent from `w_weaponLevel[w]`.** A high weight on a weapon means the policy reliably picks its level-ups, pushing it toward 18 (carry behavior). A low weight leaves it stalled at 6 or 12 (support behavior). No explicit "this is a carry" parameter.

**OC selection** at unlock milestones (6/12/18) is greedy on current-state contribution: when 2 OCs are offered, the sim picks the one with the higher immediate DPS contribution given current state. No additional policy weights needed for OCs in v1. (If discovery reveals this is wrong — e.g., a "worse-now" OC is genuinely better long-term — add per-OC weights later.)

## The simulator (inner loop)

Implemented in the Rust sim service (see **Architecture**). Given (archetype, policy weights, meta state, seed), simulate a single dive:

1. Initialize state: starting weapon, meta-modified base stats, 0 picks taken.
2. For each level-up `1..N` (default `N = 60`, configurable):
   a. Sample 3 offers from the **offer model** (see below).
   b. Apply policy: score each offer, pick the highest.
   c. Update state (weapon levels, stats).
   d. If a weapon hits an OC milestone (6, 12, 18), sample 2 OCs from that weapon's pool. Pick the one with the higher immediate DPS contribution given current state (greedy). See policy section for why OC choice is not policy-parameterized in v1.
3. Compute final DPS at end of dive.

**Outputs per sim run:** final DPS (single-target + swarm via per-weapon target-count modifier, inherited from prior plan), full trajectory (per-level pick log + emergent weapon levels reached).

## Monte Carlo evaluation (scoring a policy)

A single sim run is one sample from a noisy distribution — the offer randomness means the same policy plays out very differently across seeds. To score a policy, run it `K` times with different random seeds and summarize the resulting DPS distribution. This is a **Monte Carlo** estimate of the policy's expected value: random draws in, distribution out, summarized into a score.

**K (number of seeds).** Hardcoded in config. Start at `K = 100`. Tune empirically — if doubling K materially changes the rankings of top policies, K was too low.

**Common Random Numbers (CRN).** Use a **fixed list of seeds** (e.g. `[1, 2, …, K]`) reused across every candidate policy for a given archetype. This means policy A and policy B both face the same offer rolls; the only difference in their scores is the policy itself, not luck. Variance between policies drops sharply — small true differences become detectable.

The sim must therefore consume randomness from a **seeded RNG**, not `Math.random()`. A single seeded stream is sufficient for v1; per-concern stream isolation can be added later if CRN benefit looks weaker than expected.

**Score = weighted sum of percentiles** of final DPS across the K runs:

```
score(policy) = 0.25 · P20(DPS) + 0.5 · P50(DPS) + 0.25 · P90(DPS)
```

- `P50` (median) — the typical dive.
- `P20` — the reliability floor; what most dives at least clear.
- `P90` — the upside ceiling.

Weights live in config. Default `(0.25, 0.5, 0.25)` biases toward the typical case while still rewarding floor and ceiling. No penalty for missed OC unlocks — the archetype no longer specifies OC targets (role and OC are emergent).

**Leaderboard reports all three percentiles** as separate columns plus the combined score. The spread between `P20` and `P90` doubles as an uncertainty signal: archetypes with overlapping `P20`–`P90` ranges are effectively tied, even if their combined scores differ slightly.

### What we're explicitly *not* doing in v1

Deferred until a concrete failure motivates them:

- **Train/test split on seeds.** Risk of overfitting policies to the fixed seed batch. Mitigation if it shows up: bump K, or evaluate top finalists on a fresh held-out seed batch.
- **Stream isolation per concern.** Mitigation if CRN benefit is weaker than hoped: separate RNG streams for offer draws, OC draws, rarity rolls.
- **Two-stage K** (low K for wide search, high K for re-ranking finalists).
- **Pareto / multi-objective optimization** across the three percentiles.

These are all real techniques in the simulation literature; none are necessary upfront for a personal tool. Add them when a specific observed problem demands them.

## The discovery layer (outer loop)

For each archetype:

1. Define the policy parameter space (per-weapon level weights + per-stat weights — one flat weight vector).
2. Search the space — start with random sampling + top-K refinement; upgrade to Bayesian optimization or evolutionary search only if necessary.
3. Score each candidate policy via **Monte Carlo evaluation** (see section above): K sim seeds with CRN, weighted-percentile score.
4. Return the best policy and its score distribution.

The result per archetype is `(best_policy_weights, score_distribution, representative_trajectories)`. Translation of the policy into a player-usable heuristic is its own step — see **Heuristic translation** below.

## Heuristic translation

This is the deliverable. The discovered policy is a scoring function; the player can't execute a scoring function in their head. The translation layer turns the policy into a small, memorable artifact the player carries into a dive.

### Format

Per-weapon **target display values** — the same numbers DRG:S shows on the weapon stat screen, so the player can read off current values mid-dive and compare directly. Plus a small OC preference block and a one-line lag-chase rule.

Example output for one archetype:

```
Class: Gunner   Roster: Bulldog / Leadstorm / Coilgun
Scope: DPS only. Override for movement/survival as needed.

Bulldog  (push to 18 — carry)
  Reload time     1.2s
  Fire rate       5.6 / sec
  Damage / shot   850
  Crit chance     45%

Leadstorm  (push to 12 — support)
  Reload time     1.8s
  Fire rate       42 / sec
  Damage / shot   18
  Crit chance     45%

Coilgun  (push to 6 — support)
  Reload time     2.0s
  Damage / charge 1200

OC preferences (take leftmost if multiple offered):
  Bulldog:    Thick Boy > Bullet Hell > Six-Shooter
  Leadstorm:  Hose Down > Stabby Time
  Coilgun:    (any)

Take offers that move you toward unmet targets.
Skip stats your carry is already at/above target on.
```

### Extraction: behavioral, not weight-thresholded

Targets are derived from the policy's **observed behavior**, not from inspecting weights:

1. Run the discovered policy through K sim trajectories (reuse the Monte Carlo evaluation seeds).
2. Aggregate end-state across the K runs:
   - Per-stat-bucket: average final bonus (e.g., "+178% fire rate on average").
   - Per-weapon: distribution of final levels (mode = the level shown in the heuristic).
3. For each weapon in the roster, apply the averaged bonuses to that weapon's base stats and compute the **derived display values** (reload time, fire rate, damage/shot, etc.) using the same formulas the game uses.
4. Determine **OC preferences** from observed sim choices: for each weapon's OC pool, rank by how often the policy picked each OC at its unlock milestone across the K runs.

Why behavioral rather than weight-thresholded: weights alone can't tell you when a stat hits diminishing returns. The policy's *behavior* (where it actually lands) does, because the state-aware contribution function naturally pushes the policy off a stat once that stat is saturated. The behavioral aggregate captures that endpoint directly.

### What the player does mid-dive

1. Open the weapon stat screen. Read current values for the carry weapon.
2. See offers. For each, ask: "Does this move my carry toward an unmet target?"
3. If yes, take it. If the carry is already at/above target on every stat the offer touches, skip it (even for legendary rarity).
4. Weapon-level offers: take per the `push to X` annotation.
5. OC offers: take leftmost in the preference list if multiple offered; otherwise take the one offered.

The "carry-dominant" framing (drive decisions by the carry's stats, not all three weapons) is left implicit — players grasp it without being told.

### Glass-box

The drill-down view shows the raw policy weights and a sample trajectory beneath the heuristic. When the heuristic feels wrong or the targets seem off, the player can drop down a level and inspect what the policy is actually doing.

## The offer model (the load-bearing assumption)

This is the hardest part and the most uncertain. Real DRG:S offer pools are complex: rules modify the pool based on the player's weapons; picks have rarity (which dramatically changes magnitudes); rarity frequency is modulated by an opaque "luck" stat.

**Approach:** model the offer distribution as **authored, tunable data**. We don't try to reverse-engineer the game. We start with a reasonable hand-authored distribution and treat it as the single most important assumption the sim makes.

Initial parameterization:
- Categorical mix per offer: probability of (global stat | weapon-level | utility) picks.
- For weapon-level picks: per-weapon weighting (uniform or biased by what's already picked up).
- For global stat picks: per-stat probabilities.
- Rarity tiers with magnitude multipliers; rarity probability is a tunable that maps loosely to "luck."

This data lives in `src/data/offerModel.ts` (or similar) and is the **primary tuning surface**. When the sim's recommendations don't match play experience, the first thing to interrogate is the offer model.

## Output / UI

Minimal local Vue page. Single-page, weapon-first.

**Header / controls:**
- Class picker.
- Meta state config (masteries, gear, account upgrades — reuse `MetaUpgradesPanel` or its successor).
- Sim params (pick budget = dive length; sim seeds per policy candidate; discovery search budget).
- Run button.

**Body:**
- **Archetype leaderboard.** Top-N archetypes ranked by combined score. Columns: class + roster summary, combined score, `P20` / `P50` / `P90` DPS, emergent roles summary ("Bulldog carry, Leadstorm support"), one-line headline.
- **Drill-down on click.** For a selected archetype:
  - Roster detail (class + 3 weapons).
  - **Translated heuristic** (per-weapon target display values, OC preferences, lag-chase rule — see Heuristic translation section).
  - **Emergent shape:** which weapons the discovered policy actually pushed to 18 / 12 / 6, and which OCs it most commonly took.
  - Score distribution histogram (the K Monte Carlo samples).
  - Sample winning trajectory (per-level pick log).
  - Glass-box: the raw policy weights, the offer-model assumptions used, the seed for the trajectory shown.

The UI is functional, not polished. No drawers, no animations, no marketing surfaces.

## Meta state as input

Masteries, gear, and account-level upgrades are loaded as state and feed into the sim's base stats and offer pool. As the user's meta progression evolves, the recommendations shift — re-run the sim to refresh.

The UI provides a simple editor for meta state. Persistence is local (localStorage is fine).

## Implementation slices

Slices are sized for a fresh agent to be briefed against. They are coarse — refine as we go.

### Slice 1 — Foundations (TS side)
- Finish the in-flight stat-system migration (`src/stores/playerStats.ts`, `src/stores/weaponSlotStats.ts`) enough that DPS can be computed from a stat bucket correctly. Land the in-game-values bugfix on the current branch.
- This is the substrate the Rust sim will mirror — getting the math right here means the Rust port has a known-correct reference.
- Add a JSON export step that snapshots the TS data layer (weapons, OCs, stat definitions, offer model) to a file the Rust service can load at startup.

### Slice 2 — Offer model + Rust sim service (single-archetype)
- Author a first-cut offer model (`src/data/offerModel.ts`).
- Stand up the Rust sim crate. Set up `cargo`, the HTTP server (`axum` or similar), and the JSON request/response schema shared with the TS client.
- Port the DPS / stat-bucket math from Slice 1's TS into Rust. Validate parity against the TS reference for a handful of fixed inputs (regression test).
- Implement the inner sim loop in Rust: given (archetype, policy weights, seed), return final DPS + trajectory.
- Hand-code 1–2 toy policies in the request payload for sanity-checking. No discovery yet.
- Done when: for a chosen archetype, the Vue UI can POST to the sim service and receive a stable, interpretable DPS distribution from 100 sim runs that roughly matches the author's intuition for that build.

### Slice 3 — Discovery layer
- Parameterize the policy (one flat weight vector: per-weapon level weights + per-stat weights).
- Implement random sampling + top-K refinement over policy weights.
- For one archetype, produce a discovered policy whose score beats the hand-coded baselines from Slice 2.
- Done when: discovery reliably finds better-than-baseline policies for a fixed archetype.

### Slice 4 — Heuristic translation
- Implement the behavioral extraction pipeline: run the discovered policy through K sims, aggregate end-state stats and weapon levels, derive per-weapon display values from base stats.
- Compute OC preferences from observed sim choices (how often each OC was picked at unlock).
- Render the heuristic in the format defined in **Heuristic translation** above (per-weapon target values + OC preferences + lag-chase rule).
- Done when: reading the translated heuristic for an archetype gives the author actionable mid-dive guidance (i.e., they can look at their in-game stat screen and know what to take).

### Slice 5 — Archetype enumeration + leaderboard
- Enumerate plausible archetypes (prune obviously-dominated ones).
- Run discovery per archetype. Aggregate into a ranked leaderboard.
- Build the UI for browsing the leaderboard and drilling down.
- Done when: the author can launch the tool, pick a class, and read a ranked list of archetypes with their associated heuristics.

### Slice 6 — Tuning the offer model
- This isn't really a "slice" — it's the long-running activity of comparing the tool's recommendations to play experience and adjusting `offerModel.ts` (and any policy parameters) accordingly.
- Treat the sim as a hypothesis and the dive as a test. When they diverge, the offer model is the first suspect.

## Open questions

These need answering as we go; the doc should be updated when they're settled.

1. **Offer model fidelity.** How wrong is the initial hand-authored distribution? Plan for substantial revisions as we learn.
2. **Policy parameterization.** Linear scoring with a single weight vector and state-aware contributions is the v1 bet. Phase-dependence and OC-conditional weights were explicitly considered and dropped — revisit only if discovered policies feel underpowered for early or late dive specifically.
3. **Discovery method.** Random + top-K is the v1 bet. May need to upgrade to Bayesian / evolutionary if the search becomes too expensive or too noisy.
4. **OC selection at unlock.** v1 uses greedy on current-state DPS contribution. May be wrong if a "worse-now" OC is genuinely better long-term; if so, add per-OC weights to the policy.
5. **Heuristic translation accuracy.** The behavioral-extraction approach assumes the policy's *typical* outcome is what the player should aim for. Variance across dives is handled by the lag-chase rule, but extreme luck cases (legendary early) might shift play meaningfully. Watch for cases where the targets don't match good play.
6. **Weapon pool data.** Full per-weapon stats, OC pools, and display-value derivation formulas need to be authored. Scope unknown until inventoried.
7. **Pick budget.** Default 60 is a guess. Revisit when the author's first archetype is fully modeled.

## What this replaces

This doc supersedes (all now deleted):

- `plans/BUILD_LAB.md` — deterministic-optimization-over-reachable-builds direction; rejected because it ignored offer randomness.
- `SPEC.md` — pre-pivot calculator spec.
- `UI_V2_DESIGN.md` — pre-pivot UI redesign.
- `NEW_STAT_SYSTEM.md` — the stat-system rewrite is now an implementation concern (Slice 1), not a separate plan.
