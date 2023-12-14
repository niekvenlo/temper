<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from 'vue-query'
import { getPosts } from '../services/data-access'
import ActionButton from '../components/ActionButton.vue'
import type { Action, Post, VueQueryResponse } from '../types'

const props = defineProps<{
  actions: Action[]
}>()
const emit = defineEmits(['move-post'])

const movePost = (id: number, direction: 'up' | 'down', index: number) => {
  emit('move-post', {
    ts: Date.now(),
    postId: id,
    direction,
    index
  })
}

const { isLoading, isError, data: posts } = useQuery('posts', getPosts) as VueQueryResponse<Post[]>

const fiveSortedPosts = computed(() => {
  const fivePosts = posts.value?.slice(0, 5) ?? []
  // We loop over all actions, and move list items around as needed.
  props.actions.forEach((action: Action) => {
    switch (action.type) {
      case 'move': {
        const originIdx = fivePosts.findIndex((post: Post) => post.id === action.postId)
        const targetIdx = action.direction === 'up' ? originIdx - 1 : originIdx + 1
        // Swap two values in an array
        ;[fivePosts[originIdx], fivePosts[targetIdx]] = [fivePosts[targetIdx], fivePosts[originIdx]]
        return
      }
      default:
      // no-op
    }
  })
  return fivePosts
})

const isFirstElement = (element: any, array: any[] | undefined) => array?.[0] === element
const isLastElement = (element: any, array: any[] | undefined) => array?.slice(-1)[0] === element
</script>

<template>
  <section>
    <h2 v-if="isLoading" class="loading">Loading posts ...</h2>
    <h2 v-else-if="isError" class="error">Apologies. Something went wrong ...</h2>
    <h2 v-else class="list">Sortable Post List</h2>
    <TransitionGroup name="list">
      <div v-for="(post, index) in fiveSortedPosts" :key="post.id" class="post">
        <div>
          <h3>
            <span class="post-id">Post {{ post.id }}:</span> {{ post.title }}
          </h3>
          {{ post.body }}
        </div>
        <div class="action-buttons">
          <ActionButton
            v-if="!isFirstElement(post, fiveSortedPosts)"
            @click="movePost(post.id, 'up', index)"
          />
          <ActionButton
            v-if="!isLastElement(post, fiveSortedPosts)"
            @click="movePost(post.id, 'down', index)"
            down
          />
        </div>
      </div>
    </TransitionGroup>
  </section>
</template>

<style scoped>
section {
  flex: 1 1 0px;
  padding: 2em;
}
h2 {
  color: white;
}
div.post {
  background: white;
  border: var(--theme-grey) 0.5px solid;
  border-radius: 0.3em;
  margin-block: 1em;
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1em;
}
h3 {
  font-weight: 500;
  .post-id {
    font-weight: 300;
    font-size: 0.9em;
  }
}
div.action-buttons {
  display: flex;
  flex-direction: column;
  place-content: center;
}
</style>
