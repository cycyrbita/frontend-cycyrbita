<template>
  <section class="face wrapper">
    <img :src="`${VITE_IMAGE_PATH}/face/face.png`">
  </section>
</template>
<script setup>
const VITE_IMAGE_PATH = import.meta.env.MODE === 'production' ? import.meta.env.VITE_IMAGE_PATH_PROD : import.meta.env.VITE_IMAGE_PATH_DEV
</script>

<style scoped lang="scss">
@import "@/views/face/styles/face.scss";
</style>