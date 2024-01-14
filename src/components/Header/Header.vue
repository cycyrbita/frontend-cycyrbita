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
ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
	overflow: hidden;
	background-color: #333;
}

li {
	float: left;
}

li a,
li button {
	display: block;
	color: white;
	text-align: center;
	padding: 14px 16px;
	text-decoration: none;
	background-color: transparent;
	border: 0;
	line-height: 24px;
	font-size: 15px;
	cursor: pointer;
}

/* Change the link color to #111 (black) on hover */
li a:hover,
li button:hover {
	background-color: #111;
}
</style>