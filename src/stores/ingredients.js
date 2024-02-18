import { ref } from 'vue'
import { defineStore } from 'pinia'
import useFetch from '@/composables/useFetch'

export const useIngredientsStore = defineStore('ingredients', () => {
  const modalCreateVisible = ref(false)
  const modalViewVisible = ref(false)
  const ingredientId = ref('')

  const visibleDeleted = ref(false)
  const idDeleted = ref(false)
  const imagesDeleted = ref(false)

  const filterIngredients = ref({
    name: '',
    theme: '',
  })

  const getIngredientsThemes = async () => {
    try {
      const res = await useFetch.get('ingredients/get-ingredient-themes')
      return await res.json()
    } catch (e) {
      console.log(e)
    }
  }

  const createIngredientTheme = async theme => {
    try {
      const res = await useFetch.post('ingredients/create-ingredient-theme', { theme })
      return await res.json()
    } catch (e) {
      console.log(e)
    }
  }

  const getIngredients = async (paginationCount, limit) => {
    try {
      const res = await useFetch.post('ingredients/get-ingredients', { paginationCount, limit, filterIngredients: filterIngredients.value })
      return await res.json()
    } catch (e) {
      console.log(e)
    }
  }

  const getIngredient = async () => {
    try {
      const res = await useFetch.post('ingredients/get-ingredient', { id: ingredientId.value })
      return await res.json()
    } catch (e) {
      console.log(e)
    }
  }

  const deleteIngredient = async () => {
    try {
      const res = await useFetch.delete('ingredients/deleted-ingredient', { id: idDeleted.value, images: imagesDeleted.value })
      visibleDeleted.value = false
      modalViewVisible.value = false
      return await res.json()
    } catch (e) {
      console.log(e)
    }
  }

  return {
    modalCreateVisible,
    modalViewVisible,
    ingredientId,
    getIngredients,
    getIngredient,
    deleteIngredient,
    idDeleted,
    imagesDeleted,
    visibleDeleted,
    getIngredientsThemes,
    createIngredientTheme,
    filterIngredients,
  }
})
