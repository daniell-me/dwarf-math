import type { Weapon, Upgrade, WeaponTag } from '@/data/types'
import { WeaponTag as WeaponTagEnum } from '@/data/types'

export function getValidUpgradesForWeapon(weapon: Weapon, allUpgrades: Upgrade[]): Upgrade[] {
  return allUpgrades.filter(upgrade => {
    // If upgrade has 'all' tag, it applies to any weapon
    if (upgrade.tags.includes(WeaponTagEnum.all)) {
      return true
    }

    // Check if weapon and upgrade share any common tags
    return upgrade.tags.some(upgradeTag => weapon.tags.includes(upgradeTag))
  })
}

export function findWeaponByName(weapons: Weapon[], name: string): Weapon {
  const weapon = weapons.find(w => w.name === name)
  if (!weapon) {
    throw new Error(`Weapon not found: ${name}`)
  }
  return weapon
}