import { vi, it, expect } from 'vitest'
import { getPosts } from './data-access'

const fetch = vi.fn()
globalThis.fetch = fetch

it('should check that getPosts hits up the correct endpoint', () => {
  fetch.mockResolvedValue({ json: () => 'data' })
  getPosts()
  expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts')
})
