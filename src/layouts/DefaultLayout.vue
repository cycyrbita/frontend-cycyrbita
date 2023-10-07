<template>
  <div class="page">
    <div class="page__header">
      <Header></Header>
    </div>
    <div class="page__body">
      <slot>
        <RouterView></RouterView>
      </slot>
    </div>
    <div class="page__footer"></div>
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue"
</script>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;

    &__body {
      flex-grow: 1;
    }
  }
</style>