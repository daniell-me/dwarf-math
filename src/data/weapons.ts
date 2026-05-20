import { type Weapon, WeaponTag, Class } from './types'

const weaponsList: Weapon[] = [
  // ====================== Scout ======================
  {
    // Wiki-confirmed in detail (2026-05-19).
    id: 'zhukov',
    name: 'Zhukov NUK17',
    class: Class.scout,
    tags: [WeaponTag.kinetic, WeaponTag.light, WeaponTag.spray, WeaponTag.projectile],
    baseStats: {
      damage: 22,
      fireRate: 6.67,
      clipSize: 20,
      reloadTime: 1,
      range: 10,
      projectilesPerShot: 4,
      piercing: 4,
      potency: 10,
    },
    targeting: 'closest',
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). Wiki shows damage=100; fireRate not listed (throwable).
    id: 'cryo-grenade',
    name: 'Cryo Grenade',
    class: Class.scout,
    tags: [WeaponTag.cold, WeaponTag.throwable, WeaponTag.area, WeaponTag.explosive],
    baseStats: {
      damage: 100,
      clipSize: 1,
      reloadTime: 5,
      range: 10,
      explosionRadius: 4,
      potency: 60,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-19).
    id: 'boomstick',
    name: 'Jury-Rigged Boomstick',
    class: Class.scout,
    tags: [WeaponTag.kinetic, WeaponTag.medium, WeaponTag.spray, WeaponTag.projectile],
    baseStats: {
      damage: 60,
      fireRate: 2,
      clipSize: 2,
      reloadTime: 4,
      range: 7,
      projectilesPerShot: 7,
      piercing: 3,
    },
    targeting: 'closest',
    knockback: true,
  },
  {
    // Wiki-confirmed in detail (2026-05-19): every field below is from wiki.
    id: 'gk2',
    name: 'Deepcore GK2',
    class: Class.scout,
    tags: [WeaponTag.kinetic, WeaponTag.medium, WeaponTag.precise, WeaponTag.projectile],
    baseStats: {
      damage: 35,
      fireRate: 4.62,
      clipSize: 30,
      reloadTime: 4,
      range: 8,
      piercing: 4,
      projectilesPerShot: 1,
      potency: 12,
    },
    firingPattern: { type: 'burst', roundsPerVolley: 3 },
    targeting: 'closest',
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). Piercing=30 per wiki ("Pierced Enemies: 30").
    id: 'm1000',
    name: 'M1000 Classic',
    class: Class.scout,
    tags: [WeaponTag.kinetic, WeaponTag.medium, WeaponTag.precise, WeaponTag.projectile],
    baseStats: {
      damage: 140,
      fireRate: 0.45,
      clipSize: 6,
      reloadTime: 4,
      range: 15,
      piercing: 30,
      projectilesPerShot: 1,
      potency: 80,
    },
    targeting: 'highestHp',
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). Wiki damage=55 (prior code had 48). fireRate=5/s.
    id: 'stun-sweeper',
    name: 'Voltaic Stun Sweeper',
    class: Class.scout,
    tags: [WeaponTag.electric, WeaponTag.light, WeaponTag.throwable],
    baseStats: {
      damage: 55,
      fireRate: 5,
      clipSize: 1,
      reloadTime: 2,
      range: 12,
      potency: 22,
    },
    targeting: 'closest',
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). Tick rate 0.5s (not a traditional fireRate).
    // beamCount base=2. No fireRate listed on wiki — removed. clipSize not listed (beam weapon).
    id: 'thor',
    name: 'TH-0R Bug Taser',
    class: Class.scout,
    tags: [WeaponTag.electric, WeaponTag.light, WeaponTag.beam],
    baseStats: {
      damage: 35,
      reloadTime: 2,
      range: 8,
      beamCount: 2,
      potency: 22,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). Wiki damage=90 (prior code had 80). droneCount=4.
    id: 'cryo-guard',
    name: 'Arc-Tek Cryo Guard',
    class: Class.scout,
    tags: [WeaponTag.cold, WeaponTag.construct, WeaponTag.lasting, WeaponTag.drone],
    baseStats: {
      damage: 90,
      reloadTime: 4,
      range: 4,
      droneCount: 4,
      lifetime: 12,
      potency: 24,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). Burst size=5 rounds per volley.
    id: 'drak',
    name: 'Drak-25 Plasma Carbine',
    class: Class.scout,
    tags: [WeaponTag.plasma, WeaponTag.medium, WeaponTag.spray, WeaponTag.projectile],
    baseStats: {
      damage: 30,
      fireRate: 5,
      clipSize: 20,
      reloadTime: 4,
      range: 10,
      projectilesPerShot: 1,
      piercing: 4,
      potency: 12,
    },
    firingPattern: { type: 'burst', roundsPerVolley: 5 },
    targeting: 'closest',
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). Piercing=50 per wiki. Targets highest HP.
    id: 'boltshark',
    name: 'Nishanka Boltshark X-80',
    class: Class.scout,
    tags: [WeaponTag.acid, WeaponTag.electric, WeaponTag.medium, WeaponTag.precise, WeaponTag.projectile],
    baseStats: {
      damage: 68,
      fireRate: 1,
      clipSize: 6,
      reloadTime: 6,
      range: 12,
      projectilesPerShot: 1,
      piercing: 50,
      potency: 28,
    },
    targeting: 'highestHp',
    knockback: false,
  },

  // ====================== Gunner ======================
  {
    // Wiki-confirmed in detail (2026-05-19). damage=95, potency=32. Groundzone: 10 dmg/tick, 5s lifetime, 3-unit radius.
    id: 'incendiary-grenade',
    name: 'Incendiary Grenade',
    class: Class.gunner,
    tags: [WeaponTag.fire, WeaponTag.throwable, WeaponTag.lasting, WeaponTag.explosive, WeaponTag.groundzone],
    baseStats: {
      damage: 95,
      clipSize: 1,
      reloadTime: 6,
      range: 10,
      explosionRadius: 3,
      potency: 32,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). damage=28, clip=200, range=12, potency=7, piercing=4.
    id: 'minigun',
    name: '"Lead Storm" Powered Minigun',
    class: Class.gunner,
    tags: [WeaponTag.kinetic, WeaponTag.heavy, WeaponTag.spray, WeaponTag.projectile],
    baseStats: {
      damage: 28,
      fireRate: 20,
      clipSize: 200,
      reloadTime: 6,
      range: 12,
      potency: 7,
      piercing: 4,
      projectilesPerShot: 1,
    },
    targeting: 'moveDirection',
    knockback: true,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). damage=100, fireRate=0.83, range=14, potency=40, piercing=20.
    id: 'bulldog',
    name: '"Bulldog" Heavy Revolver',
    class: Class.gunner,
    tags: [WeaponTag.kinetic, WeaponTag.medium, WeaponTag.precise, WeaponTag.projectile],
    baseStats: {
      damage: 100,
      fireRate: 0.83,
      clipSize: 6,
      reloadTime: 3,
      range: 14,
      potency: 40,
      piercing: 20,
      projectilesPerShot: 1,
    },
    targeting: 'closest',
    knockback: true,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). Burst size=3 rounds per volley. Shoots in 4 directions.
    // potency=10, piercing=4, projectilesPerShot=4, range=8.
    id: 'brt7',
    name: 'BRT7 Burst Fire Gun',
    class: Class.gunner,
    tags: [WeaponTag.kinetic, WeaponTag.light, WeaponTag.spray, WeaponTag.projectile],
    baseStats: {
      damage: 28,
      fireRate: 4.62,
      clipSize: 24,
      reloadTime: 2,
      range: 8,
      potency: 10,
      piercing: 4,
      projectilesPerShot: 4,
    },
    firingPattern: { type: 'burst', roundsPerVolley: 3 },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). damage=24, fireRate=33.33, range=10. clipSize=1.
    // Fires projectiles in spiral pattern during its fuse lifetime.
    id: 'leadburster',
    name: 'Tactical Leadburster',
    class: Class.gunner,
    // Wiki includes projectile + lasting + spray on this throwable.
    tags: [WeaponTag.kinetic, WeaponTag.throwable, WeaponTag.lasting, WeaponTag.spray, WeaponTag.projectile],
    baseStats: {
      damage: 24,
      fireRate: 33.33,
      clipSize: 1,
      reloadTime: 6,
      range: 10,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). damage=140, range=12, piercing=4. Targets highestHp.
    id: 'thunderhead',
    name: '"Thunderhead" Heavy Autocannon',
    class: Class.gunner,
    // Wiki does NOT tag this explosive (despite the old code doing so). Trusting the wiki.
    tags: [WeaponTag.kinetic, WeaponTag.heavy, WeaponTag.precise, WeaponTag.projectile],
    baseStats: {
      damage: 140,
      fireRate: 2.86,
      clipSize: 20,
      reloadTime: 5,
      range: 12,
      piercing: 4,
      projectilesPerShot: 1,
    },
    targeting: 'highestHp',
    knockback: true,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). droneCount=2, potency=24, range=5, lifetime not listed separately.
    id: 'firefly',
    name: 'Firefly Hunter Drone',
    class: Class.gunner,
    tags: [WeaponTag.fire, WeaponTag.construct, WeaponTag.lasting, WeaponTag.drone],
    baseStats: {
      damage: 80,
      reloadTime: 4,
      range: 5,
      droneCount: 2,
      potency: 24,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). damage=60, clip=9, range=10, explosionRadius=1.5, potency=20.
    // Fires volleys targeting random enemies.
    id: 'hurricane',
    name: '"Hurricane" Guided Rocket System',
    class: Class.gunner,
    // Wiki does NOT include projectile; it's tagged area+explosive instead.
    tags: [WeaponTag.kinetic, WeaponTag.heavy, WeaponTag.spray, WeaponTag.area, WeaponTag.explosive],
    baseStats: {
      damage: 60,
      clipSize: 9,
      reloadTime: 6,
      range: 10,
      explosionRadius: 1.5,
      potency: 20,
    },
    targeting: 'random',
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). damage=18, range=10, turretCap=2, lifetime=10, potency=10.
    id: 'seismic-repulsor',
    name: 'Seismic Repulsor',
    class: Class.gunner,
    tags: [WeaponTag.kinetic, WeaponTag.construct, WeaponTag.area, WeaponTag.lasting, WeaponTag.turret],
    baseStats: {
      damage: 18,
      clipSize: 1,
      reloadTime: 6,
      range: 10,
      turretCap: 2,
      lifetime: 10,
      potency: 10,
    },
    knockback: true,
  },
  {
    // Wiki-confirmed in detail (2026-05-19). damage=80, clipSize=1, reloadTime=4, range=10, beamCount=1, lifetime=3s.
    // fireRate removed — beam weapon; tick-based. Previous fireRate=2 was incorrect.
    id: 'coil-gun',
    name: 'ArmsKore Coil Gun',
    class: Class.gunner,
    tags: [WeaponTag.kinetic, WeaponTag.medium, WeaponTag.beam, WeaponTag.lasting],
    baseStats: {
      damage: 80,
      clipSize: 1,
      reloadTime: 4,
      range: 10,
      beamCount: 1,
      lifetime: 3,
    },
    knockback: false,
  },

  // ====================== Engineer ======================
  {
    // Wiki-confirmed in detail (2026-05-20). damage=80/pellet, projectilesPerShot=5, piercing=8.
    // Warthog fires in player's facing direction — moveDirection targeting.
    id: 'warthog',
    name: '"Warthog" Auto 210',
    class: Class.engineer,
    tags: [WeaponTag.kinetic, WeaponTag.medium, WeaponTag.spray, WeaponTag.projectile],
    baseStats: {
      damage: 80,
      fireRate: 1,
      clipSize: 4,
      reloadTime: 1,
      range: 8,
      projectilesPerShot: 5,
      piercing: 8,
      potency: 10,
    },
    targeting: 'moveDirection',
    knockback: true,
  },
  {
    // Wiki-confirmed in detail (2026-05-19).
    id: 'turret',
    name: 'LMG Gun Platform',
    class: Class.engineer,
    tags: [WeaponTag.kinetic, WeaponTag.construct, WeaponTag.lasting, WeaponTag.turret, WeaponTag.projectile],
    baseStats: {
      damage: 20,
      fireRate: 3.33,
      reloadTime: 6,
      range: 10,
      piercing: 4,
      potency: 10,
      lifetime: 10,
      turretCap: 2,
      // clipSize omitted — LMG turret has no ammo limit during its lifetime.
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=26, droneCount=3, potency=14.
    // No fireRate (beam/construct weapon). No explicit lifetime listed on wiki.
    id: 'thunderbird',
    name: 'Hi-Volt Thunderbird',
    class: Class.engineer,
    tags: [WeaponTag.electric, WeaponTag.construct, WeaponTag.lasting, WeaponTag.drone],
    baseStats: {
      damage: 26,
      reloadTime: 4,
      range: 5,
      droneCount: 3,
      potency: 14,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=35, potency=16 (shock), piercing=4.
    id: 'stubby',
    name: '"Stubby" Voltaic SMG',
    class: Class.engineer,
    tags: [WeaponTag.electric, WeaponTag.light, WeaponTag.spray, WeaponTag.projectile],
    baseStats: {
      damage: 35,
      fireRate: 10,
      clipSize: 30,
      reloadTime: 2,
      range: 8,
      projectilesPerShot: 1,
      piercing: 4,
      potency: 16,
    },
    targeting: 'closest',
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=18, turretCap=3, lifetime=10, potency=10, range=5.
    // clipSize not listed separately — turretCap is the placement limit; using turretCap field.
    id: 'shock-fence',
    name: 'Voltaic Shock Fence',
    class: Class.engineer,
    tags: [WeaponTag.electric, WeaponTag.construct, WeaponTag.lasting, WeaponTag.turret],
    baseStats: {
      damage: 18,
      reloadTime: 6,
      range: 5,
      lifetime: 10,
      turretCap: 3,
      potency: 10,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=58 (wiki), potency=10, piercing=8, range=8.
    // Previous code had damage=44 — corrected per wiki.
    id: 'lok1',
    name: 'LOK-1 Smart Rifle',
    class: Class.engineer,
    tags: [WeaponTag.kinetic, WeaponTag.medium, WeaponTag.spray, WeaponTag.projectile],
    baseStats: {
      damage: 58,
      fireRate: 10,
      clipSize: 8,
      reloadTime: 3,
      range: 8,
      projectilesPerShot: 1,
      piercing: 8,
      potency: 10,
    },
    targeting: 'closest',
    knockback: true,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=140, fireRate=0.8, explosionRadius=3.2, range=10.
    // Previous code had damage=120, fireRate=0.4 — corrected per wiki.
    id: 'pgl',
    name: 'Deepcore PGL',
    class: Class.engineer,
    // Wiki tags this explosive (not projectile).
    tags: [WeaponTag.kinetic, WeaponTag.medium, WeaponTag.precise, WeaponTag.explosive],
    baseStats: {
      damage: 140,
      fireRate: 0.8,
      clipSize: 2,
      reloadTime: 4,
      range: 10,
      projectilesPerShot: 1,
      explosionRadius: 3.2,
    },
    targeting: 'closest',
    knockback: true,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=35, beamCount=1, lifetime=5, potency=16, range=10.
    // Two projectile balls connected by beam; infinitely pierces enemies. fireRate=5/s tick rate.
    // Previous code had damage=32, no range/lifetime/potency/beamCount — corrected.
    id: 'breach-cutter',
    name: 'Breach Cutter',
    class: Class.engineer,
    tags: [WeaponTag.plasma, WeaponTag.heavy, WeaponTag.beam, WeaponTag.lasting],
    baseStats: {
      damage: 35,
      clipSize: 1,
      reloadTime: 6,
      range: 10,
      beamCount: 1,
      lifetime: 5,
      potency: 16,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=28, beamCount=1, range=20, potency=10.
    // Beam bounces off terrain; no fireRate (continuous beam). No explicit lifetime listed.
    // Previous code had damage=25, fireRate=2, clipSize=1 — corrected per wiki.
    id: 'shard-diffractor',
    name: 'Shard Diffractor',
    class: Class.engineer,
    tags: [WeaponTag.plasma, WeaponTag.heavy, WeaponTag.beam, WeaponTag.lasting],
    baseStats: {
      damage: 28,
      reloadTime: 4,
      range: 20,
      beamCount: 1,
      potency: 10,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=75, explosionRadius=3, range=20, fuse=2s.
    // Previous code had damage=60, fireRate=0.17, range missing — corrected.
    // fireRate=0.17 retained as throw rate (same as other grenades).
    id: 'plasma-burster',
    name: 'Plasma Burster',
    class: Class.engineer,
    tags: [WeaponTag.plasma, WeaponTag.throwable, WeaponTag.area, WeaponTag.explosive],
    baseStats: {
      damage: 75,
      fireRate: 0.17,
      clipSize: 1,
      reloadTime: 6,
      range: 20,
      explosionRadius: 3,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=18, droneCount=2, potency=2, range=2.5.
    // reloadTime=8 per wiki (previous code had 6).
    id: 'shredder-grenade',
    name: 'Shredder Swarm Grenade',
    class: Class.engineer,
    tags: [WeaponTag.kinetic, WeaponTag.throwable, WeaponTag.lasting, WeaponTag.drone],
    baseStats: {
      damage: 18,
      clipSize: 1,
      reloadTime: 8,
      range: 2.5,
      droneCount: 2,
      potency: 2,
    },
    knockback: false,
  },

  // ====================== Driller ======================
  {
    // Wiki-confirmed in detail (2026-05-20). damage=40, beamCount=2, range=5, potency=12 (Burn).
    // Fires 2 rotating beams. No fireRate listed (beam/tick-based, tick=0.2s). Groundzone added by Sticky Fuel OC.
    id: 'flamethrower',
    name: 'CRSPR Flamethrower',
    class: Class.driller,
    tags: [WeaponTag.fire, WeaponTag.heavy, WeaponTag.beam, WeaponTag.lasting],
    baseStats: {
      damage: 40,
      reloadTime: 6,
      range: 5,
      beamCount: 2,
      potency: 12,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=190, range=120, explosionRadius=3.8.
    // fuse=1.5s (custom, no StatId). Destroys terrain.
    id: 'he-grenade',
    name: 'High Explosive Grenade',
    class: Class.driller,
    tags: [WeaponTag.kinetic, WeaponTag.throwable, WeaponTag.area, WeaponTag.explosive],
    baseStats: {
      damage: 190,
      fireRate: 0.17,
      clipSize: 1,
      reloadTime: 5,
      range: 120,
      explosionRadius: 3.8,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). Fires backward at enemies behind the player.
    // damage=42, range=10, potency=24, piercing=4, projectilesPerShot=1.
    id: 'subata',
    name: 'Subata 120',
    class: Class.driller,
    tags: [WeaponTag.kinetic, WeaponTag.light, WeaponTag.spray, WeaponTag.projectile],
    baseStats: {
      damage: 42,
      fireRate: 5,
      clipSize: 24,
      reloadTime: 1,
      range: 10,
      potency: 24,
      piercing: 4,
      projectilesPerShot: 1,
    },
    targeting: 'closest',
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=10, turretCap=2, lifetime=10, beamCount=1, range=4, potency=10 (Burn).
    // Stand still to deploy. No fireRate (beam/tick-based).
    id: 'krakatoa',
    name: 'Krakatoa Sentinel',
    class: Class.driller,
    tags: [WeaponTag.fire, WeaponTag.construct, WeaponTag.beam, WeaponTag.lasting, WeaponTag.turret],
    baseStats: {
      damage: 10,
      clipSize: 1,
      reloadTime: 6,
      range: 4,
      beamCount: 1,
      lifetime: 10,
      turretCap: 2,
      potency: 10,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=20, beamCount=1, range=5, lifetime=3, potency=12 (Corrode).
    // Leaves acid groundzones (2-unit radius, 3s lifetime, 2 dmg, 8 potency). No fireRate (beam/tick-based, tick=0.2s).
    id: 'sludge-pump',
    name: 'Corrosive Sludge Pump',
    class: Class.driller,
    tags: [WeaponTag.acid, WeaponTag.heavy, WeaponTag.beam, WeaponTag.lasting, WeaponTag.groundzone],
    baseStats: {
      damage: 20,
      reloadTime: 6,
      range: 5,
      beamCount: 1,
      lifetime: 3,
      potency: 12,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=110, beamCount=1, range=8, lifetime=8, potency=28 (Burn).
    // Wide cone beam; rotates to track closest enemy; can fire through terrain; unlimited pierce.
    // No fireRate (beam/tick-based, tick=0.33s). Previous damage=94 was incorrect.
    id: 'wave-cooker',
    name: 'Colette Wave Cooker',
    class: Class.driller,
    tags: [WeaponTag.fire, WeaponTag.medium, WeaponTag.beam, WeaponTag.lasting],
    baseStats: {
      damage: 110,
      reloadTime: 5,
      range: 8,
      beamCount: 1,
      lifetime: 8,
      potency: 28,
    },
    targeting: 'closest',
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=90, range=6, explosionRadius=3, potency=20, piercing=100.
    // Axes return to player. Targets closest. Knockback=yes.
    id: 'impact-axe',
    name: 'Impact Axe',
    class: Class.driller,
    tags: [WeaponTag.kinetic, WeaponTag.throwable, WeaponTag.explosive],
    baseStats: {
      damage: 90,
      fireRate: 1,
      clipSize: 3,
      reloadTime: 4,
      range: 6,
      explosionRadius: 3,
      potency: 20,
      piercing: 100,
      projectilesPerShot: 1,
    },
    targeting: 'closest',
    knockback: true,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=85 (burst), explosionRadius=3, range=10, potency=32 (Corrode).
    // Groundzone: acid, 3-unit radius, 5s lifetime, 3 dmg/tick, 16 potency. fuse=1.5s (no StatId → custom in OCs).
    id: 'neurotoxin-grenade',
    name: 'Neurotoxin Grenade',
    class: Class.driller,
    tags: [WeaponTag.acid, WeaponTag.throwable, WeaponTag.lasting, WeaponTag.area, WeaponTag.explosive, WeaponTag.groundzone],
    baseStats: {
      damage: 85,
      fireRate: 0.17,
      clipSize: 1,
      reloadTime: 6,
      range: 10,
      explosionRadius: 3,
      potency: 32,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=20, beamCount=2, range=5, lifetime=15, potency=16 (Slow).
    // Rotating beams that slow enemies. No fireRate (beam/tick-based, tick=0.2s).
    id: 'cryo-cannon',
    name: 'Cryo Cannon',
    class: Class.driller,
    tags: [WeaponTag.cold, WeaponTag.heavy, WeaponTag.beam, WeaponTag.lasting],
    baseStats: {
      damage: 20,
      reloadTime: 6,
      range: 5,
      beamCount: 2,
      lifetime: 15,
      potency: 16,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=60, droneCount=2, range=4, potency=24 (Corrode).
    // Drones orbit player at 4-unit distance, leaving acid groundzones (0.5-unit radius, 2s lifetime, 6 dmg/tick, 8 potency).
    // No explicit lifetime listed — drones persist until death/reload (Disposable Tech OC adds lifetime stat).
    id: 'viper',
    name: 'K1-P Viper Drone',
    class: Class.driller,
    tags: [WeaponTag.acid, WeaponTag.construct, WeaponTag.lasting, WeaponTag.drone, WeaponTag.groundzone],
    baseStats: {
      damage: 60,
      reloadTime: 4,
      range: 4,
      droneCount: 2,
      potency: 24,
    },
    knockback: false,
  },
  {
    // Wiki-confirmed in detail (2026-05-20). damage=125, range=10, potency=48, projectilesPerShot=1.
    // Bounces on terrain; targets groups of enemies. Previous damage=120 was incorrect.
    id: 'epc',
    name: 'Experimental Plasma Charger',
    class: Class.driller,
    tags: [WeaponTag.plasma, WeaponTag.light, WeaponTag.precise, WeaponTag.projectile],
    baseStats: {
      damage: 125,
      fireRate: 0.5,
      clipSize: 1,
      reloadTime: 4,
      range: 10,
      potency: 48,
      projectilesPerShot: 1,
    },
    targeting: 'closest',
    knockback: false,
  },

  // ====================== Demolisher ======================
  // TODO: numbers not yet entered for any Demolisher weapon — wiki audit needed.
  // Names + classes + tags are from the Equipment directory; baseStats are placeholder.
  {
    id: 'proximity-mines',
    name: 'Proximity Mines',
    class: Class.demolisher,
    tags: [WeaponTag.kinetic, WeaponTag.throwable, WeaponTag.construct, WeaponTag.area, WeaponTag.explosive],
    baseStats: {},
  },
  {
    id: 'twincoil',
    name: 'Twincoil Arc Burster',
    class: Class.demolisher,
    tags: [WeaponTag.electric, WeaponTag.light, WeaponTag.spray, WeaponTag.projectile],
    baseStats: {},
  },
  {
    id: 'chimera',
    name: 'Chimera Fragcannon',
    class: Class.demolisher,
    tags: [WeaponTag.kinetic, WeaponTag.heavy, WeaponTag.precise, WeaponTag.projectile],
    baseStats: {},
  },
  {
    id: 'dragonstorm',
    name: 'Dragonstorm Incinerator',
    class: Class.demolisher,
    tags: [WeaponTag.fire, WeaponTag.medium, WeaponTag.lasting, WeaponTag.beam, WeaponTag.groundzone],
    baseStats: {},
  },
  {
    id: 'voltaic-field',
    name: 'Voltaic Field Generator',
    class: Class.demolisher,
    tags: [WeaponTag.electric, WeaponTag.medium, WeaponTag.lasting, WeaponTag.groundzone],
    baseStats: {},
  },
  {
    id: 'slither-drones',
    name: 'Slither Drones',
    class: Class.demolisher,
    tags: [WeaponTag.kinetic, WeaponTag.construct, WeaponTag.lasting, WeaponTag.drone],
    baseStats: {},
  },
  {
    id: 'e1m1',
    name: 'E1M1 Caustic Scattergun',
    class: Class.demolisher,
    tags: [WeaponTag.acid, WeaponTag.medium, WeaponTag.spray, WeaponTag.projectile],
    baseStats: {},
  },
  {
    // Wiki-confirmed in detail (2026-05-19) — partial; groundzone fields deferred.
    id: 'toxic-sludge',
    name: 'Toxic Sludge Spreader',
    class: Class.demolisher,
    tags: [WeaponTag.acid, WeaponTag.heavy, WeaponTag.beam, WeaponTag.lasting, WeaponTag.groundzone],
    baseStats: {
      damage: 12,
      reloadTime: 5,
      beamCount: 2,
      range: 6,
      lifetime: 3,
    },
  },
  {
    id: 'springloaded-ripper',
    name: 'Springloaded Ripper',
    class: Class.demolisher,
    tags: [WeaponTag.kinetic, WeaponTag.light, WeaponTag.throwable, WeaponTag.spray, WeaponTag.projectile],
    baseStats: {},
  },
  {
    id: 'kaisong',
    name: 'Kaisong Scissor Ray',
    class: Class.demolisher,
    tags: [WeaponTag.kinetic, WeaponTag.medium, WeaponTag.beam, WeaponTag.lasting],
    baseStats: {},
  },
  {
    id: 'carrier-drone',
    name: 'Carrier Drone',
    class: Class.demolisher,
    tags: [WeaponTag.electric, WeaponTag.acid, WeaponTag.cold, WeaponTag.fire, WeaponTag.construct, WeaponTag.lasting, WeaponTag.drone],
    baseStats: {},
  },
]

// Generate weaponsMap from the array
export const weaponsMap: Record<string, Weapon> = Object.fromEntries(
  weaponsList.map(weapon => [weapon.id, weapon])
)

// Generate WeaponIds from the array
export const WeaponIds = Object.fromEntries(
  weaponsList.map(weapon => [weapon.id, weapon.id])
) as Record<string, string>

export const weapons: Weapon[] = weaponsList
