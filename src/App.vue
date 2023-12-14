<script setup lang="ts">
import { ref } from 'vue'
import { useQueryClient } from 'vue-query'
import PostView from './views/PostView.vue'
import ActionView from './views/ActionView.vue'
import type { Action } from './types'

/**
 * By setting staleTime to infinity, we prevent vue-query from refetching aggressively.
 */
useQueryClient().setDefaultOptions({
  queries: {
    staleTime: Infinity
  }
})

/**
 * All recorded actions
 */
const actionsHistory = ref([] as Action[])

/**
 * Push an action into the actionsHistory
 *
 * @param action Move action
 */
const movePost = (action: any) => {
  const oldIndex = action.index + 1
  const newIndex = action.direction === 'up' ? action.index : action.index + 2
  actionsHistory.value.push({
    type: 'move',
    description: `Moved post ${action.postId} ${action.direction} from index ${oldIndex} to index ${newIndex}`,
    ...action
  })
}

/**
 * Remove all actions on and after this timestamp.
 *
 * @param action Time-travel action
 */
const timeTravel = ({ ts }: { ts: number }) => {
  const id = actionsHistory.value.findIndex((action) => action.ts === ts)
  actionsHistory.value.splice(id)
}
</script>

<template>
  <main>
    <PostView @move-post="movePost" :actions="actionsHistory" />
    <ActionView @time-travel="timeTravel" :actions="actionsHistory" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 1000px;
  place-content: center;
}
</style>
