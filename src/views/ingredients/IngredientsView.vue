<template>
	<form @submit.prevent="send">
		<input
			type="file"
			name="ingredients"
			multiple
			v-on:change="handleFileUpload($event)"
		/>
		<button type="submit">Отправить</button>
	</form>
</template>

<script setup>
import useFetch from '@/composables/useFetch'
let formData = new FormData()

const handleFileUpload = (e) => {
	for (let key in e.target.files) formData.append('ingredients', e.target.files[key])
}

const send = async () => {
	try {
		const headers = {
			method: 'POST',
			body: formData,
			credentials: 'include',
		}

		const res = await useFetch.post('ingredients/create', null, headers)
		const json = await res.json()

		formData.delete('ingredients')

		console.log(json)
	} catch (e) {
		console.log(e)
	}
}
</script>