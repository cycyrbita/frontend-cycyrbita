import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isAuth = ref(false)
    const role = ref('role.cycyrbit')

    return {isAuth, role}
})