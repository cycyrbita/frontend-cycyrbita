<template>
  <section class="home wrapper">
    <nav v-if="storeAuth.auth && storeUser.user.role !== 'role.default'" class="home__nav">
        <router-link v-for="item in viewsList" ref="nav__item" :to="item.link" class="home__nav-item home__nav-link"> {{ item.value }}</router-link>
    </nav>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";

const storeAuth = useAuthStore()
const storeUser = useUserStore()

const viewsList = [
  { link: '/ingredients', value: 'Ингредиенты' },
  { link: '/new_promo', value: 'Новые промо' },
  { link: '/clean', value: 'Чистые' },
  { link: '/avatars', value: 'Аватарки' }
]

onMounted(() => {
  const navList = [...document.querySelectorAll('.home__nav-item')]
  const itemBackground = (opacity) => `rgba(92, 113, 188, ${opacity})`
  const part = (array, index) => Math.round((index / array) * 10) / 10 + 0.4

  navList.forEach((item, index) => item.style.background = itemBackground(part(navList.length, index)))
})

</script>

<style scoped lang="scss">
@import "@/views/home/styles/home.scss";
</style>