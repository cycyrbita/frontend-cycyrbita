<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <router-link to="/" class="nav__link">Главная</router-link>
        <router-link v-if="storeAuth.auth && storeUser.user.role !== 'role.default'" to="/ingredients" class="nav__link">Ингредиенты</router-link>
        <router-link v-if="storeAuth.auth && storeUser.user.role !== 'role.default'" to="/new_promo" class="nav__link">Новые промо</router-link>
        <router-link v-if="storeAuth.auth && storeUser.user.role !== 'role.default'" to="/clean" class="nav__link">Чистые</router-link>
        <router-link v-if="storeAuth.auth && storeUser.user.role !== 'role.default'" to="/avatars" class="nav__link">Аватарки</router-link>
        <router-link v-if="storeUser.user.role === 'role.admin'" to="/users" class="nav__link">Пользователи</router-link>
        <router-link v-if="!storeAuth.auth" to="/login" class="nav__link">Войти</router-link>
        <router-link v-if="!storeAuth.auth" to="/registration" class="nav__link">Регистрация</router-link>
        <button v-if="storeAuth.auth" class="nav__link nav__login" @click.prevent="logout">Выйти</button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import router from "@/router";
import useFetch from "@/composables/useFetch";

const storeAuth = useAuthStore()
const storeUser = useUserStore()

const logout = async () => {
	try {
		const res = await useFetch.post('logout')
		if(res.status === 200) {
			localStorage.removeItem('accessTokenCycyrbita')
			// переключаем флаг авторизации
			storeAuth.auth = false
			// передаем дефолтного пользователя
			storeUser.user = {role: 'role.default'}
			// редиректим
			router.push('/login')
		}
	} catch (e) {
		throw e
	}
}
</script>

<style scoped lang="scss">
@import "@/components/Header/styles/header.scss";
</style>