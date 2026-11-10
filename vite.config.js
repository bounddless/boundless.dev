import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base: './' — чтобы сайт работал и на GitHub Pages (в подпапке), и на Vercel/Netlify/Cloudflare
export default defineConfig({
  plugins: [vue()],
  base: './',
})
