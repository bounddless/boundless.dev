<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../projects.js'
import Icon from '../components/Icon.vue'
import BrandIcon from '../components/BrandIcon.vue'
import CtaSection from '../components/CtaSection.vue'

const route = useRoute()
const project = computed(() => projects.find((p) => p.slug === route.params.slug))
</script>

<template>
  <main class="container page-main">
    <RouterLink class="back muted small" to="/projects">← Все проекты</RouterLink>

    <template v-if="project">
      <article class="project">
        <img v-if="project.image" class="project-img" :src="project.image" :alt="project.name" />
        <div v-else class="project-img card-ph" aria-hidden="true" />

        <div class="project-info">
          <div class="tags">
            <span v-for="t in project.tags" :key="t" class="tag">{{ t }}</span>
          </div>
          <h1 class="h1">{{ project.name }}</h1>
          <p class="muted lead-sm">{{ project.details || project.desc }}</p>

          <div class="project-actions">
            <a v-if="project.url" class="btn" :href="project.url" target="_blank" rel="noopener">Открыть сайт <Icon name="arrow" /></a>
            <a v-if="project.repo" class="btn btn-ghost" :href="project.repo" target="_blank" rel="noopener"><BrandIcon name="github" :size="16" /> GitHub</a>
          </div>
        </div>
      </article>
    </template>

    <p v-else class="muted">Проект не найден.</p>

    <CtaSection />
  </main>
</template>
