<template>
  <button @click="getUsers">get users</button>
  <pre>{{ users }}</pre>
</template>

<script setup>
  import { ref } from 'vue'
  import useFetch from '@/composables/useFetch'
  import { useUserStore } from '@/stores/user'

  const users = ref()
  const storeUser = useUserStore()

  const getUsers = async () => {
    try {
      const res = await useFetch.post('users', { role: storeUser.user.role })
      const json = await res.json()
      if (res.status === 200) users.value = json
    } catch (e) {
      throw e
    }
  }

  const deleteUser = async (id, email) => {
    try {
      const res = await useFetch.delete('delete-user', { id: id, email, role: storeUser.user.role })
      if (res.status === 200) await getUsers()
    } catch (e) {
      throw e
    }
  }

  const restoreUser = async (id, email) => {
    try {
      const res = await useFetch.post('restore-user', { id: id, email, role: storeUser.user.role })
      if (res.status === 200) await getUsers()
    } catch (e) {
      throw e
    }
  }

  const editRole = async (id, editRole) => {
    try {
      const res = await useFetch.post('edit-role', { id: id, editRole, role: storeUser.user.role })
      if (res.status === 200) await getUsers()
    } catch (e) {
      throw e
    }
  }
</script>

<style scoped>
  @import '/src/views/users/styles/users.scss';
</style>
