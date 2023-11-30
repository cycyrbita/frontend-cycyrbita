import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useIngredientsStore = defineStore('ingredients', () => {
    const modalCreateVisible = ref(false)
    const modalViewVisible = ref(false)
    const ingredientId = ref('')
    return {modalCreateVisible, modalViewVisible, ingredientId}
})