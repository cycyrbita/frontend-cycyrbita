import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useIngredientsStore = defineStore('ingredients', () => {
    const modalCreateVisible = ref(false)
    return {modalCreateVisible}
})