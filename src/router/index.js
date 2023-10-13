import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from '@/stores/auth'

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

router.beforeEach((to, ) => {
  const auth = useAuthStore().isAuth
  if(to.meta?.middleware?.includes('auth') && !auth) return {name: 'login'}

  if(auth && to.name === 'login') return {name: 'home'}
  if(auth && to.name === 'registration') return {name: 'home'}
  if(auth && to.name === 'recovery-password') return {name: 'home'}

  return
})

export default router
