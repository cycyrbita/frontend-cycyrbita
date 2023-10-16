<template>
	<button @click="refresh">refresh</button>
	<router-view></router-view>
</template>

<script setup>
const refresh = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/refresh', { credentials: 'include' })
    const json = await res.json()
  } catch (e) {

  }
}
</script>