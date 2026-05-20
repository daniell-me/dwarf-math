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

**Starting parameterization** (subject to refinement once we see what the sim produces):

```
score(option) =
    Σ_w∈roster  w_weaponLevel[w]   × isWeaponLevelPickFor(option, w)
  + w_damage    × damageContribution(option)
  + w_fireRate  × fireRateContribution(option)
  + w_crit      × critContribution(option)
  + w_<other stats> × ...
```

The weights `w_*` may be **phase-dependent** (early / mid / late dive) — i.e. the policy is really 3 weight vectors, one per phase. Phase boundaries are themselves discoverable parameters.

**Role is emergent from `w_weaponLevel[w]`.** A high weight on a weapon means the policy reliably picks its level-ups, pushing it toward 18 (carry behavior). A low weight leaves it stalled at 6 or 12 (support behavior). The policy doesn't need an explicit "this is a carry" parameter — the level-up weight does the work.

**OC selection** at unlock milestones (6/12/18) does not need policy weights in v1. When 2 OCs are offered, the sim takes the higher-ranked one by an authored per-weapon default ranking (`src/data/ocRanking.ts` or similar). This is a simplification — if it proves to matter, OC preferences can be added as policy parameters later.

## The simulator (inner loop)

Given (archetype, policy weights, meta state, seed), simulate a single dive:

1. Initialize state: starting weapon, meta-modified base stats, 0 picks taken.
2. For each level-up `1..N` (default `N = 60`, configurable):
   a. Sample 3 offers from the **offer model** (see below).
   b. Apply policy: score each offer, pick the highest.
   c. Update state (weapon levels, stats).
   d. If a weapon hits an OC milestone (6, 12, 18), sample 2 OCs from that weapon's pool. Pick the higher-ranked one by the weapon's authored default ranking. (See policy section for why OC choice is not policy-parameterized in v1.)
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

1. Define the policy parameter space (weights, phase boundaries).
2. Search the space — start with random sampling + top-K refinement; upgrade to Bayesian optimization or evolutionary search only if necessary.
3. Score each candidate policy via **Monte Carlo evaluation** (see section above): K sim seeds with CRN, weighted-percentile score.
4. Return the best policy and its score distribution.

The result per archetype is `(best_policy_weights, score_distribution, representative_trajectories)`.

**Heuristic translation.** A policy's weights are translated into human-readable rules at output time, e.g.:

- "Until level 15, take any weapon-level pick for your slot-2 weapon."
- "From level 15 to 30, prioritize damage > fire rate > crit on global stats."
- "Skip crit until your first carry is at level 12."

This translation layer is the deliverable — it's what makes the sim useful as a heuristic-bootstrap tool. It is a non-trivial design problem in its own right.

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
  - **Emergent shape:** which weapons the discovered policy actually pushed to 18 / 12 / 6, and which OCs it most commonly took.
  - Discovered policy → translated heuristic ("rules of thumb" view, in plain English).
  - Score distribution histogram (the K Monte Carlo samples).
  - Sample winning trajectory (per-level pick log).
  - Glass-box: the raw policy weights, the offer-model assumptions used, the seed for the trajectory shown.

The UI is functional, not polished. No drawers, no animations, no marketing surfaces.

## Meta state as input

Masteries, gear, and account-level upgrades are loaded as state and feed into the sim's base stats and offer pool. As the user's meta progression evolves, the recommendations shift — re-run the sim to refresh.

The UI provides a simple editor for meta state. Persistence is local (localStorage is fine).

## Implementation slices

Slices are sized for a fresh agent to be briefed against. They are coarse — refine as we go.

### Slice 1 — Foundations
- Finish the in-flight stat-system migration (`src/stores/playerStats.ts`, `src/stores/weaponSlotStats.ts`) enough that the sim has a clean substrate for "apply a bucket of stats, get a DPS number." Land the in-game-values bugfix on the current branch.
- This is genuinely a prerequisite for everything else — the sim's atomic operation is `state + pick → new state + new DPS`, and that operation needs to be correct.

### Slice 2 — Offer model + single-archetype simulator
- Author a first-cut offer model (`src/data/offerModel.ts`).
- Implement the inner sim loop: given (archetype, policy weights, seed), return final DPS + trajectory.
- Hand-code 1–2 toy policies for sanity-checking. No discovery yet.
- Done when: for a chosen archetype, running the sim 100 times produces a stable, interpretable DPS distribution that roughly matches the author's intuition for that build.

### Slice 3 — Discovery layer
- Parameterize the policy (linear scoring function with optional phase weights).
- Implement random sampling + top-K refinement over policy weights.
- For one archetype, produce a discovered policy whose score beats the hand-coded baselines from Slice 2.
- Done when: discovery reliably finds better-than-baseline policies for a fixed archetype.

### Slice 4 — Heuristic translation
- Translate discovered policy weights into a readable rule set ("until level X, prioritize Y").
- This is a design problem — likely iterate by reading discovered weights and writing a translator that captures the patterns.
- Done when: reading the translated heuristic for an archetype feels useful and actionable to the author.

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
2. **Policy parameterization.** Linear scoring is the v1 bet. Is it expressive enough? Likely needs phase-dependence; possibly needs non-linearity (e.g. "take OC unlock at any cost"). Iterate.
3. **Discovery method.** Random + top-K is the v1 bet. May need to upgrade to Bayesian / evolutionary if the search becomes too expensive or too noisy.
4. **Heuristic translation.** Genuine open design problem. Worth prototyping early on a single discovered policy to see what shape the rules take.
5. **Weapon pool data.** Full per-weapon stats and per-weapon OC pools need to be authored. Scope unknown until inventoried.
6. **Pick budget.** Default 60 is a guess. Revisit when the author's first archetype is fully modeled.

## What this replaces

This doc supersedes (all now deleted):

- `plans/BUILD_LAB.md` — deterministic-optimization-over-reachable-builds direction; rejected because it ignored offer randomness.
- `SPEC.md` — pre-pivot calculator spec.
- `UI_V2_DESIGN.md` — pre-pivot UI redesign.
- `NEW_STAT_SYSTEM.md` — the stat-system rewrite is now an implementation concern (Slice 1), not a separate plan.
