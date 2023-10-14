<template>
	<div class="wrapper">
    <div
        class="overlay"
        v-if="isLoading"
    ></div>
		<div class="heading">
      <h2>Запрос на восстановления пароля</h2>
    </div>
		<div class="input-group">
			<input
          type="text"
          class="input-field"
          placeholder="Логин"
          v-model="email"
      >
		</div>
    <div class="input-group">
      <small style="color: red"><p>{{message}}</p></small>
    </div>
		<div class="input-group row">
			<div class="row">
				<router-link to="/login">Авторизоваться</router-link>
			</div>
			<div class="row">
				<router-link to="/registration">Регистрация</router-link>
			</div>
		</div>
		<div
        class="input-group"
        @click="recoveryPassword"
    >
			<button>Восстановить</button>
		</div>
	</div>
</template>

<script setup>
import {ref} from "vue";
import useFetch from "@/composables/useFetch";

const isLoading = ref(false)
const email = ref('')
const message = ref('')

const recoveryPassword = async () => {
  try {
    isLoading.value = true
    const res = await useFetch.post('add-recovery-password-link', {email: email.value})
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
@import "/src/views/recovery-password/styles/recovery-password.scss";
</style>