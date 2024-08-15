import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import useFetch from '@/composables/useFetch'
import { useAuthStore } from '@/stores/auth'

const stopForAuth = ['login', 'registration', 'recovery-password', 'add-recovery-password-link']

export const useUserStore = defineStore('user', () => {
  const user = ref()

  const route = useRoute()
  const router = useRouter()
  const storeAuth = useAuthStore()

  const getUser = async () => {
    if (storeAuth.auth) {
      try {
        const res = await useFetch.post('user', { email: user.value.email })
        const json = await res.json()
        if (res.status === 200) {
          user.value = json
          localStorage.setItem('user', JSON.stringify(user.value))
          setTimeout(() => getUser(), 10000)
        }
      } catch (e) {
        throw e
      }
    }
  }

  if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user'))
  }

  watch(
    () => user.value,
    state => {
      if (!!route?.name && !!user.value?.permissions) {
        if (!user.value.permissions?.some(el => el.name === route.name) && !stopForAuth.includes(route.name)) router.push('home')
      }
    },
    { deep: true },
  )

  return {
    user,
    getUser,
  }
})
