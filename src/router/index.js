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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
})

router.beforeResolve(to => {
  const storeAuth = useAuthStore()
  const storeUser = useUserStore()

  if (to.meta.middleware) {
    if (storeAuth.auth) {
      // проверка роли
      if (!to.meta.middleware.includes(storeUser.user.role)) return false

      // запрещаем переходить по этим роутам если авторизованы
      if (to.name === 'login' || to.name === 'registration' || to.name === 'recovery-password') return { name: 'home' }
    }
    // если требует авторизации
    if (to.meta.middleware.includes('auth') && !storeAuth.auth) return { name: 'login' }
  }
})

export default router
