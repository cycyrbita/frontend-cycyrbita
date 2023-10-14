<template>
	<div class="wrapper">
    <div
        class="overlay"
        v-if="isLoading"
    ></div>
    <div class="heading"><h2>Регистрация</h2></div>
    <div class="input-group">
      <input
          type="text"
          class="input-field"
          placeholder="Почта"
          v-model="email"
      >
    </div>
    <div class="input-group">
      <input
          type="text"
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
        <router-link to="/login">Авторизоваться</router-link>
      </div>
    </div>
    <div
        class="input-group"
        @click="registration"
    >
      <button>Зарегистрироваться</button></div>
  </div>
</template>

<script setup>
  import router from "@/router";
  import {ref} from "vue";
  import useFetch from "@/composables/useFetch";

  const isLoading = ref(false)
  const email = ref('')
  const password = ref('')
  const message = ref('')

  const registration = async () => {
    try {
      isLoading.value = true
      const res = await useFetch.post('registration', {email: email.value, password: password.value})
      const json = await res.json()
      if(res.status === 200) router.push('/login')
      message.value = json.message
    } catch (e) {
      throw e
    } finally {
      isLoading.value = false
    }
  }
</script>

<style scoped>
@import "/src/views/registration/styles/registration.scss";
</style>