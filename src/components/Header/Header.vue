<template>
  <header class="header">
    <div class="container">
      <ul>
        <li>
          <router-link to="/">Главная</router-link>
        </li>
        <li v-if="storeAuth.auth && storeUser.user.role !== 'role.default'"><router-link to="/promo">Новые промо</router-link></li>
        <li v-if="storeAuth.auth && storeUser.user.role !== 'role.default'"><router-link to="/clean">Чистые</router-link></li>
        <li v-if="storeAuth.auth && storeUser.user.role !== 'role.default'"><router-link to="/ingredients">Ингредиенты</router-link></li>
        <li v-if="storeAuth.auth && storeUser.user.role !== 'role.default'"><router-link to="/avatars">Аватарки</router-link></li>
        <li v-if="storeUser.user.role === 'role.admin'"><router-link to="/users">Пользователи</router-link></li>
        <li v-if="!storeAuth.auth"><router-link to="/login">Войти</router-link></li>
        <li v-if="!storeAuth.auth"><router-link to="/registration">Регистрация</router-link></li>
        <li v-if="storeAuth.auth" class="header__login"><button @click.prevent="logout">Выйти</button></li>
      </ul>
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