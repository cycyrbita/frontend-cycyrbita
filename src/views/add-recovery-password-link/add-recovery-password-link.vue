<template>
  <div class="add-recovery-password-link wrapper">
    <div class="auth-form">
      <div
          class="overlay"
          v-if="isLoading"
      ></div>
      <h2 class="auth-form__heading">Восстановления пароля</h2>
      <input
          type="text"
          class="auth-form__input"
          placeholder="Почта"
          v-model="email"
      />
      <p class="auth-form__text">{{ message }}</p>
      <div>
        <button @click="recoveryPassword" class="auth-form__btn">Восстановить</button>
      </div>
      <router-link to="/login" class="auth-form__link">Авторизоваться</router-link>
      <router-link to="/registration" class="auth-form__link auth-form__link_color">Регистрация</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useFetch from '@/composables/useFetch'

const isLoading = ref(false)
const email = ref('')
const message = ref('')

const recoveryPassword = async () => {
  try {
    isLoading.value = true
    const res = await useFetch.post('add-recovery-password-link', { email: email.value })
    const json = await res.json()
    message.value = json.message
  } catch (e) {
    throw e
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@import '/src/views/add-recovery-password-link/styles/add-recovery-password-link.scss';
</style>
