<template>
  <header class="header">
		<ul>
			<li><router-link to="/">Главная</router-link></li>
			<li><router-link v-if="storeAuth.auth && storeUser.user.role !== 'role.default'" to="/ingredients">Ингредиенты</router-link></li>
			<li><router-link v-if="storeAuth.auth && storeUser.user.role !== 'role.default'" to="/about">О нас</router-link></li>
			<li><router-link v-if="storeUser.user.role === 'role.admin'" to="/users">Пользователи</router-link></li>
			<li><router-link v-if="!storeAuth.auth" to="/login">Войти</router-link></li>
			<li><router-link v-if="!storeAuth.auth" to="/registration">Регистрация</router-link></li>
			<li><button v-if="storeAuth.auth" @click.prevent="logout">Выйти</button></li>
		</ul>
  </header>
</template>

<script setup>
import {useAuthStore} from "@/stores/auth";
import {useUserStore} from "@/stores/user";
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

<style scoped>
@import "@/components/Header/styles/header.scss";
</style>