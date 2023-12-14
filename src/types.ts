/* vue-query should be returning this type automatically, but it isn't */
import type { Ref } from 'vue'
export type VueQueryResponse<T> = {
  data: Ref<T | undefined>
  error: Ref<Error | undefined>
  isError: Ref<boolean>
  isFetching: Ref<boolean>
  isIdle: Ref<boolean>
  isLoading: Ref<boolean>
  isSuccess: Ref<boolean>
}

export type Post = {
  id: number
  userId: number
  title: string
  body: string
}

export type Action = {
  ts: number
  type: 'move' // Only one type, currently
  postId: number
  direction?: 'up' | 'down'
  description: string
}
