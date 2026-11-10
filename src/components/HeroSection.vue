<script setup>
import { profile } from '../data.js'
import { smoothTo } from '../scroll.js'
import Icon from './Icon.vue'
import BrandIcon from './BrandIcon.vue'
import ActivityCard from './ActivityCard.vue'
</script>

<template>
  <section id="home" class="hero">
    <div class="hero-left">
      <div class="hero-text">
        <span class="eyebrow">Привет, я {{ profile.nick }}.</span>

        <h1 class="title">Front-end developer<span>.</span></h1>

        <p class="lead">
          Границы существуют,<br />
          чтобы их преодолевать.
        </p>
      </div>

      <div class="chips">
        <a class="chip" :href="profile.github" target="_blank" rel="noopener"><BrandIcon name="github" :size="16" /> github</a>
        <a class="chip" :href="profile.discord" target="_blank" rel="noopener"><BrandIcon name="discord" :size="16" /> discord</a>
        <a class="chip" :href="profile.telegram" target="_blank" rel="noopener"><BrandIcon name="telegram" :size="16" /> telegram</a>
        <span class="vline" />
        <button class="scroll" type="button" @click="smoothTo('works')">scroll down <Icon name="down" /></button>
      </div>
    </div>
    <ActivityCard />
  </section>
</template>
