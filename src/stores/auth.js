import { shallowRef, watch } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const auth = shallowRef(false)

  if (localStorage.getItem('auth')) {
    auth.value = JSON.parse(localStorage.getItem('auth'))
  }

  watch(
    () => auth.value,
    state => {
      localStorage.setItem('auth', JSON.stringify(state))
      if (!auth.value) localStorage.removeItem('user')
    },
  )

  return { auth }
})
