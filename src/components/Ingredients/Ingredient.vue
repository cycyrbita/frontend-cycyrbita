<template>
	<Dialog
		v-model:visible="modalViewVisible.modalViewVisible"
		:dismissableMask="true"
		modal
		class="ingredient-view"
	>
		<div class="ingredient-view__body">
			<div class="ingredient-view__row ingredient-view__names">
				<div class="ingredient-view__col ingredient-view__col--grow">
					<span class="p-input-icon-right">
						<i class="pi pi-copy" @click="copyText(listNames[0].name)" />
						<InputText @keyup.enter="send" class="ingredient-view-name" v-model.trim="listNames[0].name" placeholder="Название"/>
					</span>
					<small class="ingredient-view__error" v-if="listNames[0].name.trim() === '' && errorsFlag">Введите название</small>
				</div>

				<div class="ingredient-view__col ingredient-view__col--theme">
					<div class="ingredient-view__field">
						<MultiSelect
								ariaLabel="false"
								:showToggleAll="false"
								class="ingredient-view-ready-theme"
								panelClass="ingredient-view-ready-theme__select-panel"
								v-model="dbThemes"
								:options="listDbThemes"
								placeholder="ТЕМАТИКА"
								emptyMessage="Нет доступных вариантов"
								:maxSelectedLabels="3"
								ref="themeRef"
						/>
					</div>
				</div>
			</div>

			<div class="ingredient-view__row ingredient-view__themes">
				<div class="ingredient-view__col">
					<p class="ingredient-view__label-name">{{listNames[1].country}}</p>
					<span class="p-input-icon-right">
						<i class="pi pi-copy" @click="copyText(listNames[1].name)"/>
						<InputText @keyup.enter="send" class="ingredient-view-name" v-model.trim="listNames[1].name" placeholder="Название"/>
					</span>
				</div>

				<div class="ingredient-view__col">
					<p class="ingredient-view__label-name">{{listNames[2].country}}</p>
					<span class="p-input-icon-right">
						<i class="pi pi-copy" @click="copyText(listNames[2].name)"/>
						<InputText @keyup.enter="send" class="ingredient-view-name" v-model.trim="listNames[2].name" placeholder="Название"/>
					</span>
				</div>

				<div class="ingredient-view__col">
					<p class="ingredient-view__label-name">{{listNames[3].country}}</p>
					<span class="p-input-icon-right">
						<i class="pi pi-copy" @click="copyText(listNames[3].name)"/>
						<InputText @keyup.enter="send" class="ingredient-view-name" v-model.trim="listNames[3].name" placeholder="Название"/>
					</span>
				</div>
			</div>

			<div class="ingredient-view__row" v-if="dbThemes.length">
				<div class="ingredient-view__col">
					<div class="ingredient-view__chips">
						<Chip v-for="(theme, index) in dbThemes" icon="pi pi-times" @click.stop="activeDescription = index" :class="{'active': activeDescription === index}">
							{{theme}}
							<i class="pi pi-times-circle" @click.stop="dbThemes.splice(index, 1)"></i>
						</Chip>
					</div>
				</div>
			</div>

			<div class="ingredient-view__row" v-if="dbThemes.length">
				<div class="ingredient-view__col ingredient-view__col--grow">
					<div v-for="(description, index) in dbThemes">
						<div class="ingredient-view__field ingredient-view__field--description p-input-icon-right" v-if="activeDescription === index">
							<i class="pi pi-copy" @click="copyText(description.description)"/>
							<Textarea class="ingredient-view-description" v-model="description.description" autoResize rows="5" cols="30" placeholder="Описание"/>
						</div>
					</div>
				</div>
			</div>

			<div class="ingredient-view__row ingredient-view__images">
				<div class="ingredient-view__col ingredient-view__col--grow">
					<div class="ingredient-view__field ingredient-view-image">
						<FileUpload name="demo[]" :multiple="true" accept="image/*" @select="handleFileUpload($event)" @remove="handleFileUpload($event)" :showUploadButton="false" chooseLabel="Добвить файл" cancelLabel="Удалить все" ref="imagesReset"></FileUpload>
					</div>
				</div>
			</div>
			<div class="ingredient-view__row">
				<div class="ingredient-view__col ingredient-view__col--button">
					<Button class="ingredient-view-button ingredient-view-button__send" rounded @click="send" label="Primary">сохранить</Button>
				</div>
			</div>
		</div>
	</Dialog>
</template>

<script setup>
import useFetch from '@/composables/useFetch'
import {onMounted, ref} from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import MultiSelect from 'primevue/multiselect'
import FileUpload from 'primevue/fileupload'
import Chip from 'primevue/chip'
import Dialog from 'primevue/dialog'
import {useIngredientsStore} from '@/stores/ingredients'
import { copyText } from 'vue3-clipboard'

// тут лежит id ингредиента
const modalViewVisible = useIngredientsStore()
const ingredientId = useIngredientsStore()

// Готовый ингредиент
const ingredientsReady = ref()
let formData = new FormData()

// список названий
const listNames = ref([
	{name: '', country: 'Русский'},
	{name: '', country: 'Английский'},
	{name: '', country: 'Латинский'},
	{name: '', country: 'Испанский'}
])

// список выбранных тем из базы
const dbThemes = ref([])
// список тем которые уже есть в базе
const listDbThemes = ref(['Омоложение', 'Похудение'])
// привязываемся к селекту через референс
const themeRef = ref()
// показываем конткретное описание
const activeDescription = ref(0)

// запихиваем картинки в массив и добавляем в formData
const handleFileUpload = (e) => {
	formData.delete('ingredientsImages')
	for (let key in e.files) formData.append('ingredientsImages', e.files[key])
}

// привязываемся к картинкам через референс
const imagesReset = ref(null)

const errorsFlag = ref(false)
const checkErrorsFlag = () => {
	let flag = false

	if(listNames.value[0].country === '') flag = true
	if(listNames.value[0].name.trim() === '') flag = true

	return flag
}

const getIngredient = async () => {
	try {
		const res = await useFetch.post('ingredients/get-ingredient', {id: ingredientId.ingredientId})
		ingredientsReady.value = await res.json()
		console.log(ingredientsReady.value)
	} catch (e) {
		console.log(e)
	}
}

// Сохраняем ингредиент
const send = async () => {
	try {
		if(errorsFlag.value = checkErrorsFlag()) return

		const headers = {
			method: 'POST',
			body: formData,
			credentials: 'include',
		}

		ingredientsReady.value = {
			names: listNames.value,
			themes: dbThemes.value
		}

		formData.append('ingredientsReady', JSON.stringify(ingredientsReady.value))

		const res = await useFetch.post('ingredients/get-ingredient', null, headers)
		const json = await res.json()
	} catch (e) {
		console.log(e)
	}
}

onMounted(getIngredient)
</script>

<style lang="scss">
	@import '@/components/Ingredients/styles/ingredient-view.scss';
</style>