<script setup>
import { about, services } from '../data.js'
import Icon from './Icon.vue'
import img from '../../public/img/about.jpg'
</script>

<template>
  <section class="about-services">
    <div class="about">
      <h2 class="h2 ruled">Обо мне</h2>
      <p class="muted">{{ about.short }}</p>
      <RouterLink class="underline" to="/about">Узнать больше <Icon name="arrow" /></RouterLink>
    </div>

    <div class="services">
      <h2 class="h2 ruled">Услуги</h2>
      <ul>
        <li v-for="s in services" :key="s.label"><Icon :name="s.icon" /> {{ s.label }}</li>
      </ul>
    </div>

    <img class="about-photo" :src="img" alt="" />
  </section>
</template>