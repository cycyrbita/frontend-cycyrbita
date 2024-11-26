<template>
  <div class="error-404">
    <h1 class="error-404__title">
      страницы
      <br />
      не существуЕт
    </h1>
    <router-link
      to="/"
      class="error-404__link"
      >помогите</router-link
    >
  </div>
</template>

<style lang="scss">
  @use '@/views/404/styles/404.scss' as *;
</style>
