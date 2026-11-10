import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import ProjectPage from './pages/ProjectPage.vue'
import AboutPage from './pages/AboutPage.vue'
import ServicesPage from './pages/ServicesPage.vue'

// Hash-режим (/#/projects): работает на любом статическом хостинге
// (GitHub Pages, Vercel, Netlify) без настройки редиректов.
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/projects', component: ProjectsPage },
    { path: '/projects/:slug', component: ProjectPage },
    { path: '/about', component: AboutPage },
    { path: '/services', component: ServicesPage },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
