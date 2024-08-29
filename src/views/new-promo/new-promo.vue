<template>
  <section class="promo">
    <div class="promo__container container">
      <div class="promo__card"
           v-for="item of store.list.promo"
           :key="item._id"
      >
        <h2 class="promo__title">{{ item.title }}</h2>
        <div class="promo__list">
          <div
              class="promo__btn promo__btn_lend"
              v-for="lend of item.lends"
              :key="lend"
              @click="store.selectPromo(item._id, item.title, lend)"
          >{{ formatName(lend, item.title) }}
          </div>
        </div>
        <div class="promo__list">
          <div class="promo__btn promo__btn_prelend"
               v-for="prelend of item.prelends"
               :key="prelend"
               @click="store.selectPromo(item._id, item.title, prelend)"
          >{{ formatName(prelend, item.title) }}
          </div>
        </div>
        <div class="promo__list">
          <div class="promo__btn promo__btn_sites"
               v-for="site of item.sites"
               :key="site"
               @click="store.selectPromo(item._id, item.title, site)"
          >{{ formatName(site, item.title) }}
          </div>
        </div>
      </div>
      <NewPromoCard v-if="store.targetPromo.title"/>
      <NewPromoAdd/>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useNewPromoStore } from '@/stores/new-promo'
import NewPromoCard from "@/components/new-promo/new-promo-card.vue";
import NewPromoAdd from "@/components/new-promo/new-promo-add.vue";

const store = useNewPromoStore()
const formatName = (fullName, deletePart) => fullName.replaceAll('_', ' ').replace(deletePart, '')
onMounted(store.getNewPromo)
</script>

<style scoped
       lang="scss"
>
@import "@/views/new-promo/styles/new-promo.scss";
</style>