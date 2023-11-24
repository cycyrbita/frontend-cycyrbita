import { fileURLToPath, URL } from 'node:url'
import dotenv from 'dotenv'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

dotenv.config()

export default defineConfig({
  base: process.env.VITE_DIR_NAME,
  build: {
    outDir: process.env.VITE_BUILD_PATH,
    emptyOutDir: true,
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
    }
  }
})
