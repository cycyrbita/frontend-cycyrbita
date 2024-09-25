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
import new_promo from '@/router/new-promo'
import clean from '@/router/clean'
import avatars from '@/router/avatars'
import permissions from '@/router/permissions'
import roles from '@/router/roles'

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
  ...permissions,
  ...roles,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
})

const stopForAuth = ['login', 'registration', 'recovery-password', 'add-recovery-password-link']

router.beforeResolve(async (to, from, next) => {
  const storeAuth = useAuthStore()
  const storeUser = useUserStore()

  // не авторизован
  if (!storeAuth.auth) {
    // если в роуте есть authorized или есть доступы
    if (to?.meta?.middleware?.includes('authorized') || to?.meta?.permissions?.length) return next(false)
  }

  // авторизован
  if (storeAuth.auth) {
    // // запрещаем переходить по этим роутам если авторизованы
    if (stopForAuth.includes(to.name)) return next('home')

    // проверяем есть ли доступы у пользователя к этой странице
    if (to?.meta?.permissions?.length) {
      if (!storeUser?.user?.permissions?.some(el => to?.meta?.permissions?.includes(el.name))) return next('home')
    }
  }

  next()
})

export default router
