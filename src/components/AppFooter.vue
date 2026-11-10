<script setup>
import { profile } from '../data.js'
import Sparkle from './Sparkle.vue'
import Icon from './Icon.vue'

const year = new Date().getFullYear()
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <footer class="container footer">
    <RouterLink class="logo" to="/"><Sparkle :size="30" /><span>{{ profile.domain }} — {{ year }}</span></RouterLink>
    <div class="footer-links small">
      <a :href="profile.github" target="_blank" rel="noopener">github</a>
      <a :href="profile.discord" target="_blank" rel="noopener">discord</a>
      <a :href="profile.telegram" target="_blank" rel="noopener">telegram</a>
      <button type="button" aria-label="Наверх" @click="toTop"><Icon name="up" /></button>
    </div>
  </footer>
</template>
