<template>
	<div class="wrapper">
    <div
        class="overlay"
        v-if="isLoading"
    ></div>
		<div class="heading"><h2>Авторизация</h2></div>
		<div class="input-group">
			<input
          type="text"
          class="input-field"
          placeholder="Логин"
          v-model="email"
      >
		</div>
		<div class="input-group">
			<input
          type="password"
          class="input-field"
          placeholder="Пароль"
          v-model="password"
      >
		</div>
    <div class="input-group">
      <small style="color: red"><p>{{message}}</p></small>
    </div>
		<div class="input-group row">
			<div class="row">
				<router-link to="/add-recovery-password-link">Забыли пароль</router-link>
			</div>
			<div class="row">
				<router-link to="/registration">Регистрация</router-link>
			</div>
		</div>
		<div class="input-group"><button @click="login">Войти</button></div>
	</div>
</template>

<script setup>
import router from "@/router";
import {ref} from "vue";
import useFetch from "@/composables/useFetch";
import {useAuthStore} from "@/stores/auth";

const isLoading = ref(false)
const email = ref('')
const password = ref('')
const message = ref('')

const login = async () => {
  try {
    isLoading.value = true
    const res = await useFetch.post('login', {email: email.value, password: password.value})
    const json = await res.json()
    if(res.status === 200) {
      localStorage.setItem('accessToken', json.accessToken)
      useAuthStore().isAuth = true
      useAuthStore().user = json.user
      router.push('/')
    }
    message.value = json.message
  } catch (e) {
    throw e
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@import "/src/views/login/styles/login.scss";
</style>