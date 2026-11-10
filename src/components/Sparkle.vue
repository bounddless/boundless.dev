<script setup>
defineProps({ size: { type: Number, default: 28 } })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
    <path d="M20 0 Q22 18 40 20 Q22 22 20 40 Q18 22 0 20 Q18 18 20 0Z" />
  </svg>
</template>
