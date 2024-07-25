<template>
  <div v-if="promo"
       class="promo__modal"
       @click="$emit('hidePromo')"
  >
    <div class="promo__card">
      <div class="promo__card-container container">
        <img class="promo__img"
             :src="`${path}${promo}/${link}/screenshot.png`"
             alt="screenshot"
        >
        <a target="_blank"  class="promo__link" :href="`${path}${promo}/${link}/`">Открыть в новой вкладке</a>
        <button class="promo__btn">Скачать</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({ promo: String, link: String})
const emits = defineEmits(['hidePromo'])
const url = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV
const path = `${url}new_promo/`

</script>

<style scoped
       lang="scss"
>
@import "@/components/new-promo/styles/new-promo-card.scss";
</style>