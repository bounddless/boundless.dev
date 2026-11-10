<script setup>
import { about } from '../data.js'
import { openContact } from '../modal.js'
import CtaSection from '../components/CtaSection.vue'
import Icon from '../components/Icon.vue'
</script>

<template>
  <main class="container page-main">
    <header class="page-head">
      <h1 class="h1">Обо мне</h1>
    </header>

    <div class="prose">
      <p v-for="(p, i) in about.paragraphs" :key="i" class="muted">{{ p }}</p>

      <h2 class="h3">Стек</h2>
      <div class="tags">
        <span v-for="s in about.stack" :key="s" class="tag">{{ s }}</span>
      </div>

      <button class="btn btn-inline" type="button" @click="openContact">Написать мне <Icon name="arrow" /></button>
    </div>

    <CtaSection />
  </main>
</template>
