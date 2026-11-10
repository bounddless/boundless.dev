<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { profile, nav } from '../data.js'
import { openContact } from '../modal.js'
import Sparkle from './Sparkle.vue'
import Icon from './Icon.vue'

const route = useRoute()
const menuOpen = ref(false)

const isActive = (to) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
watch(() => route.path, () => (menuOpen.value = false))
</script>

<template>
  <header class="topbar">
    <div class="container header-inner">
      <RouterLink class="logo" to="/">
        <Sparkle :size="30" />
        <span>{{ profile.domain }}</span>
      </RouterLink>

      <nav class="nav" aria-label="Основная навигация">
        <RouterLink v-for="n in nav" :key="n.to" :to="n.to" :class="{ active: isActive(n.to) }">{{ n.label }}</RouterLink>
      </nav>

      <div class="header-actions">
        <button class="pill" type="button" @click="openContact">Обсудим проект <Icon name="arrow" /></button>
        <button class="burger" type="button" aria-label="Меню" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
          <span /><span />
        </button>
      </div>
    </div>

    <nav v-if="menuOpen" class="mobile-nav container" aria-label="Мобильная навигация">
      <RouterLink v-for="n in nav" :key="n.to" :to="n.to" :class="{ active: isActive(n.to) }">{{ n.label }}</RouterLink>
    </nav>
  </header>
</template>
