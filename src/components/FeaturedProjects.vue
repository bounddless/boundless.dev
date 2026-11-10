<script setup>
import { computed } from 'vue'
import { projects } from '../projects.js'
import ProjectCard from './ProjectCard.vue'
import Icon from './Icon.vue'

const featured = computed(() => {
  const list = projects.filter((p) => p.featured)
  return (list.length ? list : projects).slice(0, 3)
})
</script>

<template>
  <section id="works" class="section">
    <div class="row-between">
      <h2 class="h2">Избранные проекты</h2>
      <RouterLink class="muted link" to="/projects">view all <Icon name="arrow" /></RouterLink>
    </div>
    <div class="cards">
      <ProjectCard v-for="p in featured" :key="p.slug" :project="p" />
    </div>
  </section>
</template>
