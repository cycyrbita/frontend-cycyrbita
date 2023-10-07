import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isAuth = ref(false)

    const changAuth = () => isAuth.value = !isAuth.value

    return {isAuth, changAuth}
})