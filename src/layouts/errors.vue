<template>
  <div class="page">
    <div class="page__body">
      <RouterView></RouterView>
    </div>
  </div>
</template>

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
