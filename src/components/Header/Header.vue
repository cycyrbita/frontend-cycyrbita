<template>
  <header class="header">
		<ul>
			<li><router-link to="/">Главная</router-link></li>
			<li><router-link v-if="auth.user.role === 'role.admin' || auth.user.role === 'role.cycyrbit'" to="/about">О нас</router-link></li>
			<li><router-link v-if="auth.user.role === 'role.admin' && auth.isAuth" to="/example">Пример</router-link></li>
			<li><router-link v-if="!auth.isAuth" to="/login">Войти</router-link></li>
			<li><router-link v-if="!auth.isAuth" to="/registration">Регистрация</router-link></li>
			<li><button v-if="auth.isAuth" @click.prevent="logout">Выйти</button></li>
		</ul>
  </header>
</template>

<script setup>
import {useAuthStore} from "@/stores/auth"
import router from "@/router";
const auth = useAuthStore()

const logout = () => {
  auth.isAuth = false
	router.push('/login')
}
</script>

<style>
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