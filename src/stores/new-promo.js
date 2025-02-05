import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import useFetch from '@/composables/useFetch'

export const useNewPromoStore = defineStore('new-promo', () => {
  //store
  const visibleDeleted = ref(false)
  const list = ref([])
  const targetPromo = reactive({
    id: '',
    title: '',
    link: ''
  })
  const serverStatus = ref(null)

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
    visibleDeleted.value = false
  }

  const updateNewPromo = async (title, isNewPromo, archiveName, count, total) => {
        try {
          const formData = new FormData()

          formData.append('title', title)
          formData.append('isNewPromo', isNewPromo)
          formData.append('archiveName', archiveName)
          formData.append('count', count)
          formData.append('total', total)

          const header = {
            method: 'POST',
            body: formData,
            credentials: 'include',
          }

          const res = await useFetch.post('new-promo/update-new-promo', null, header, true)
          const status = res.status
          serverStatus.value = await res.json()
          await getNewPromo()
          return {
            status: status, message: serverStatus.value
          }
        }
        catch (e) {
          console.log(e)
        }
  }
  const uploadArchive = async (title, isNewPromo, file, archiveName, count, total) => {
        try {
          const formData = new FormData()

          formData.append('title', title)
          formData.append('archiveName', archiveName)
          formData.append('isNewPromo', isNewPromo)
          formData.append('archive', file)
          formData.append('count', count)
          formData.append('total', total)

          const header = {
            method: 'POST',
            body: formData,
            credentials: 'include',
          }

          const res = await useFetch.post('new-promo/upload-archive', null, header, true)
          const status = res.status
          serverStatus.value = await res.json()
          if (status !== 200) {
            throw new Error(res.message)
          }
          return {
            status: status, message: serverStatus.value
          }
        }
        catch (e) {
          throw { message: `${serverStatus.value}`}
        }
  }
  const createScreenShot = async (title, archiveName, count, total) => {
        try {
          const formData = new FormData()

          formData.append('title', title)
          formData.append('archiveName', archiveName)
          formData.append('count', count)
          formData.append('total', total)

          const header = {
            method: 'POST',
            body: formData,
            credentials: 'include',
          }

          const res = await useFetch.post('new-promo/create-screenshot', null, header, true)
          const status = res.status
          serverStatus.value = await res.json()
          return {
            status: status, message: serverStatus.value
          }
        }
        catch (e) {
          console.log('ошибка', e)
        }
  }

  const deletePromo = async (promo) => {
    try {
      const headers = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promo),
        credentials: 'include',
      }
      await useFetch.delete('new-promo/delete-new-promo', null, headers, true)
      await getNewPromo()
      visibleDeleted.value = false
    }
    catch (e) {
      console.log(e)
    }

  }

  return {
    visibleDeleted,
    list,
    serverStatus,
    targetPromo,
    getNewPromo,
    selectPromo,
    hidePromo,
    updateNewPromo,
    uploadArchive,
    createScreenShot,
    deletePromo
  }
})
