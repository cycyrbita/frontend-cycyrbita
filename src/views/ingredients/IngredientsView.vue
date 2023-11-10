<template>
	<div class="form">
		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
					<div>Введите язык</div>
					<AutoComplete
						v-model="listCountrys"
						multiple
						:suggestions="thisCountry"
						@complete="addCountry"
						optionLabel="country"
					/>
				</div>
			</div>
		</div>

		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
					<div>Введите тему</div>
					<AutoComplete
						v-model="listThemes"
						multiple
						:suggestions="thisTheme"
						@complete="addTheme"
						optionLabel="theme"
					/>
				</div>
			</div>
		</div>

		<div class="form__row">
			<div
				class="form__col"
				v-for="(title, index) in listTitles"
			>
				<div class="form__box">
					<div>Введите название</div>
					<InputText v-model="title.title" />
				</div>
				<div class="form__box">
					<div>Выберите язык</div>
					<Dropdown
						v-model="title.country"
						:options="listCountrys"
						placeholder="Язык"
						optionLabel="country"
					/>
				</div>
				<div class="form__box">
					<Button
						@click="listTitles.splice(index, 1)"
						icon="pi pi-times"
						severity="danger"
						aria-label="Cancel"
						class="form__box-button"
					/>
				</div>
			</div>
			<Button
				@click="addTitle"
				label="Primary"
				outlined
				class="form__row-button"
			>
				Добавить название
			</Button>
		</div>

		<div class="form__row">
			<div
				class="form__col"
				v-for="(description, index) in listDescriptions"
			>
				<div class="form__box">
					<div>Введите описание</div>
					<Textarea
						v-model="description.description"
						autoResize rows="5"
						cols="30"
					/>
				</div>
				<div class="form__box">
					<div>Выберите язык</div>
					<Dropdown
						v-model="description.country"
						:options="listCountrys"
						placeholder="Язык"
						optionLabel="country"
					/>
				</div>
				<div class="form__box">
					<div>Выберите темы</div>
					<MultiSelect
						v-model="description.themes"
						display="chip"
						:options="listThemes"
						placeholder="Select Cities"
						:maxSelectedLabels="3"
						class="w-full md:w-20rem"
						optionLabel="theme"
					/>
				</div>
				<div class="form__box">
					<Button
						@click="listDescriptions.splice(index, 1)"
						icon="pi pi-times"
						severity="danger"
						aria-label="Cancel"
						class="form__box-button"
					/>
				</div>
			</div>
			<Button
				@click="addDescription"
				label="Primary"
				outlined
				class="form__row-button"
			>
				Добавить описание
			</Button>
		</div>

		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
						<div>Введите название тега</div>
						<InputText
							type="text"
							v-model="thisTag"
							@keyup.enter="addTag"
						/>
				</div>
				<div class="form__box">
					<div>Выберите темы</div>
					<MultiSelect
						v-model="listTagsTheme"
						display="chip"
						:options="listThemes"
						placeholder="Select Cities"
						:maxSelectedLabels="3"
						class="w-full md:w-20rem"
						optionLabel="theme"
					/>
				</div>
				<div class="form__box">
					<Button
						@click="addTag"
						icon="pi pi-check"
						aria-label="Filter"
						class="form__box-button"
					/>
				</div>
			</div>
			<div class="form__col">
				<div class="form__tags">
					<Tag
						icon="pi pi-times"
						severity="danger"
						value="Primary"
						v-for="(tag, index) in dbTags"
						@click="removeTag(index)"
					>
						{{tag.tag}}
					</Tag>
				</div>
			</div>
		</div>
		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
					<div>Загрузите изображения</div>
					<FileUpload
						name="demo[]"
						:multiple="true"
						accept="image/*"
						@select="handleFileUpload($event)"
						:showUploadButton="false"
					>
						<template #empty>
							<p>Перетащите сюда файлы для загрузки.</p>
						</template>
					</FileUpload>
				</div>
			</div>
		</div>
		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
					<Button @click="send" label="Primary">Отправить</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import useFetch from '@/composables/useFetch'
import {computed, ref} from 'vue'

import AutoComplete from 'primevue/autocomplete'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import MultiSelect from 'primevue/multiselect'
import Tag from 'primevue/tag'
import FileUpload from 'primevue/fileupload'

let formData = new FormData()
// Ингредиент
const ingredients = ref()

// язык ингредиента
const listCountrys = ref([])
const thisCountry = ref([])
const addCountry = (event) => thisCountry.value = [...Array(1)].map(() => ({country: event.query}))

// Название темы
const listThemes = ref([])
const thisTheme = ref([])
const addTheme = (event) => thisTheme.value = [...Array(1)].map(() => ({theme: event.query}))

// Название ингредиента
const addTitle = () => listTitles.value.push({title: '', country: ''})
const listTitles = ref([{title: '', country: ''}])
const dbTitles = computed(() => listTitles.value.map((item) => ({title: item.title, country: item.country.country})))

// Описание ингредиента
const addDescription = () => listDescriptions.value.push({description: '', country: '', themes: []})
const listDescriptions = ref([{description: '', country: '', themes: []}])
const dbDescriptions = computed(() => listDescriptions.value.map((item) => ({description: item.description, country: item.country.country, themes: item.themes})))

// Теги ингредиента
const listTagsTheme = ref([])
const thisTag = ref('')
const dbTags = ref([])
const addTag = () => {
	if(thisTag.value.trim() !== '') {
		dbTags.value.push({tag: thisTag.value, themes: listTagsTheme.value})
		thisTag.value = ''
		listTagsTheme.value = []
	}
}
const removeTag = (index) => dbTags.value.splice(index, 1)

// запихиваем картинки в массив и добавляем в formData
const handleFileUpload = (e) => {
	for (let key in e.files) formData.append('ingredientsImages', e.files[key])
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
			titles: dbTitles.value,
			countrys: listCountrys.value,
			descriptions: dbDescriptions.value,
			tags: dbTags.value,
			themes: listThemes.value
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
.form {
	&__row {
		& + & {
			margin-top: 30px;
		}
	}

	&__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		margin-top: 15px;

		& > .p-tag {
			cursor: pointer;
		}
	}

	&__col {
		display: flex;
		gap: 15px;

		& + .form__row-button {
			margin-top: 15px;
		}
	}

	&__box {
		display: flex;
		flex-direction: column;

		&-button {
			margin-top: 1.5rem;
		}
	}

	.p-dropdown,
	.p-multiselect {
		line-height: normal;
	}
}
</style>