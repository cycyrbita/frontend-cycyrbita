<template>
  <div v-if="promo"
       class="promo__modal"
       @click="$emit('hidePromo')"
  >
    <div class="promo__card">
      <div class="container">
<!--        <img class="promo__img"
             :src="`${path}${promo}/${link}/screenshot.png`"
             alt="screenshot"
        >-->
        <a :href="`${path}${promo}/${link}/index.html`">перейти по ссылке</a>
        <button class="btn">{{ promo }} {{link}}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({ promo: String, link: String})
const emits = defineEmits(['hidePromo'])
const path = import.meta.env.VITE_CLIENT_PROMO_PATH

</script>

<style scoped
       lang="scss"
>
@import "@/components/new-promo/styles/new-promo-card.scss";
</style>