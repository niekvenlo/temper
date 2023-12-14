<script setup lang="ts">
const props = defineProps<{
  down?: boolean
}>()
</script>

<template>
  <button :class="props.down ? 'down' : 'up'">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 160"
      x="0px"
      y="0px"
      width="20px"
      height="20px"
      stroke="currentColor"
    >
      <g>
        <line
          x1="64"
          y1="41.5"
          x2="109"
          y2="86.5"
          fill="none"
          stroke="inherit"
          stroke-linecap="square"
          stroke-miterlimit="10"
          stroke-width="20"
        />
        <line
          x1="64"
          y1="41.5"
          x2="19"
          y2="86.5"
          fill="none"
          stroke="inherit"
          stroke-linecap="square"
          stroke-miterlimit="10"
          stroke-width="20"
        />
      </g>
    </svg>
  </button>
</template>

<style scoped>
button {
  color: var(--theme-purple);
}
.down {
  rotate: 180deg;
}
</style>
