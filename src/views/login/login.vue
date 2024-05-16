<template>
    <div class="wrapper">
        <div class="card"
             @keyup.enter="login"
        >
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
                <small style="color: red"><p>{{ message }}</p></small>
            </div>
            <div class="input-group">
                <button @click="login">Войти</button>
            </div>
            <div class="input-group row">
                <div class="row">
                    <router-link to="/add-recovery-password-link" class="form__link">Забыли пароль?</router-link>
                </div>
                <div class="row">
                    <router-link to="/registration" class="form__link form__link_color">Регистрация</router-link>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import router from "@/router";
import {ref} from "vue";
import useFetch from "@/composables/useFetch";
import {useAuthStore} from "@/stores/auth";
import {useUserStore} from "@/stores/user";

const storeAuth = useAuthStore()
const storeUser = useUserStore()

const isLoading = ref(false)
const email = ref('')
const password = ref('')
const message = ref('')

const login = async () => {
  try {
    isLoading.value = true
		// запрос
    const res = await useFetch.post('login', {email: email.value, password: password.value})
		// ковертируем данные
    const json = await res.json()
		// если все успешно
    if(res.status === 200) {
			// записываем в localstorage
      localStorage.setItem('accessTokenCycyrbita', json.accessToken)
			// меняем флаг авторизации
			storeAuth.auth = true
			// получаем пользователя
			storeUser.user = json.user
			// редирект
      router.push('/')
    }
		// текст ошибки
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