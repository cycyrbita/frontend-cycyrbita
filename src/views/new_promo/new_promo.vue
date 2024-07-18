<template>
  <section class="promo">
    <div class="container">
      <h1>{{ store }}</h1>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useNewPromoStore } from '@/stores/new-promo'
const store = useNewPromoStore()

onMounted(store.getNewPromo)
</script>

<style scoped lang="scss">
@import "@/views/new_promo/styles/new_promo.scss";
</style>