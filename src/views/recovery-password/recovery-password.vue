<template>
  <div class="recovery-password wrapper">
    <div class="auth-form">
      <div
          class="overlay"
          v-if="isLoading"
      ></div>
      <h2 class="auth-form__heading">Восстановление пароля</h2>
      <input
          type="text"
          class="auth-form__input"
          placeholder="Логин"
          v-model="email"
      >
      <input
          type="password"
          class="auth-form__input"
          placeholder="Новый пароль"
          v-model="password"
      >
      <input
          type="password"
          class="auth-form__input"
          placeholder="Новый пароль"
          v-model="passwordRepeat"
      >
      <p v-if="message" class="auth-form__text">{{ message }}</p>
      <button @click="recoveryPassword" class="auth-form__btn">Восстановить</button>
      <router-link to="/login" class="auth-form__link">Авторизоваться</router-link>
      <router-link to="/registration" class="auth-form__link auth-form__link_color">Регистрация</router-link>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";
import useFetch from "@/composables/useFetch";
import router from "@/router";

const isLoading = ref(false)
const email = ref('')
const password = ref('')
const passwordRepeat = ref('')
const message = ref('')

const recoveryPassword = async () => {
  if (password.value !== passwordRepeat.value) return message.value = 'Пароли не совпадают'
  try {
    isLoading.value = true
    const res = await useFetch.post('recovery-password', { email: email.value, password: password.value })
    const json = await res.json()
    if (res.status === 200) router.push('/login')
    message.value = json.message
  } catch (e) {
    throw e
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss">
@import "/src/views/recovery-password/styles/recovery-password.scss";
</style>