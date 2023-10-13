<template>
  <header class="header">
		<ul>
			<li><router-link to="/">Главная</router-link></li>
			<li><router-link to="/about">О нас</router-link></li>
			<li><router-link to="/example">Пример</router-link></li>
			<li><router-link to="/example/item">Пример-item</router-link></li>
			<li><router-link to="/login">Войти</router-link></li>
			<li><router-link to="/registration">Регистрация</router-link></li>
			<li><router-link to="/recovery-password">Восстановить пароль</router-link></li>
			<li><a @click.prevent="logout">Выйти</a></li>
		</ul>
  </header>
</template>

<script setup>
import {useAuthStore} from "@/stores/auth"
import router from "@/router";
const auth = useAuthStore()

const logout = () => {
	auth.isAuth = false
	router.push('/')
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

li a {
	display: block;
	color: white;
	text-align: center;
	padding: 14px 16px;
	text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
	background-color: #111;
}
</style>