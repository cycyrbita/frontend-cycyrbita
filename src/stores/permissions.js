import { defineStore } from 'pinia'
import useFetch from '@/composables/useFetch'

export const usePermissionsStore = defineStore('permissions', () => {
  const getPermissions = async () => await useFetch.get('permissions')
  const setPermissions = async permission => await useFetch.post('set-permission', permission)
  const deletePermissions = async permission => await useFetch.post('delete-permission', permission)

  return {
    getPermissions,
    setPermissions,
    deletePermissions,
  }
})
