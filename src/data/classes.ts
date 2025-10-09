import type { CharacterStats } from './types'
import { Class } from './types'

export const classBaseStats: Record<Class, Partial<CharacterStats>> = {
  [Class.scout]: {
    health: 120,
    dodgeChance: 0.05,
    critChance: 0.05,
    critDamage: 2.0
  },
  [Class.gunner]: {
    health: 160,
    armor: 10,
    critChance: 0.05,
    critDamage: 1.5
  },
  [Class.engineer]: {
    health: 130,
    xpGain: 0.05,
    critChance: 0.05,
    critDamage: 1.5
  },
  [Class.driller]: {
    health: 145,
    critChance: 0.05,
    critDamage: 1.5,
    miningSpeed: 0.20
  }
}
