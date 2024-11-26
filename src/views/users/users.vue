<template>
  <Toast />
  <div class="users">
    <div class="container">
      <div class="users__body">
        <div class="users__list">
          <div
            class="users-card"
            v-for="user in users"
            :key="user._id"
          >
            <div class="users-card__header">
              <div class="users-card__name">{{ user.firstName }}</div>
              <div class="users-card__mail">{{ user.email }}</div>
            </div>
            <div class="users-card__roles">
              <div
                class="users-card__role"
                v-for="role in user.roles"
                :key="role._id"
              >
                {{ role.name }}
              </div>
            </div>
            <div class="users-card__line"></div>
            <div class="users-card__body">
              <label
                for=""
                class="users-card__label"
              >
                <span class="users-card__label-name">Псевдоним</span>
                <input
                  type="text"
                  class="users-card__input"
                  v-model="user.nickName"
                />
              </label>
              <label
                for=""
                class="users-card__label"
              >
                <span class="users-card__label-name">E-mail</span>
                <input
                  type="text"
                  class="users-card__input"
                  v-model="user.email"
                />
              </label>
              <label
                for=""
                class="users-card__label"
              >
                <span class="users-card__label-name">Пароль</span>
                <input
                  type="text"
                  class="users-card__input"
                  v-model="user.newPassword"
                />
              </label>
              <label
                for=""
                class="users-card__label"
              >
                <Transition name="bounce">
                  <MultiSelect
                    v-model="user.roles"
                    :options="roles"
                    class="users-card__select"
                    panelClass="users-card__select-panel"
                    :maxSelectedLabels="1"
                    optionLabel="name"
                    scrollHeight="700px"
                    :showToggleAll="false"
                    placeholder="Роли"
                  />
                </Transition>
              </label>
            </div>
            <div class="users-card__block">
              <Checkbox
                v-model="user.accountDeleted"
                :binary="true"
                :inputId="`${user._id}-user-block`"
                class="users-card__block-input"
              />
              <label
                :for="`${user._id}-user-block`"
                class="users-card__block-label"
              >
                <span class="users-card__block-label-name">Блокировка Аккаунта</span>
              </label>
            </div>
            <div class="users-card__buttons">
              <button
                @click="updateUser(user)"
                class="users-card__button users-card__button--save"
              >
                Сохранить
              </button>
              <button
                @click="deleteUser(user)"
                class="users-card__button users-card__button--danger"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onBeforeMount, ref } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { useRolesStore } from '@/stores/roles'
  import MultiSelect from 'primevue/multiselect'
  import Checkbox from 'primevue/checkbox'
  import Toast from 'primevue/toast'
  import { useToast } from 'primevue/usetoast'

  const toast = useToast()

  const store = useUserStore()
  const store_roles = useRolesStore()

  const users = ref()
  const roles = ref()

  const statusCode = (detail = 'Успешно', severity = 'success', life = 3000) => toast.add({ severity: severity, detail: detail, life: life })

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
      statusCode('Пользователь обновлен')
    } catch (e) {
      statusCode('Ошибка', 'error')
      console.log(e)
    }
  }

  const deleteUser = async user => {
    try {
      const res = await store.deleteUser(user)
      if (res.status === 200) await getUsers()
      statusCode('Пользователь удален')
    } catch (e) {
      statusCode('Ошибка', 'error')
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

  onBeforeMount(getUsers)
  onBeforeMount(getRoles)
</script>

<style lang="scss">
  @use '@/views/users/styles/users.scss' as *;
</style>
