<template>
  <Toast />
  <div class="permissions">
    <div class="container">
      <div class="permissions__body">
        <div class="permissions__row">
          <div class="permissions__col">
            <input
              v-model="permission.name"
              type="text"
              class="permissions__field permissions__field--white"
              placeholder="Добавить доступ"
            />
          </div>
          <div class="permissions__col">
            <button
              class="permissions__button"
              @click="setPermission(permission)"
            >
              Добавить доступ
            </button>
          </div>
        </div>
        <div
          class="permissions__row"
          v-for="element in permissions"
        >
          <div class="permissions__col">
            <input
              v-model="element.name"
              type="text"
              class="permissions__field"
            />
          </div>
          <div class="permissions__col">
            <button
              class="permissions__button"
              @click="setPermission(element)"
            >
              Изменить
            </button>
          </div>
          <div class="permissions__col">
            <button
              class="permissions__button permissions__button--danger"
              @click="deletePermission(element)"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRolesStore } from '@/stores/roles'
  import { useToast } from 'primevue/usetoast'
  import Toast from 'primevue/toast'

  const toast = useToast()

  const statusCode = (detail = 'Успешно', severity = 'success', life = 3000) => toast.add({ severity: severity, detail: detail, life: life })

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
        const json = await res.json()
        json?.statusInfo === 'update' ? statusCode('Доступ изменен') : statusCode('Доступ создан')
      }
    } catch (error) {
      statusCode('Ошибка', 'error')
      console.log(error)
    }
  }

  const deletePermission = async permission => {
    try {
      const res = await store.deletePermission(permission)
      if (res.status === 200) await getPermissions()
      statusCode('Доступ удален')
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(getPermissions)
</script>

<style lang="scss">
  @use '@/views/permissions/styles/permissions.scss' as *;
</style>
