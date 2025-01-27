<template>
  <div class="promo__modal"
       @click="hidePromo"
       ref="modal"
  >
    <div class="promo__card promo__card-item">
      <h2 class="promo__name">{{link.replaceAll('_', ' ')}}</h2>
      <div class="promo__card-container container">
        <img class="promo__img"
             width="1441"
             height="1080"
             loading="lazy"
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
              class="promo__link promo__link_pink"
          >Скачать</a>
          <button class="promo__link promo__link_red"
                  @click.prevent="deletePromo"
          >Удалить
          </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import useFetch from '@/composables/useFetch'
import { useNewPromoStore } from "@/stores/new-promo";

const store = useNewPromoStore()
const url = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV
const path = `${url}new_promo/`
const promo = store.targetPromo.title
const link = store.targetPromo.link
const promoPath = `${path}${promo}/${link}/`
const apiPath = `${url}api/new-promo/download-new-promo/?promo=${promo}&link=${link}`
const modal = ref(null)
const hidePromo = (e) => e.target === modal.value ? store.hidePromo() : undefined
const deletePromo = async () => store.visibleDeleted = true
</script>

<style lang="scss">
@use "@/components/new-promo/styles/new-promo-card.scss" as *;
</style>