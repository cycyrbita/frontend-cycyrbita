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
  if(to.meta.middleware) {
    if(useAuthStore().isAuth) {
      // проверка роли
      if(!to.meta.middleware.includes(useAuthStore().role)) return false

      // запрещаем переходить по этим роутам если авторизованы
      if(to.name === 'login') return false
      if(to.name === 'registration') return false
      if(to.name === 'recovery-password') return false
    } else {
      // если требует авторизации
      if(to.meta.middleware.includes('auth')) return {name: 'login'}
    }
  }

  return
})

export default router
