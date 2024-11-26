<template>
  <div class="login wrapper">
    <div
      class="auth-form"
      @keyup.enter="login"
    >
      <div
        class="overlay"
        v-if="isLoading"
      ></div>
      <h2 class="auth-form__heading">Авторизация</h2>
      <input
        type="text"
        class="auth-form__input"
        placeholder="Логин"
        v-model="email"
      />
      <input
        type="password"
        class="auth-form__input"
        placeholder="Пароль"
        v-model="password"
      />
      <p
        v-if="message"
        class="auth-form__text"
      >
        {{ message }}
      </p>
      <button
        @click="login"
        class="auth-form__btn"
      >
        Войти
      </button>
      <router-link
        to="/add-recovery-password-link"
        class="auth-form__link"
        >Забыли пароль?</router-link
      >
      <router-link
        to="/registration"
        class="auth-form__link auth-form__link_color"
        >Регистрация</router-link
      >
    </div>
  </div>
</template>

<script setup>
  import router from '@/router'
  import { ref } from 'vue'
  import useFetch from '@/composables/useFetch'
  import { useAuthStore } from '@/stores/auth'
  import { useUserStore } from '@/stores/user'

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
      const res = await useFetch.post('login', { email: email.value, password: password.value })
      // ковертируем данные
      const json = await res.json()
      // если все успешно
      if (res.status === 200) {
        // записываем в localstorage
        localStorage.setItem('accessTokenCycyrbita', json.accessToken)
        // меняем флаг авторизации
        storeAuth.auth = true
        // получаем пользователя
        storeUser.user = json.user
        // редирект
        await storeUser.getUser()
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

<style lang="scss">
  @use '@/views/login/styles/login.scss' as *;
</style>
