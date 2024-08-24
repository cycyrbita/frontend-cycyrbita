<template>
  <div class="roles">
    <ul>
      <li v-for="element in roles">
        <div class="role">
          <div class="role__left">
            <input
              v-model="element.name"
              type="text"
            />
            <button @click="setRole(element)">save</button>
            <button @click="deleteRole(element)">delete</button>
          </div>
          <div class="role__right">
            <div v-for="permission in permissions">
              <label>
                <input
                  v-model="element.permissions"
                  :value="permission"
                  type="checkbox"
                />
                <span>{{ permission.name }}</span>
              </label>
            </div>
            <hr />
          </div>
        </div>
      </li>
      <hr />
    </ul>
    <input
      v-model="role.name"
      type="text"
    />
    <button @click="setRole(role)">Добавить роль</button>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRolesStore } from '@/stores/roles'

  const store = useRolesStore()
  const role = ref({ name: '' })
  const roles = ref()
  const permissions = ref()

  // Получение ролей
  const getRoles = async () => {
    try {
      const res = await store.getRoles()
      if (res.status === 200) roles.value = await res.json()
    } catch (error) {
      console.log(error)
    }
  }

  // Создает или обновляет(передаем объект с ролью)
  const setRole = async element => {
    try {
      const res = await store.setRole(element)
      if (res.status === 200) {
        await getRoles()
        role.value.name = ''
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Удаляет
  const deleteRole = async role => {
    try {
      const res = await store.deleteRole(role)
      if (res.status === 200) await getRoles()
    } catch (error) {
      console.log(error)
    }
  }

  const getPermissions = async () => {
    try {
      const res = await store.getPermissions()
      if (res.status === 200) permissions.value = await res.json()
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(getRoles)
  onMounted(getPermissions)
</script>

<style lang="scss">
  hr {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .role {
    display: flex;
    justify-content: space-between;
  }
</style>
