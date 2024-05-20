import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

import about from '@/router/about'
import home from '@/router/home'
import login from '@/router/login'
import recoveryPassword from '@/router/recovery-password'
import addRecoveryPasswordLink from '@/router/add-recovery-password-link'
import registration from '@/router/registration'
import users from '@/router/users'
import ingredients from '@/router/ingredients'
import error_404 from '@/router/404'
import error_500 from '@/router/500'
import new_promo from '@/router/new_promo'
import clean from '@/router/clean'
import avatars from '@/router/avatars'
import face from '@/router/face'

const routes = [
  ...home,
  ...about,
  ...login,
  ...recoveryPassword,
  ...registration,
  ...addRecoveryPasswordLink,
  ...users,
  ...ingredients,
  ...error_404,
  ...error_500,
  ...new_promo,
  ...clean,
  ...avatars,
  ...face,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
})

const stopForAuth = ['login', 'face', 'registration', 'recovery-password', 'add-recovery-password-link']

router.beforeResolve((to, from, next) => {
  const storeAuth = useAuthStore()
  const storeUser = useUserStore()

  // редирект, если не авторизирован
  if (!storeAuth.auth && !stopForAuth.includes(to.name)) {
    console.log(111)
    return next({ name: 'face' })
  }

  // проверка middleware
  if (!to.meta.middleware) {
    console.log(222)
    throw new Error('на странице нету middleware')
  }

  // проверка роли
  if (!to.meta.middleware.includes(storeUser.user.role)) {
    console.log(333)
    throw new Error('у юзера нет ролей')
  }

  console.log(storeAuth.auth)
  console.log(stopForAuth.includes(to.name))
  console.log(to.name)

  // запрещаем переходить по этим роутам если авторизованы
  if (storeAuth.auth && stopForAuth.includes(to.name)) {
    console.log(444)
    return next({ name: 'home' })
  }

  console.log(555)

  next()
})

export default router
