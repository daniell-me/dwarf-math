import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeaponStats from './WeaponStats.vue'
import type { Weapon } from '@/data/types'
import { WeaponTag, Class } from '@/data/types'

const mockWeapon: Weapon = {
  id: 'test-weapon',
  name: 'Test Weapon',
  baseDmg: 100,
  fireRate: 5,
  clipSize: 30,
  reloadTime: 2.5,
  class: Class.gunner,
  tags: [WeaponTag.all]
}

describe('WeaponStats', () => {
  it('should render the component', () => {
    const wrapper = mount(WeaponStats, {
      props: {
        weapon: mockWeapon,
        currentDPS: 450.5
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should display weapon name', () => {
    const wrapper = mount(WeaponStats, {
      props: {
        weapon: mockWeapon,
        currentDPS: 450.5
      }
    })
    expect(wrapper.find('.weapon-name').text()).toBe('Test Weapon')
  })

  it('should display current DPS with one decimal place', () => {
    const wrapper = mount(WeaponStats, {
      props: {
        weapon: mockWeapon,
        currentDPS: 450.567
      }
    })
    const dpsValue = wrapper.find('.current-dps .value')
    expect(dpsValue.text()).toBe('450.6')
  })

  it('should display all base stats correctly', () => {
    const wrapper = mount(WeaponStats, {
      props: {
        weapon: mockWeapon,
        currentDPS: 450.5
      }
    })

    const statRows = wrapper.findAll('.stat-row')
    expect(statRows.length).toBe(4)

    // Base Damage
    expect(statRows[0].find('.stat-label').text()).toBe('Base Damage:')
    expect(statRows[0].find('.stat-value').text()).toBe('100')

    // Fire Rate
    expect(statRows[1].find('.stat-label').text()).toBe('Fire Rate:')
    expect(statRows[1].find('.stat-value').text()).toBe('5/s')

    // Clip Size
    expect(statRows[2].find('.stat-label').text()).toBe('Clip Size:')
    expect(statRows[2].find('.stat-value').text()).toBe('30')

    // Reload Time
    expect(statRows[3].find('.stat-label').text()).toBe('Reload Time:')
    expect(statRows[3].find('.stat-value').text()).toBe('2.5s')
  })

  it('should not show remove button when removable is false', () => {
    const wrapper = mount(WeaponStats, {
      props: {
        weapon: mockWeapon,
        currentDPS: 450.5,
        removable: false
      }
    })
    expect(wrapper.find('.remove-button').exists()).toBe(false)
  })

  it('should show remove button when removable is true', () => {
    const wrapper = mount(WeaponStats, {
      props: {
        weapon: mockWeapon,
        currentDPS: 450.5,
        removable: true
      }
    })
    expect(wrapper.find('.remove-button').exists()).toBe(true)
  })

  it('should emit remove event when remove button is clicked', async () => {
    const wrapper = mount(WeaponStats, {
      props: {
        weapon: mockWeapon,
        currentDPS: 450.5,
        removable: true
      }
    })

    await wrapper.find('.remove-button').trigger('click')
    expect(wrapper.emitted('remove')).toBeTruthy()
    expect(wrapper.emitted('remove')?.length).toBe(1)
  })
})
