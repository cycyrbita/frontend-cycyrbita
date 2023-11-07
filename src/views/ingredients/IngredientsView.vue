<template>
	<div>
		<input v-model="country" type="text" placeholder="Страна">
		<input v-model="title" type="text" placeholder="Заголовок">
		<textarea v-model="description" type="text" placeholder="Описание"></textarea>
		<input v-model="tag" type="text" placeholder="Тег">
		<input v-model="theme" type="text" placeholder="Тема">
		<input type="file" multiple @change="handleFileUpload" ref="uploadIngredients">
		<button @click="send" type="submit">Отправить</button>
	</div>
</template>

<script setup>
import useFetch from '@/composables/useFetch'
import {ref} from 'vue'
let formData = new FormData()

const ingredients = ref([])
const tags = ref([])

const country = ref()
const title = ref()
const description = ref()
const tag = ref()
const theme = ref()
const uploadIngredients = ref(null)

// запихиваем картинки в массив и добавляем в formData
const handleFileUpload = () => {
	for (let key in uploadIngredients.value.files) formData.append('ingredientsImages', uploadIngredients.value.files[key])
}

// создаем ингредиент
const addIngredient = () => {
	ingredients.value.push({
		country: country.value,
		title: title.value,
		description: description.value,
		tags: tags.value,
		theme: theme.value,
	})
}

// метод отправки
const send = async () => {
	try {
		const headers = {
			method: 'POST',
			body: formData,
			credentials: 'include',
		}

		addIngredient()
		formData.append('ingredients', JSON.stringify(ingredients.value))

		const res = await useFetch.post('ingredients/create', null, headers)
		const json = await res.json()

		formData.delete('ingredients')
		formData.delete('ingredientsImages')
		ingredients.value = []
		tags.value = []

		uploadIngredients.value.value = ''

		console.log(json)
	} catch (e) {
		console.log(e)
	}
}
</script>

<style scoped lang="scss">
input {
	display: block;
}
</style>