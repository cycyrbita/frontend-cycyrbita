import { defineStore } from 'pinia'
import useFetch from '@/composables/useFetch'

export const useRolesStore = defineStore('roles', () => {
  const getPermissions = async () => await useFetch.get('permissions')
  const setPermission = async permission => await useFetch.post('set-permission', permission)
  const deletePermission = async permission => await useFetch.post('delete-permission', permission)

  const getRoles = async () => await useFetch.get('roles')
  const setRole = async role => await useFetch.post('set-role', role)
  const deleteRole = async role => await useFetch.post('delete-role', role)

  return {
    getPermissions,
    setPermission,
    deletePermission,
    getRoles,
    setRole,
    deleteRole,
  }
})
