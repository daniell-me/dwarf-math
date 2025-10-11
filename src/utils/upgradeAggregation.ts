import type { Weapon, Upgrade, Stat, WeaponTag } from '@/data/types'
import type { SelectedUpgrade } from '@/stores/selectedUpgrades'
import { getUpgradeValue } from './weaponFunctions'

/**
 * Aggregates all mid-dive upgrades (weapon-specific + global) for a given weapon.
 * All upgrades sum additively within the mid-dive bucket.
 *
 * @param weaponId - The ID of the weapon to aggregate upgrades for
 * @param weapon - The weapon object (for tag matching)
 * @param selectedUpgrades - All selected weapon-specific upgrades from the store
 * @param globalUpgrades - All global upgrade counts from the store
 * @param allUpgrades - Complete list of all available upgrades (for looking up values)
 * @returns Object mapping each Stat to its total additive bonus (e.g., { dmg: 0.50, fireRate: 0.20 })
 */
export function aggregateMidDiveUpgrades(
  weaponId: string,
  weapon: Weapon,
  selectedUpgrades: SelectedUpgrade[],
  globalUpgrades: Record<string, number>,
  allUpgrades: Upgrade[]
): Partial<Record<Stat, number>> {
  const aggregated: Partial<Record<Stat, number>> = {}

  // Helper to add bonus to aggregated totals
  const addBonus = (stat: Stat, value: number) => {
    aggregated[stat] = (aggregated[stat] ?? 0) + value
  }

  // 1. Aggregate weapon-specific upgrades from selectedUpgrades store
  const weaponSpecificUpgrades = selectedUpgrades.filter(u => u.weaponId === weaponId)
  for (const selectedUpgrade of weaponSpecificUpgrades) {
    // Find the upgrade definition to get the stat
    const upgradeDefinition = allUpgrades.find(u => u.name === selectedUpgrade.upgradeName)
    if (upgradeDefinition) {
      addBonus(upgradeDefinition.stat, selectedUpgrade.value)
    }
  }

  // 2. Aggregate global upgrades from globalUpgrades store
  // Parse the stored keys back to upgrade data and check if they apply to this weapon
  for (const [key, count] of Object.entries(globalUpgrades)) {
    if (count === 0) continue

    // Key format: "name-tags-rarity"
    const parts = key.split('-')
    const rarity = parts[parts.length - 1]
    const name = parts.slice(0, parts.length - 2).join('-')
    const tagsStr = parts[parts.length - 2]
    const tags = tagsStr === 'no-tags' ? [] : tagsStr.split(',') as WeaponTag[]

    // Find the upgrade definition
    const upgradeDefinition = allUpgrades.find(u =>
      u.name === name &&
      JSON.stringify(u.tags) === JSON.stringify(tags)
    )

    if (!upgradeDefinition) continue

    // Check if this upgrade applies to the weapon
    if (!doesUpgradeApplyToWeapon(upgradeDefinition, weapon)) continue

    // Get the upgrade value and add it (multiplied by count)
    const value = getUpgradeValue(upgradeDefinition, rarity as any)
    if (value !== undefined) {
      addBonus(upgradeDefinition.stat, value * count)
    }
  }

  return aggregated
}

/**
 * Checks if an upgrade applies to a given weapon based on tag matching.
 *
 * @param upgrade - The upgrade to check
 * @param weapon - The weapon to check against
 * @returns true if the upgrade applies to this weapon
 */
export function doesUpgradeApplyToWeapon(upgrade: Upgrade, weapon: Weapon): boolean {
  // Empty tags array means it doesn't apply to any weapon (player-only upgrades)
  if (upgrade.tags.length === 0) return false

  // 'all' tag applies to every weapon
  if (upgrade.tags.includes('all' as WeaponTag)) return true

  // Check if the weapon has any of the upgrade's tags
  return upgrade.tags.some(tag => weapon.tags.includes(tag))
}
