<template>
	<h1>Example</h1>
	<ExampleList></ExampleList>
	<router-link to="/example/item">Example-item</router-link>
</template>

<script setup>
import ExampleList from "@/components/Example/ExampleList.vue"
</script>

<style lang="scss" scoped>
@import "styles/example.scss";
</style>