<template>
  <DefaultLayout>
    <div class="home">
      <h1>Home</h1>
    </div>
  </DefaultLayout>
</template>

<script setup>
import {useAuthStore} from "@/stores/auth"
import DefaultLayout from "@/layouts/DefaultLayout.vue"

let store = useAuthStore()

setTimeout(() => {
  store.changAuth()
  console.log('ready')
}, 5000)
</script>