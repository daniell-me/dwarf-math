import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmptyWeaponSlotV2 from './EmptyWeaponSlotV2.vue'
import type { Weapon } from '@/data/types'
import { WeaponTag, Class } from '@/data/types'

const mockWeapons: Weapon[] = [
  {
    id: 'weapon-1',
    name: 'Weapon One',
    baseDmg: 100,
    fireRate: 5,
    clipSize: 30,
    reloadTime: 2.5,
    class: Class.gunner,
    tags: [WeaponTag.all]
  },
  {
    id: 'weapon-2',
    name: 'Weapon Two',
    baseDmg: 50,
    fireRate: 10,
    clipSize: 60,
    reloadTime: 2.0,
    class: Class.scout,
    tags: [WeaponTag.all]
  }
]

describe('EmptyWeaponSlotV2', () => {
  it('should render the component', () => {
    const wrapper = mount(EmptyWeaponSlotV2, {
      props: {
        slotIndex: 0,
        availableWeapons: mockWeapons
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should display correct slot number', () => {
    const wrapper = mount(EmptyWeaponSlotV2, {
      props: {
        slotIndex: 2,
        availableWeapons: mockWeapons
      }
    })
    expect(wrapper.text()).toContain('Slot 3')
  })

  it('should render select element with available weapons', () => {
    const wrapper = mount(EmptyWeaponSlotV2, {
      props: {
        slotIndex: 0,
        availableWeapons: mockWeapons
      }
    })

    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)

    const options = select.findAll('option')
    // +1 for the default "+ Add Weapon" option
    expect(options.length).toBe(mockWeapons.length + 1)
    expect(options[0].text()).toBe('+ Add Weapon')
    expect(options[1].text()).toBe('Weapon One')
    expect(options[2].text()).toBe('Weapon Two')
  })

  it('should emit selectWeapon event when weapon is selected', async () => {
    const wrapper = mount(EmptyWeaponSlotV2, {
      props: {
        slotIndex: 0,
        availableWeapons: mockWeapons
      }
    })

    const select = wrapper.find('select')
    await select.setValue('Weapon One')

    expect(wrapper.emitted('selectWeapon')).toBeTruthy()
    expect(wrapper.emitted('selectWeapon')?.length).toBe(1)
    expect(wrapper.emitted('selectWeapon')?.[0][0]).toEqual(mockWeapons[0])
  })

  it('should not emit event when default option is selected', async () => {
    const wrapper = mount(EmptyWeaponSlotV2, {
      props: {
        slotIndex: 0,
        availableWeapons: mockWeapons
      }
    })

    const select = wrapper.find('select')
    await select.setValue('')

    expect(wrapper.emitted('selectWeapon')).toBeFalsy()
  })

  it('should display empty slot when no weapons available', () => {
    const wrapper = mount(EmptyWeaponSlotV2, {
      props: {
        slotIndex: 0,
        availableWeapons: []
      }
    })

    const select = wrapper.find('select')
    const options = select.findAll('option')
    expect(options.length).toBe(1)
    expect(options[0].text()).toBe('+ Add Weapon')
  })
})
