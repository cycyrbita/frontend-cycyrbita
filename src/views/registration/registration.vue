<template>
  <div class="registration wrapper">
    <div class="auth-form">
      <div
          class="overlay"
          v-if="isLoading"
      ></div>
      <h2 class="auth-form__heading">Регистрация</h2>
      <input
          type="text"
          class="auth-form__input"
          placeholder="Почта"
          v-model="email"
      />
      <input
          type="text"
          class="auth-form__input"
          placeholder="Пароль"
          v-model="password"
      />
      <p v-if="message" class="auth-form__text">{{ message }}</p>
      <button @click="registration" class="auth-form__btn">Зарегистрироваться</button>
      <router-link to="/login" class="auth-form__link auth-form__link_color">Авторизоваться</router-link>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import useFetch from "@/composables/useFetch";

const isLoading = ref(false)
const email = ref('')
const password = ref('')
const message = ref('')

const registration = async () => {
  try {
    // индикатор загрузки
    isLoading.value = true
    // запрос
    const res = await useFetch.post('registration', { email: email.value, password: password.value })
    // ковертируем данные
    const json = await res.json()
    // если все успешно
    console.log(res.status)
    if (res.status === 200) router.push('/login')
    // текст ошибки
    message.value = json.message
  } catch (e) {
    throw e
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss">
@import "/src/views/registration/styles/registration.scss";
</style>