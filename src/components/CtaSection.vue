<script setup>
import { profile } from '../data.js'
import { openContact } from '../modal.js'
import Icon from './Icon.vue'
</script>

<template>
  <section class="cta glass">
    <!-- звезда на фоне -->
    <svg class="cta-star" viewBox="0 0 400 400" aria-hidden="true">
      <defs>
        <radialGradient id="ctaGlow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#fff" stop-opacity=".35" />
          <stop offset="1" stop-color="#fff" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="ctaFill" cx=".42" cy=".48" r=".6">
          <stop offset="0" stop-color="#ffffff" />
          <stop offset=".55" stop-color="#d4d4da" />
          <stop offset="1" stop-color="#8c8c96" />
        </radialGradient>
        <linearGradient id="ctaH" x1="0" x2="1">
          <stop offset="0" stop-color="#fff" stop-opacity="0" />
          <stop offset=".5" stop-color="#fff" stop-opacity=".5" />
          <stop offset="1" stop-color="#fff" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="ctaV" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity="0" />
          <stop offset=".5" stop-color="#fff" stop-opacity=".5" />
          <stop offset="1" stop-color="#fff" stop-opacity="0" />
        </linearGradient>
        <filter id="ctaBlur"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#ctaGlow)" />
      <rect x="0" y="199" width="400" height="2" fill="url(#ctaH)" />
      <rect x="199" y="0" width="2" height="400" fill="url(#ctaV)" />
      <path d="M200 40Q208 190 340 200Q208 210 200 360Q192 210 60 200Q192 190 200 40Z" fill="#fff" opacity=".5" filter="url(#ctaBlur)" />
      <path d="M200 40Q208 190 340 200Q208 210 200 360Q192 210 60 200Q192 190 200 40Z" fill="url(#ctaFill)" />
    </svg>

    <div class="cta-text">
      <h2 class="cta-title">Есть идея?<br />Давайте создадим её.</h2>
      <p class="muted small">Расскажите о проекте — начнём с простого разговора.</p>
    </div>

    <div class="cta-right">
      <button class="btn" type="button" @click="openContact">Обсудить проект <Icon name="arrow" /></button>
      <a class="mail" :href="'mailto:' + profile.email">{{ profile.email }}</a>
      <div class="small">
        <a :href="profile.telegram" target="_blank" rel="noopener">Telegram <Icon name="arrow" /></a>
        <a :href="profile.github" target="_blank" rel="noopener" class="muted">GitHub <Icon name="arrow" /></a>
      </div>
    </div>
  </section>
</template>
