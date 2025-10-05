import { type Weapon, type CharacterStats, WeaponTag } from './types'

export const defaultCharacterStats: CharacterStats = {
  critChance: 0.05,
  critDamage: 2.0
}

export const weapons: Weapon[] = [
  {
    name: 'Deepcore GK2',
    baseDmg: 35,
    fireRate: 4.62,
    clipSize: 30,
    reloadTime: 4,
    tags: [WeaponTag.kinetic, WeaponTag.projectile],
  },
  {
    name: 'Jury-Rigged Boomstick',
    baseDmg: 60,
    fireRate: 2,
    clipSize: 2,
    reloadTime: 4,
    tags: [WeaponTag.kinetic, WeaponTag.projectile],
  },
  {
    name: 'Zhukov NUK17',
    baseDmg: 22,
    fireRate: 6.67,
    clipSize: 20,
    reloadTime: 1,
    tags: [WeaponTag.kinetic, WeaponTag.projectile],
  },
  {
    name: 'M1000 Classic',
    baseDmg: 140,
    fireRate: 0.45,
    clipSize: 6,
    reloadTime: 4,
    tags: [WeaponTag.kinetic, WeaponTag.projectile],
  },
]