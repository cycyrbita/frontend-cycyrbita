<template>
	<Dialog
		v-model:visible="storeModal.modalCreateVisible"
		:dismissableMask="true"
		modal
		@hide="$emit('close')"
		class="ingredient-create"
	>
		<template #header>
			<SpeedDial
				:model="items"
				type="quarter-circle"
				direction="down-right"
				:radius="50"
				showIcon="pi pi-ellipsis-h"
				class="ingredient-create-menu"
				buttonClass="ingredient-create-menu__button"
				:rotateAnimation="false"
				:mask="true"
				maskClass="ingredient-create-menu__mask"
			/>
		</template>
		<div class="ingredient-create__body">
			<div class="ingredient-create__row ingredient-create__names">
				<div class="ingredient-create__col ingredient-create__col" v-for="(element, index) in listNames">
					<p class="ingredient-create__label-name">{{element.country}}</p>
					<div class="ingredient-create__field">
						<InputText class="ingredient-create-name" v-model.trim="element.name" placeholder="Название"/>
					</div>
					<small class="ingredient-create__error" v-if="listNames[index].name.trim() === '' && errorsFlag">Введите название</small>
				</div>
			</div>

			<div class="ingredient-create__row ingredient-create__themes">
				<div class="ingredient-create__col ingredient-create__col--grow">
					<p class="ingredient-create__label-name">Придумайте свою тему</p>
					<div class="ingredient-create__field">
						<InputText class="ingredient-create-theme" type="text" v-model="thisTheme" @keyup.enter="addTheme" placeholder="Тема"/>
					</div>
				</div>

				<div class="ingredient-create__col ingredient-create__col--grow">
					<p class="ingredient-create__label-name">Готовые темы</p>
					<div class="ingredient-create__field">
						<MultiSelect class="ingredient-create-ready-theme" v-model="listSelectThemes" :options="listDbThemes" placeholder="Темы" emptyMessage="Нет доступных вариантов" :maxSelectedLabels="3" @change="addSelectTheme" filter/>
					</div>
				</div>
			</div>

			<div class="ingredient-create__row" v-if="listThemes.length">
				<div class="ingredient-create__col">
					<div class="ingredient-create__chips">
						<Chip v-for="(theme, index) in listThemes" icon="pi pi-times" @click.stop="activeThemeDescription = index" :class="{'active': activeThemeDescription === index}">
							{{theme.theme}}
							<i class="pi pi-times-circle" @click.stop="removeTheme(index)"></i>
						</Chip>
					</div>
				</div>
			</div>

			<div class="ingredient-create__row" v-if="listThemes.length">
				<div class="ingredient-create__col ingredient-create__col--grow">
					<div v-for="(description, index) in listThemes">
						<p class="ingredient-create__label-name" v-if="activeThemeDescription === index"><b>Введите описание</b></p>
						<div class="ingredient-create__field">
							<Textarea class="ingredient-create-description" v-model="description.description" autoResize rows="5" cols="30" placeholder="Описание" v-if="activeThemeDescription === index"/>
						</div>
					</div>
					<small v-if="listThemes.some(el => el.description.trim() === '' && errorsFlag)" class="ingredient-create__error">Проверьте везде ли есть описание</small>
				</div>
			</div>

			<div class="ingredient-create__row">
				<div class="ingredient-create__col ingredient-create__col--grow">
					<p class="ingredient-create__label-name">Загрузите изображения</p>
					<div class="ingredient-create__field ingredient-create-image">
						<FileUpload name="demo[]" :multiple="true" accept="image/*" @select="handleFileUpload($event)" @remove="handleFileUpload($event)" :showUploadButton="false" chooseLabel="Добвить файл" cancelLabel="Удалить все" ref="imagesReset">
							<template #empty><p>Перетащите сюда файлы для загрузки.</p></template>
						</FileUpload>
					</div>
				</div>
			</div>

			<div class="ingredient-create__row">
				<div class="ingredient-create__col">
					<Button class="ingredient-create-button ingredient-create-button__send" rounded @click="send" label="Primary">Отправить</Button>
				</div>
			</div>
		</div>
	</Dialog>
</template>

<script setup>
import useFetch from '@/composables/useFetch'
import {ref} from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import MultiSelect from 'primevue/multiselect'
import FileUpload from 'primevue/fileupload'
import Chip from 'primevue/chip'
import Dialog from 'primevue/dialog'
import SpeedDial from 'primevue/speeddial'
import {useIngredientsStore} from "@/stores/ingredients";

const storeModal = useIngredientsStore()

const items = ref([
	{
		label: 'Удалить',
		icon: 'pi pi-trash',
		command: () => {
			console.log(1)
		}
	},
	{
		label: 'Копировать',
		icon: 'pi pi-copy',
		command: () => {
			console.log(1)
		}
	},
	{
		label: 'Редактировать',
		icon: 'pi pi-pencil',
		command: () => {
			console.log(1)
		}
	},
])

let formData = new FormData()
// Ингредиент
const ingredients = ref({})

// Заголовки =====================================================

// список названий
const listNames = ref([
	{name: '', country: 'Российский'},
	{name: '', country: 'Английский'},
	{name: '', country: 'Латинский'},
	{name: '', country: 'Испанский'}
])

// Темы =====================================================

// текущая тема в поле ввода
const thisTheme = ref('')
// список тем на добавление в базу
const listThemes = ref([])
// список выбранных тем из базы
const listSelectThemes = ref([])
// список тем которые уже есть в базе
const listDbThemes = ref(['Омоложение', 'Похудение'])

// добавляем тему через селект
const addSelectTheme = (e) => {
	// добавляем элементы
	listSelectThemes.value.forEach(el1 => {
		if(!listThemes.value.some(el2 => el2.theme === el1)) listThemes.value.push({theme: el1, description: ''})
	})
	// удаляем элементы
	listThemes.value.forEach((el, index) => {
		if(listDbThemes.value.filter(el1 => !listSelectThemes.value.includes(el1)).includes(el.theme)) listThemes.value.splice(index, 1)
	})
	// активная тема
	activeThemeDescription.value = listThemes.value.length - 1
}

// добавляем тему через инпут
const addTheme = () => {
	// проверка на пустую строку
	if(thisTheme.value.trim() === '') return
	if(listThemes.value.some(el => el.theme.toLowerCase() === thisTheme.value.toLowerCase())) return
	listThemes.value.push({theme: thisTheme.value, description: ''})
	// добавляем в селект тему если она была в базе
	listThemes.value.forEach(el => {
		if(listDbThemes.value.includes(el.theme) && !listSelectThemes.value.includes(el.theme)) listSelectThemes.value.push(el.theme)
	})
	// активная тема
	activeThemeDescription.value = listThemes.value.length - 1
	thisTheme.value = ''
}

// удаление тем
const removeTheme = (index) => {
	listThemes.value.splice(index, 1)
	// удаляем тему из активного списка из базы
	listSelectThemes.value = listSelectThemes.value.filter(el1 => listThemes.value.find(el2 => el1 === el2.theme))
	// удаляем список тем
	if(index < activeThemeDescription.value && activeThemeDescription.value != 0) return activeThemeDescription.value = activeThemeDescription.value - 1
	if(index === listThemes.value.length) activeThemeDescription.value = listThemes.value.length - 1
}
// показываем конткретное описание
const activeThemeDescription = ref(0)

// Картинки =====================================================

// запихиваем картинки в массив и добавляем в formData
const handleFileUpload = (e) => {
	formData.delete('ingredientsImages')
	for (let key in e.files) formData.append('ingredientsImages', e.files[key])
}

const imagesReset = ref(null)

const resetForm = () => {
	ingredients.value = []

	thisTheme.value = ''
	listThemes.value = []
	listSelectThemes.value = []

	listNames.value = [
		{name: '', country: 'Российский'},
		{name: '', country: 'Английский'},
		{name: '', country: 'Латинский'},
		{name: '', country: 'Испанский'}
	]

	formData.delete('ingredientsImages')
	formData.delete('ingredients')
	imagesReset.value.clear()
}

const errorsFlag = ref(false)
const checkErrorsFlag = () => {
	let flag = false
	listNames.value.forEach(el => {
		if(el.country === '') flag = true
		if(el.name.trim() === '') flag = true
	})
	listThemes.value.forEach(el => {
		if(el.description.trim() === '') flag = true
		if(el.theme.trim() === '') flag = true
	})

	return flag
}

// метод отправки
const send = async () => {
	try {
		if(errorsFlag.value = checkErrorsFlag()) return

		const headers = {
			method: 'POST',
			body: formData,
			credentials: 'include',
		}

		ingredients.value = {
			names: listNames.value,
			themes: listThemes.value
		}

		formData.append('ingredients', JSON.stringify(ingredients.value))

		const res = await useFetch.post('ingredients/create', null, headers)
		const json = await res.json()

		resetForm()
		console.log(json)
	} catch (e) {
		console.log(e)
	}
}
</script>

<style lang="scss">
	@import '@/components/Ingredients/styles/ingredient-create.scss';
</style>