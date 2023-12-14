import { beforeEach, vi, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import PostView from './PostView.vue'
import ActionButton from '../components/ActionButton.vue'
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

it('should show a loading indicator', () => {
  response.isLoading = true
  const wrapper = shallowMount(PostView, {
    propsData: {
      actions: []
    }
  })
  expect(wrapper.find('h2.loading').exists()).toBeTruthy()
  expect(wrapper.find('h2.loading').text()).toBe('Loading posts ...')
})

it('should show an error indicator', () => {
  response.isError = true
  const wrapper = shallowMount(PostView, {
    propsData: {
      actions: []
    }
  })
  expect(wrapper.find('h2.error').exists()).toBeTruthy()
  expect(wrapper.find('h2.error').text()).toBe('Apologies. Something went wrong ...')
})

it('should show no warning indicators', () => {
  const wrapper = shallowMount(PostView, {
    propsData: {
      actions: []
    }
  })
  expect(wrapper.find('h2.list').exists()).toBeTruthy()
})

it('should render posts', () => {
  response.data = {
    value: [
      {
        id: 3,
        title: 'title',
        body: 'body',
        userId: 5
      },
      {
        id: 7,
        title: '_title',
        body: '_body',
        userId: 5
      }
    ]
  }
  const wrapper = shallowMount(PostView, {
    propsData: {
      actions: []
    }
  })
  expect(wrapper.find('section').text()).toBe(
    `Sortable Post ListPost 3: title bodyPost 7: _title _body`
  )
})

it('should re-order posts based on actions', () => {
  response.data = {
    value: [
      {
        id: 3,
        title: 'title',
        body: 'body',
        userId: 5
      },
      {
        id: 7,
        title: '_title',
        body: '_body',
        userId: 5
      }
    ]
  }
  const wrapper = shallowMount(PostView, {
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
  expect(wrapper.find('section').text()).toBe(
    `Sortable Post ListPost 7: _title _bodyPost 3: title body`
  )
})

it('should emit a move-post event when a button is clicked', () => {
  response.data = {
    value: [
      {
        id: 3,
        title: 'title',
        body: 'body',
        userId: 5
      },
      {
        id: 7,
        title: '_title',
        body: '_body',
        userId: 5
      }
    ]
  }
  const wrapper = shallowMount(PostView, {
    propsData: {
      actions: []
    }
  })
  const [button1, button2] = wrapper.findAllComponents(ActionButton)
  button1.trigger('click')
  expect(wrapper.emitted('move-post')?.length).toBe(1)
  button2.trigger('click')
  expect(wrapper.emitted('move-post')?.length).toBe(2)
})
