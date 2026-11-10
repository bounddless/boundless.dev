<script setup>
import { projects } from '../projects.js'
import ProjectCard from '../components/ProjectCard.vue'
import CtaSection from '../components/CtaSection.vue'
</script>

<template>
  <main class="container page-main">
    <header class="page-head">
      <h1 class="h1">Мои проекты</h1>
    </header>

    <div class="cards cards-wrap">
      <ProjectCard v-for="p in projects" :key="p.slug" :project="p" />
    </div>

    <CtaSection />
  </main>
</template>
