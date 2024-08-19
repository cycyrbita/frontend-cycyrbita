<template>
  <div class="roles">
    <ul>
      <li v-for="element in permissions">
        {{ element.name }}
        <span @click="deletePermissions(element)">х</span>
      </li>
    </ul>
    <input
      v-model="permission.name"
      type="text"
    />
    <button @click="setPermissions">Добавить доступ</button>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { usePermissionsStore } from '@/stores/permissions'

  const store = usePermissionsStore()
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

  const setPermissions = async () => {
    try {
      const res = await store.setPermissions(permission.value)
      if (res.status === 200) await getPermissions()
    } catch (error) {
      console.log(error)
    }
  }

  const deletePermissions = async permission => {
    try {
      const res = await store.deletePermissions(permission)
      if (res.status === 200) await getPermissions()
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(getPermissions)
</script>

<style lang="scss"></style>
