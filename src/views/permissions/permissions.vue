<template>
  <div class="roles">
    <ul>
      <li v-for="element in permissions">
        <input
          v-model="element.name"
          type="text"
        />
        <button @click="setPermission(element)">save</button>
        <button @click="deletePermission(element)">delete</button>
      </li>
    </ul>
    <input
      v-model="permission.name"
      type="text"
    />
    <button @click="setPermission(permission)">Добавить доступ</button>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRolesStore } from '@/stores/roles'

  const store = useRolesStore()
  const permission = ref({ name: '' })
  const permissions = ref()

  const getPermissions = async () => {
    try {
      const res = await store.getPermissions()
      if (res.status === 200) permissions.value = await res.json()
    } catch (error) {
      console.log(error)
    }
  }

  const setPermission = async element => {
    try {
      const res = await store.setPermission(element)
      if (res.status === 200) {
        await getPermissions()
        permission.value.name = ''
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deletePermission = async permission => {
    try {
      const res = await store.deletePermission(permission)
      if (res.status === 200) await getPermissions()
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(getPermissions)
</script>

<style lang="scss"></style>
