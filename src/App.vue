<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import ContactModal from './components/ContactModal.vue'
</script>

<template>
  <div class="page">
    <!-- дуга и свечение на фоне — остаются на всех страницах -->
    <div class="halo" aria-hidden="true" />

    <AppHeader />
    <RouterView />
    <AppFooter />
    <ContactModal />
  </div>
</template>
