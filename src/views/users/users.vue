<template>
  <div class="users">
    <div class="container">
      <div class="users__body">
        <div
          class="card-user"
          v-for="user in users"
        >
          <div class="card-user__header">
            <div class="card-user__name">{{ user.nickName }}</div>
            <div class="card-user__email">{{ user.email }}</div>
          </div>
          <div class="card-user__body">
            <span
              v-for="role in user.roles"
              class="card-user__description"
              >{{ role.name }},
            </span>
          </div>
          <div class="card-user__update">
            <div class="card-user__info">
              <label class="card-user__label">
                <p class="card-user__title">Имя</p>
                <input
                  v-model="user.nickName"
                  type="text"
                  class="card-user__field"
                />
              </label>
              <label class="card-user__label">
                <p class="card-user__title">E-mail</p>
                <input
                  v-model="user.email"
                  type="text"
                  class="card-user__field"
                />
              </label>
              <label class="card-user__label">
                <p class="card-user__title">Пароль</p>
                <input
                  v-model="user.newPassword"
                  type="text"
                  class="card-user__field"
                />
              </label>
              <label class="card-user__label">
                <span class="card-user__title">Блокировка аккаунта</span>
                <input
                  v-model="user.accountDeleted"
                  class="card-user__checkbox"
                  type="checkbox"
                />
              </label>
            </div>
            <div class="card-user__roles">
              <span class="card-user__title">Роль</span>
              <div class="card-user__roles-checkbox">
                <label
                  v-for="elem in roles"
                  class="card-user__label card-user__label--checkbox"
                >
                  <input
                    v-model="user.roles"
                    :value="elem"
                    type="checkbox"
                    class="card-user__checkbox"
                  />
                  <span class="card-user__title">{{ elem.name }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="card-user__buttons">
            <button @click="updateUser(user)">Сохранить</button>
            <button @click="deleteUser(user)">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--    <div v-for="user in users">-->
  <!--      <div class="users__body">-->
  <!--        <div class="users__info">-->
  <!--          <p>{{ user.email }}</p>-->
  <!--          <label>-->
  <!--            <span>Ник</span>-->
  <!--            <input-->
  <!--              v-model="user.nickName"-->
  <!--              type="text"-->
  <!--            />-->
  <!--          </label>-->
  <!--          <label>-->
  <!--            <span>Имя</span>-->
  <!--            <input-->
  <!--              v-model="user.firstName"-->
  <!--              type="text"-->
  <!--            />-->
  <!--          </label>-->
  <!--          <label>-->
  <!--            <span>Фамилия</span>-->
  <!--            <input-->
  <!--              v-model="user.lastName"-->
  <!--              type="text"-->
  <!--            />-->
  <!--          </label>-->
  <!--          <label>-->
  <!--            <span>Возраст</span>-->
  <!--            <input-->
  <!--              v-model="user.age"-->
  <!--              type="text"-->
  <!--            />-->
  <!--          </label>-->
  <!--          <label>-->
  <!--            <span>Блокировка аккаунта</span>-->
  <!--            <input-->
  <!--              v-model="user.accountDeleted"-->
  <!--              type="checkbox"-->
  <!--            />-->
  <!--          </label>-->
  <!--        </div>-->
  <!--        <div class="users__roles">-->
  <!--          <label v-for="elem in roles">-->
  <!--            <span>{{ elem.name }}</span>-->
  <!--            <input-->
  <!--              v-model="user.roles"-->
  <!--              :value="elem"-->
  <!--              type="checkbox"-->
  <!--            />-->
  <!--          </label>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      <button @click="updateUser(user)">save</button>-->
  <!--      <button @click="deleteUser(user)">delete</button>-->
  <!--    </div>-->
  <!--    <hr />-->
  <!--  </div>-->
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
