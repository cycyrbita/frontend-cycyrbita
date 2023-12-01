import { ref } from 'vue'
import { defineStore } from 'pinia'
import useFetch from "@/composables/useFetch";

export const useIngredientsStore = defineStore('ingredients', () => {
    const modalCreateVisible = ref(false)
    const modalViewVisible = ref(false)
    const ingredientId = ref('6569c592e3cf5074560b531b')

    const getIngredient = async () => {
        try {
            const res = useFetch.post('ingredients/get-ingredient', {id: ingredientId.value})
            const json = res.json()
            return json
        } catch (e) {
            console.log(e)
        }
    }

    return {modalCreateVisible, modalViewVisible, ingredientId, getIngredient}
})