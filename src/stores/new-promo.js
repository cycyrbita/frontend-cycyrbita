import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import useFetch from '@/composables/useFetch'

export const useNewPromoStore = defineStore('new-promo', () => {
  //store
  const list = ref([])
  const targetPromo = reactive({
    id: '',
    title: '',
    link: ''
  })
  //methods
  const getNewPromo = async () => {
    try {
      const res = await useFetch.get('new-promo/get-new-promo')
      list.value = await res.json()
    }
    catch (e) {
      console.log(e)
    }
  }
  const selectPromo = (id, title, link) => {
    targetPromo.id = id
    targetPromo.title = title
    targetPromo.link = link
  }
  const hidePromo = () => {
    targetPromo.id = null
    targetPromo.title = null
    targetPromo.link = null
  }
  const uploadArchive = async (title, file, isNewPromo) => {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('archive', file)
      formData.append('isNewPromo', isNewPromo)

      const headers = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessTokenCycyrbita')}`,
        },
        body: formData,
        credentials: 'include',
      }
      await useFetch.post('new-promo/upload-new-promo', null, headers, true)
      await getNewPromo()
    }
    catch (e) {
      console.log(e)
    }
  }
  const deletePromo = async (promo) => {
    try {
      const headers = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessTokenCycyrbita')}`,
        },
        body: JSON.stringify(promo),
        credentials: 'include',
      }
      await useFetch.delete('new-promo/delete-new-promo', null, headers, true)
      await getNewPromo()
    }
    catch (e) {
      console.log(e)
    }

  }

  return {
    list,
    targetPromo,
    getNewPromo,
    selectPromo,
    hidePromo,
    uploadArchive,
    deletePromo
  }
})
