import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref()

  if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user'))
  }

  watch(
    () => user.value,
    state => {
      localStorage.setItem('user', JSON.stringify(state))
    },
    { deep: true },
  )

  return { user }
})
