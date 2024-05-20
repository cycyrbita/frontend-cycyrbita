<template>
  <div class="wrapper">
    <div class="card">
      <div
          class="overlay"
          v-if="isLoading"
      ></div>
      <div class="heading"><h2>Восстановление пароля</h2></div>
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
            placeholder="Новый пароль"
            v-model="password"
        >
      </div>
      <div class="input-group">
        <input
            type="password"
            class="input-field"
            placeholder="Новый пароль"
            v-model="passwordRepeat"
        >
      </div>
      <div class="input-group">
        <small style="color: red"><p>{{ message }}</p></small>
      </div>
      <div
          class="input-group"
          @click="recoveryPassword"
      >
        <button>Восстановить</button>
      </div>
      <div class="input-group row">
        <div class="row">
          <router-link to="/login" class="form__link">Авторизоваться</router-link>
        </div>
        <div class="row">
          <router-link to="/registration" class="form__link form__link_color">Регистрация</router-link>
        </div>
      </div>
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