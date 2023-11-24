<template>
	<router-link v-if="$route.name !== 'ingredients'" style="line-height: normal; text-decoration: none" class="p-button p-component p-button-outlined" :to="{name: 'ingredients'}" outlined>Посмотреть ингредиенты</router-link>
	<router-link v-if="$route.name !== 'ingredients-create'" style="line-height: normal; text-decoration: none" class="p-button p-component p-button-outlined" :to="{name: 'ingredients-create'}" outlined>Создать ингредиент</router-link>
</template>

<script setup></script>

<style scoped lang="scss">
@import '@/components/Ingredients/styles/ingredients-filter.scss';
</style>