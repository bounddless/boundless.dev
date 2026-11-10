<script setup>
defineProps({ name: { type: String, required: true } })
</script>

<template>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'code'">
      <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M9 21h6M12 18v3M10 9l-2 2 2 2M14 9l2 2-2 2" />
    </template>
    <template v-else-if="name === 'pen'">
      <path d="M12 20h9" /><path d="M16.500 3.500a2.100 2.100 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </template>
    <template v-else-if="name === 'layout'">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
    </template>
    <template v-else-if="name === 'chat'">
      <path d="M21 12a8 8 0 0 1-11.800 7L3 21l2-5.200A8 8 0 1 1 21 12Z" /><path d="M9 11h6M9 14h3" />
    </template>
    <template v-else-if="name === 'arrow'">
      <path d="M7 17 17 7M8 7h9v9" />
    </template>
    <template v-else-if="name === 'down'">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </template>
    <template v-else-if="name === 'close'">
      <path d="M6 6l12 12M18 6 6 18" />
    </template>
    <template v-else-if="name === 'up'">
      <path d="M12 19V5M6 11l6-6 6 6" />
    </template>
  </svg>
</template>
