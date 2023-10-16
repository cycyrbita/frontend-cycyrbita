<template>
	<button @click="refresh">refresh</button>
	<router-view></router-view>
</template>

<script setup>
import axios from 'axios';

const refresh = () => {
axios.get('http://localhost:5000/api/refresh', { withCredentials: true })
	.then((res) => {
		console.log(res)
	})
}
</script>