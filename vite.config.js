import { fileURLToPath, URL } from 'node:url'
import dotenv from 'dotenv'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import vuetify from 'vite-plugin-vuetify'

dotenv.config()

export default defineConfig({
  base: process.env.VITE_DIR_NAME,
  build: {
    outDir: process.env.VITE_BUILD_PATH,
    emptyOutDir: false,
  },
  plugins: [
    vue(),
    vuetify({
      styles: {
        configFile: 'src/assets/styles/vuetify.scss',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/main.scss" as *;`,
        api: 'modern-compiler'
      }
    }
  },
})
