import { createRouter, createWebHistory } from 'vue-router'

import example from "@/router/example"
import about from "@/router/about"
import home from "@/router/home"
import login from "@/router/login"
import recoveryPassword from "@/router/recovery-password"
import registration from "@/router/registration"

const routes = [
  ...home,
  ...example,
  ...about,
  ...login,
  ...recoveryPassword,
  ...registration,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
