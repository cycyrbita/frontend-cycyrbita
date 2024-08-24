<template>
  <div class="users">
    <div v-for="user in users">
      <div class="users__body">
        <div class="users__info">
          <p>{{ user.email }}</p>
          <label>
            <span>Ник</span>
            <input
              v-model="user.nickName"
              type="text"
            />
          </label>
          <label>
            <span>Имя</span>
            <input
              v-model="user.firstName"
              type="text"
            />
          </label>
          <label>
            <span>Фамилия</span>
            <input
              v-model="user.lastName"
              type="text"
            />
          </label>
          <label>
            <span>Возраст</span>
            <input
              v-model="user.age"
              type="text"
            />
          </label>
          <label>
            <span>Блокировка аккаунта</span>
            <input
              v-model="user.accountDeleted"
              type="checkbox"
            />
          </label>
        </div>
        <div class="users__roles">
          <label v-for="elem in roles">
            <span>{{ elem.name }}</span>
            <input
              v-model="user.roles"
              :value="elem"
              type="checkbox"
            />
          </label>
        </div>
      </div>
      <button @click="updateUser(user)">save</button>
      <button @click="deleteUser(user)">delete</button>
    </div>
    <hr />
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { useRolesStore } from '@/stores/roles'

  const store = useUserStore()
  const store_roles = useRolesStore()

  const users = ref()
  const roles = ref()

  const getUsers = async () => {
    try {
      const res = await store.getUsers()
      if (res.status === 200) users.value = await res.json()
    } catch (e) {
      console.log(e)
    }
  }

  const updateUser = async user => {
    try {
      user.permissions = user.roles
        .map(el => el.permissions)
        .flat()
        .filter((el, i, arr) => i === arr.findIndex(el2 => el2.name === el.name))
      await store.updateUser(user)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteUser = async user => {
    try {
      const res = await store.deleteUser(user)
      if (res.status === 200) await getUsers()
    } catch (e) {
      console.log(e)
    }
  }

  const getRoles = async () => {
    try {
      const res = await store_roles.getRoles()
      if (res.status === 200) roles.value = await res.json()
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(getUsers)
  onMounted(getRoles)
</script>

<style scoped>
  @import '/src/views/users/styles/users.scss';
</style>
