import { it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ActionButton from './ActionButton.vue'

it('should render an up button correctly', () => {
  const wrapper = shallowMount(ActionButton, {})
  expect(wrapper.find('button').exists()).toBeTruthy()
  expect(wrapper.find('button.up svg').exists()).toBeTruthy()
  expect(wrapper.find('button.down svg').exists()).toBeFalsy()
})

it('should render a down button correctly', () => {
  const wrapper = shallowMount(ActionButton, {
    propsData: {
      down: true
    }
  })
  expect(wrapper.find('button svg').exists()).toBeTruthy()
  expect(wrapper.find('button.down svg').exists()).toBeTruthy()
  expect(wrapper.find('button.up svg').exists()).toBeFalsy()
})
