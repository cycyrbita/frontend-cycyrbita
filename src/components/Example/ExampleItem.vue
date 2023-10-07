<template>
	<p>{{store.count}}</p>
	<p>{{store.doubleCount}}</p>
	<button @click="store.increment">Жмякни!</button>
	<router-link to="/">Go to Home</router-link>
</template>

<script setup>
	import {useExampleStore} from "@/stores/example"

	const store = useExampleStore()
</script>