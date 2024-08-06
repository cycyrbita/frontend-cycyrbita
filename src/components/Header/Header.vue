<template>
  <header class="header">
    <div class="container">
      <nav class="header__nav">
        <router-link
          to="/"
          class="header__link"
          >Главная</router-link
        >
        <router-link
          v-if="storeAuth.auth"
          to="/ingredients"
          class="header__link"
          >Ингредиенты</router-link
        >
        <router-link
          v-if="storeAuth.auth"
          to="/new_promo"
          class="header__link"
          >Новые промо</router-link
        >
        <router-link
          v-if="storeAuth.auth"
          to="/clean"
          class="header__link"
          >Чистые</router-link
        >
        <router-link
          v-if="storeAuth.auth"
          to="/avatars"
          class="header__link"
          >Аватарки</router-link
        >
        <router-link
          v-if="storeAuth.auth"
          to="/users"
          class="header__link"
          >Пользователи</router-link
        >
        <router-link
          v-if="!storeAuth.auth"
          to="/login"
          class="header__link"
          >Войти</router-link
        >
        <router-link
          v-if="!storeAuth.auth"
          to="/registration"
          class="header__link"
          >Регистрация</router-link
        >
        <button
          v-if="storeAuth.auth"
          class="header__link header__login"
          @click.prevent="logout"
        >
          Выйти
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
  import { useAuthStore } from '@/stores/auth'
  import router from '@/router'
  import useFetch from '@/composables/useFetch'
  import { useUserStore } from '@/stores/user'

  const storeAuth = useAuthStore()
  const storeUser = useUserStore()

  const logout = async () => {
    try {
      const res = await useFetch.post('logout')
      if (res.status === 200) {
        localStorage.removeItem('accessTokenCycyrbita')
        // переключаем флаг авторизации
        storeAuth.auth = false
        storeUser.user = {}
        // редиректим
        await router.push('/login')
      }
    } catch (e) {
      throw e
    }
  }
</script>

<style lang="scss">
  @import '@/components/Header/styles/header.scss';
</style>
