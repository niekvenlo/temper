<script setup lang="ts">
import type { Action } from '../types'
const props = defineProps<{
  actions: Action[]
}>()
defineEmits(['time-travel'])
</script>

<template>
  <div class="wrapper">
    <section>
      <h1>List of actions committed</h1>
      <TransitionGroup name="list" tag="div" class="actions">
        <div v-for="action of props.actions" :key="action.postId">
          {{ action.description }}
          <button @click="$emit('time-travel', { ts: action.ts })">time travel</button>
        </div>
      </TransitionGroup>
    </section>
  </div>
</template>

<style scoped>
div.wrapper {
  flex: 1 1 0px;
}
section {
  background: var(--theme-grey);
  border-radius: 0.3em;
  box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
  margin: 3em;
}
section h1 {
  background: var(--actions-header-background);
  border-radius: 0.3em;
  color: var(--actions-header-text);
  font-weight: 600;
  padding: 1em;
}
section .actions {
  max-height: 80vh;
  overflow: scroll;
  padding: 1em;
}
section .actions div {
  background: white;
  display: flex;
  gap: 1em;
  padding: 1em;
}
button {
  background: var(--time-travel-button);
  border-radius: 0.3em;
  padding-inline: 0.5em;
  text-wrap: nowrap;
}
</style>
