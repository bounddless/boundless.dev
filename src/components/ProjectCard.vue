<script setup>
import Icon from './Icon.vue'
import BrandIcon from './BrandIcon.vue'

defineProps({ project: { type: Object, required: true } })
</script>

<template>
  <article class="card glass">
    <img v-if="project.image" class="card-img" :src="project.image" :alt="project.name" loading="lazy" />
    <div v-else class="card-img card-ph" aria-hidden="true" />

    <div class="card-body">
      <div class="tags">
        <span v-for="t in project.tags.slice(0, 2)" :key="t" class="tag">{{ t }}</span>
      </div>
      <h3>
        <RouterLink class="card-link" :to="'/projects/' + project.slug">{{ project.name }}</RouterLink>
      </h3>
      <p class="muted small">{{ project.desc }}</p>
      <div class="card-links">
        <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" aria-label="Открыть сайт"><Icon name="arrow" /></a>
        <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" aria-label="GitHub"><BrandIcon name="github" :size="17" /></a>
      </div>
    </div>
  </article>
</template>
