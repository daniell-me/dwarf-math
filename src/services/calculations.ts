import type { Upgrade, Rarity } from '@/data/types'

export function calculateDPS(
  dmg: number,
  fireRate: number,
  reloadTime: number,
  clipSize: number,
  critChance: number,
  critDmg: number
): number {
  if (reloadTime === 0) {
    throw new Error('calculateDPS: reloadTime cannot be 0')
  }

  const dmgPerShot = dmg * (1 + critChance * (critDmg - 1))
  // shots fire immediately on reload
  const cycleTime = reloadTime + (clipSize - 1) / fireRate
  const dps = (dmgPerShot * clipSize) / cycleTime
  // round to 1dp
  return Math.round(dps * 10) / 10
}

export function calculateDPSWithUpgrade(
  dmg: number,
  fireRate: number,
  reloadTime: number,
  clipSize: number,
  critChance: number,
  critDmg: number,
  upgrade: Upgrade,
  rarity: Rarity
): number {
  const upgradeValue = upgrade.values[rarity]
  if (upgradeValue === undefined) {
    throw new Error(`calculateDPSWithUpgrade: upgrade '${upgrade.name}' does not have a value for rarity '${rarity}'`)
  }

  // Apply upgrade to the appropriate stat
  let modifiedDmg = dmg
  let modifiedFireRate = fireRate
  let modifiedReloadTime = reloadTime

  switch (upgrade.stat) {
    case 'dmg':
      modifiedDmg = dmg * (1 + upgradeValue)
      break
    case 'fireRate':
      modifiedFireRate = fireRate * (1 + upgradeValue)
      break
    case 'reloadSpeed':
      modifiedReloadTime = reloadTime * (1 - upgradeValue)
      break
    // Add other cases as needed
  }

  return calculateDPS(
    modifiedDmg,
    modifiedFireRate,
    modifiedReloadTime,
    clipSize,
    critChance,
    critDmg
  )
}