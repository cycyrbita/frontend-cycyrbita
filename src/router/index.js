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

  // проверка на авторизацию
  if(to.meta?.middleware?.includes('auth') && !auth) return {name: 'login'}

  // проверка на роль
  if(to.meta?.middleware?.includes(useAuthStore().role)) return

  // запрещаем переходить по этим роутам если авторизованы
  if(auth && to.name === 'login') return false
  if(auth && to.name === 'registration') return false
  if(auth && to.name === 'recovery-password') return false

  return
})

export default router
