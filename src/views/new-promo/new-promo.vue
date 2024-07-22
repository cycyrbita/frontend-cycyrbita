<template>
  <section class="promo">
    <div class="promo__container container">
      <div class="promo__card"
           v-for="item of store.list"
           :key="item._id"
      >
        <h2 class="promo__title">{{ item.title }}</h2>
        <div class="promo__list">
          <div
              class="promo__btn promo__btn_lend"
              v-for="lend of item.lends"
              :key="lend"
              @click="selectPromo(item.title, lend)"
          >{{ lend }}
          </div>
        </div>
        <div class="promo__list">
          <div class="promo__btn promo__btn_prelend"
               v-for="prelend of item.prelends"
               :key="prelend"
               @click="selectPromo(item.title, prelend)"
          >{{ prelend }}
          </div>
        </div>
        <NewPromoCard
            :promo="targetPromo"
            :link="targetLink"
            @hidePromo="hidePromo"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useNewPromoStore } from '@/stores/new-promo'
import NewPromoCard from "@/components/new-promo/new-promo-card.vue";

const store = useNewPromoStore()
const targetPromo = ref()
const targetLink = ref()

const selectPromo = (title, link) => {
  targetPromo.value = title
  targetLink.value = link
}

const hidePromo = () => {
  targetPromo.value = null
  targetLink.value = null
}

onMounted(store.getNewPromo)
</script>

<style scoped
       lang="scss"
>
@import "@/views/new-promo/styles/new-promo.scss";
</style>