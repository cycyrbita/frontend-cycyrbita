import { createRouter, createWebHistory } from 'vue-router'

import example from "@/router/example"
import about from "@/router/about"
import home from "@/router/home"

const routes = [
  ...home,
  ...example,
  ...about,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
