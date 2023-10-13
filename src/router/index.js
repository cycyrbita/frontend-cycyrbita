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
  // если в роуте есть middleware auth
  if(to.meta?.middleware?.includes('auth')) {
    // если авторизован
    if(useAuthStore().isAuth) {
      return
    // если не авторизован
    } else return {name: 'login'}
  // если в роуте нет middleware auth
  } else {
    // если авторизован и путь по которому переходим это login
    if(useAuthStore().isAuth) {
      if(to.name === 'login' || to.name === 'registration' || to.name === 'recovery-password') return false
    } else return
  }
})

export default router
