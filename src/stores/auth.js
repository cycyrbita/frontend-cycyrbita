import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isAuth = ref(false)
    const user = ref({
        role: 'role.default',
    })

    return {isAuth, user}
})