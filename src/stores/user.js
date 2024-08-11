import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

const stopForAuth = ['login', 'registration', 'recovery-password', 'add-recovery-password-link']

export const useUserStore = defineStore('user', () => {
  const user = ref()

  const route = useRoute()
  const router = useRouter()

  if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user'))
  }

  watch(
    () => user.value,
    state => {
      if (!!route?.name && !!user.value?.permissions) {
        if (!user.value.permissions?.some(el => el.name === route.name) && !stopForAuth.includes(route.name)) router.push('home')
      }
      localStorage.setItem('user', JSON.stringify(state))
    },
    { deep: true },
  )

  return { user }
})
