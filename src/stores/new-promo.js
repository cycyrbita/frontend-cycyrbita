import { ref } from 'vue'
import { defineStore } from 'pinia'
import useFetch from '@/composables/useFetch'

export const useNewPromoStore = defineStore('new-promo', () => {
  const list = ref([])

  const getNewPromo = async () => {
    try {
      const res = await useFetch.get('new-promo/get-new-promo')
      return await res.json()
    } catch (e) {
      console.log(e)
    }
  }
  (async () => list.value = await getNewPromo())()
  return {
    getNewPromo,
    list
  }
})
