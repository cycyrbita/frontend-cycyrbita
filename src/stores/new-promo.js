import { ref } from 'vue'
import { defineStore } from 'pinia'
import useFetch from '@/composables/useFetch'

export const useNewPromoStore = defineStore('new-promo', () => {

  const getNewPromo = async (array) => {
    try {
      const res = await useFetch.post('new-promo/get-new-promo', {})
      return await res.json()
    } catch (e) {
      console.log(e)
    }
  }

  return {
    getNewPromo,
  }
})
