<template>
  <router-view></router-view>
</template>

<script setup>
  import useFetch from '@/composables/useFetch'

  import { useAuthStore } from '@/stores/auth'
  import { useUserStore } from '@/stores/user'

  import { onBeforeMount } from 'vue'

  const storeAuth = useAuthStore()
  const storeUser = useUserStore()

  const authorisation = async () => {
    console.log(7777)
    try {
      const res = await useFetch.get('refresh')
      const json = await res.json()

      // если токен обновился
      if (res.status === 200) {
        // устанавливаем token
        localStorage.setItem('accessTokenCycyrbita', json.accessToken)
        // переключаем флаг авторизации
        storeAuth.auth = true
        // передаем пользователя
        storeUser.user = json.user
      } else {
        // переключаем флаг авторизации
        storeAuth.auth = false
        // передаем дефолтного пользователя
        storeUser.user = { role: 'role.default' }
      }
    } catch (e) {
      console.log(e)
    }
  }

  onBeforeMount(authorisation)
</script>
