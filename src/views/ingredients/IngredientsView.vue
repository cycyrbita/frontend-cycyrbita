<template>
	<div>
		<label v-for="(country, index) in countrys">
			<input v-model="country.country" type="text" placeholder="Язык">
			<button @click="countrys.splice(index, 1)">x</button>
		</label>
		<button @click="addCountry">Добавить язык</button>
		<hr>

		<label v-for="(title, index) in titles">
			<input v-model="title.title" type="text" placeholder="Название ингредиента">
			<select v-model="title.country">
				<option selected value="">Выберите язык</option>
				<option v-for="country in countrys" :value="country.country">{{country.country}}</option>
			</select>
			<button @click="titles.splice(index, 1)">x</button>
		</label>
		<button @click="addTitle">Добавить название</button>
		<hr>

		<label v-for="(theme, index) in themes">
			<input v-model="theme.theme" type="text" placeholder="Название темы">
			<button @click="themes.splice(index, 1)">x</button>
		</label>
		<button @click="addTheme">Добавить тему</button>
		<hr>

		<label v-for="(description, index) in descriptions">
			<textarea v-model="description.description" type="text" placeholder="Описание"></textarea>
			<select v-model="description.country">
				<option selected value="">Выберите язык</option>
				<option v-for="country in countrys" :value="country.country">{{country.country}}</option>
			</select>
			<select v-model="description.themes" multiple="multiple">
				<option selected value="">Выберите тему</option>
				<option v-for="theme in themes" :value="theme.theme">{{theme.theme}}</option>
			</select>
			<button @click="descriptions.splice(index, 1)">x</button>
		</label>
		<button @click="addDescription">Добавить описание</button>
		<hr>

		<label v-for="(tag, index) in tags">
			<input v-model="tag.tag" type="text" placeholder="Название тега">
			<select v-model="tag.themes" multiple="multiple">
				<option selected value="">Выберите тему</option>
				<option v-for="theme in themes" :value="theme.theme">{{theme.theme}}</option>
			</select>
			<button @click="tags.splice(index, 1)">x</button>
		</label>
		<button @click="addTag">Добавить тег</button>
		<hr>

	</div>
	<label>
		<input type="file" multiple @change="handleFileUpload" ref="uploadImages">
	</label>
	<button @click="send" type="submit">Отправить</button>
</template>

<script setup>
import useFetch from '@/composables/useFetch'
import {ref} from 'vue'
let formData = new FormData()

const addTitle = () => titles.value.push({title: '', country: ''})
const addDescription = () => descriptions.value.push({description: '', country: '', themes: []})
const addTag = () => tags.value.push({tag: '', themes: []})
const addTheme = () => themes.value.push({theme: ''})
const addCountry = () => countrys.value.push({country: ''})

const titles = ref([])
const countrys = ref([])
const descriptions = ref([])
const tags = ref([])
const themes = ref([])

const ingredients = ref()

const uploadImages = ref(null)

// запихиваем картинки в массив и добавляем в formData
const handleFileUpload = () => {
	for (let key in uploadImages.value.files) formData.append('ingredientsImages', uploadImages.value.files[key])
}

// метод отправки
const send = async () => {
	try {
		const headers = {
			method: 'POST',
			body: formData,
			credentials: 'include',
		}

		ingredients.value = {
			titles: titles.value,
			countrys: countrys.value,
			descriptions: descriptions.value,
			tags: tags.value,
			themes: themes.value
		}

		formData.append('ingredients', JSON.stringify(ingredients.value))

		const res = await useFetch.post('ingredients/create', null, headers)
		const json = await res.json()

		formData.delete('ingredients')

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

label {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;

	p {
		width: 100%;
	}
}

hr {
	margin-top: 10px;
	margin-bottom: 10px;
}
</style>