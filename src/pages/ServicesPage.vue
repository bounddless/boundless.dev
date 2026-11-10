<script setup>
import { services } from '../data.js'
import CtaSection from '../components/CtaSection.vue'
import Icon from '../components/Icon.vue'
</script>

<template>
  <main class="container page-main">
    <header class="page-head">
      <h1 class="h1">Услуги</h1>
      <p class="muted">Чем могу быть полезен.</p>
    </header>

    <ul class="service-list">
      <li v-for="s in services" :key="s.label" class="service glass">
        <Icon :name="s.icon" />
        <div>
          <h3>{{ s.label }}</h3>
          <p class="muted small">{{ s.desc }}</p>
        </div>
      </li>
    </ul>

    <CtaSection />
  </main>
</template>
