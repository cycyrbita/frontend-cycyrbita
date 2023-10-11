import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isAuth = ref(false)

    const login = () => isAuth.value = true
    const logout = () => isAuth.value = false

    return {isAuth, login, logout}
})