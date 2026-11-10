<script setup>
import { computed } from 'vue'
import { heroBackground } from '../data.js'
import HeroSection from '../components/HeroSection.vue'
import FeaturedProjects from '../components/FeaturedProjects.vue'
import AboutServices from '../components/AboutServices.vue'
import CtaSection from '../components/CtaSection.vue'

const bgStyle = computed(() => (heroBackground ? { backgroundImage: `url(${heroBackground})` } : null))
</script>

<template>
  <!-- фон-картинка главной: задаётся в src/data.js → heroBackground -->
  <div v-if="heroBackground" class="hero-bg" :style="bgStyle" aria-hidden="true" />

  <main class="container">
    <HeroSection />
    <FeaturedProjects />
    <AboutServices />
    <CtaSection />
  </main>
</template>
