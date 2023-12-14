import type { Post } from '../types'

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  return response.json()
}
