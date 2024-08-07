<template>
  <div v-if="promo"
       class="promo__modal"
       @click="$emit('hidePromo')"
  >
    <div class="promo__card">
      <div class="promo__card-container container">
        <img class="promo__img"
             :src="`${promoPath}screenshot.jpg`"
             alt="screenshot"
        >
        <a target="_blank"
           class="promo__link"
           :href="promoPath"
        >Открыть в новой вкладке
        </a>
        <a
            :href="apiPath"
            class="promo__btn"
        >Скачать</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import useFetch from '@/composables/useFetch'

const props = defineProps({ promo: Object })
const emits = defineEmits(['hidePromo'])
const url = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV
const path = `${url}new_promo/`
const promo = props.promo.title
const link = props.promo.path
const promoPath = `${path}${promo}/${link}/`
const apiPath = `${url}api/new-promo/download-new-promo/?promo=${promo}&link=${link}`

</script>

<style scoped
       lang="scss"
>
@import "@/components/new-promo/styles/new-promo-card.scss";
</style>