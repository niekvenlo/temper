import { beforeEach, vi, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import App from './App.vue'
import PostView from './views/PostView.vue'
import ActionView from './views/ActionView.vue'
import type { Post } from './types'

const response = {
  isLoading: false,
  isError: false,
  data: { value: [] as Post[] }
}
vi.mock('vue-query', () => ({
  useQuery: () => response,
  useQueryClient: () => ({
    setDefaultOptions: () => {}
  })
}))

beforeEach(() => {
  response.isLoading = false
  response.isError = false
  response.data = { value: [] }
})

it('should render both main components', () => {
  response.isLoading = true
  const wrapper = shallowMount(App, {
    propsData: {}
  })
  expect(wrapper.findComponent(PostView).exists()).toBeTruthy()
  expect(wrapper.findComponent(ActionView).exists()).toBeTruthy()
})

it('should update the actionHistory when a move-post event is received', () => {
  response.isLoading = true
  const wrapper = shallowMount(App, {
    propsData: {}
  })
  wrapper.findComponent(PostView).trigger('move-post', {
    ts: 1702400022000,
    postId: 4,
    direction: 'down',
    index: 7
  })
  // @ts-ignore
  expect(wrapper.vm.actionsHistory).toMatchObject([
    {
      description: 'Moved post 4 down from index 8 to index 9',
      direction: 'down',
      index: 7,
      postId: 4,
      type: 'move',
      ts: 1702400022000
    }
  ])
})

it('should update the actionHistory when a time-travel event is received', () => {
  response.isLoading = true
  const wrapper = shallowMount(App, {
    propsData: {}
  })
  wrapper.findComponent(PostView).trigger('move-post', {
    ts: 1702400022000,
    postId: 4,
    direction: 'down',
    index: 7
  })
  wrapper.findComponent(ActionView).trigger('time-travel', { ts: 1702400022000 })
  // @ts-ignore
  expect(wrapper.vm.actionsHistory).toMatchObject([])
  expect(wrapper.findComponent(ActionView).exists()).toBeTruthy()
})
