import { beforeEach, vi, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ActionView from './ActionView.vue'
import type { Post } from '../types'

const response = {
  isLoading: false,
  isError: false,
  data: { value: [] as Post[] }
}
vi.mock('vue-query', () => ({
  useQuery: () => response
}))

beforeEach(() => {
  response.isLoading = false
  response.isError = false
  response.data = { value: [] }
})

it('should not render any buttons if no actions are provided', () => {
  response.isLoading = true
  const wrapper = shallowMount(ActionView, {
    propsData: {
      actions: []
    }
  })
  expect(wrapper.find('button').exists()).toBeFalsy()
})

it('should render a button if an action is provided', () => {
  response.isError = true
  const wrapper = shallowMount(ActionView, {
    propsData: {
      actions: [
        {
          ts: 1702400022000,
          postId: 3,
          type: 'move',
          direction: 'down',
          description: 'description'
        }
      ]
    }
  })
  expect(wrapper.find('button').exists()).toBeTruthy()
})

it('should emit a time-travel event when a button is clicked', () => {
  response.isError = true
  const wrapper = shallowMount(ActionView, {
    propsData: {
      actions: [
        {
          ts: 1702400022000,
          postId: 3,
          type: 'move',
          direction: 'down',
          description: 'description'
        }
      ]
    }
  })
  wrapper.find('button').trigger('click')
  expect(wrapper.emitted('time-travel')?.length).toBe(1)
})
