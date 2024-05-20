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
import useFetch from '@/composables/useFetch'

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

router.beforeResolve(async (to, from, next) => {
  const authorisation = async () => {
    console.log(7777)
    try {
      const res = await useFetch.get('refresh')
      const json = await res.json()

      // если токен обновился
      if (res.status === 200) {
        // устанавливаем token
        localStorage.setItem('accessTokenCycyrbita', json.accessToken)
        // переключаем флаг авторизации
        storeAuth.auth = true
        // передаем пользователя
        storeUser.user = json.user
      } else {
        // переключаем флаг авторизации
        storeAuth.auth = false
        // передаем дефолтного пользователя
        storeUser.user = { role: 'role.default' }
      }
    } catch (e) {
      console.log(e)
    }
  }
  const storeAuth = useAuthStore()
  const storeUser = useUserStore()

  await authorisation()

  console.log(8888)

  // редирект, если не авторизирован
  if (!storeAuth.auth && !stopForAuth.includes(to.name)) return next({ name: 'face' })

  // проверка middleware
  if (!to.meta.middleware) throw new Error('на странице нету middleware')

  // проверка роли
  if (!to.meta.middleware.includes(storeUser.user.role)) throw new Error('у юзера нет ролей')

  // запрещаем переходить по этим роутам если авторизованы
  if (storeAuth.auth && stopForAuth.includes(to.name)) return next({ name: 'home' })

  next()
})

export default router
