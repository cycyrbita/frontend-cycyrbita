<template>
	<Dialog
			class="ingredient"
			v-if="ingredient"
			v-model:visible="store.modalViewVisible"
			:dismissableMask="true"
			modal
	>
		<template #header>
			<div class="ingredient-menu" ref="menuRef">
				<div class="ingredient-menu__icon" @click="menu = !menu">
					<i class="pi pi-ellipsis-h"></i>
				</div>
				<div v-if="menu" class="ingredient-menu__list">
					<div class="ingredient-menu__item" @click="menuCopy">Копировать всё</div>
					<div class="ingredient-menu__item" @click="edit = !edit">{{edit ? 'Просмотр' : 'Редактировать'}}</div>
					<div class="ingredient-menu__item" @click="menuDelete">Удалить</div>
				</div>
			</div>
		</template>
		<div class="ingredient__body">
			<div class="ingredient__name">
				<span class="p-input-icon-right">
					<i class="pi pi-copy" @click="copyText(ingredient.names[0].name) "/>
					<InputText :readonly="!edit" v-model="ingredient.names[0].name" placeholder="Название"/>
				</span>
				<div v-if="ingredient.names[0].name.trim() === ''"><small class="ingredient__error">Введите название</small></div>
			</div>

			<div class="ingredient__themes">
				<MultiSelect
					panelClass="ingredient-themes-panel"
					v-model="listThemes"
					:options="dbThemes"
					@change="changeSelectTheme"
					ariaLabel="false"
					:showToggleAll="false"
					placeholder="ТЕМАТИКА"
					ref="themeRef"
					v-if="edit"
				/>
			</div>

			<template v-for="(name, index) in ingredient.names">
				<div class="ingredient__name" v-if="index !== 0">
					<div v-if="index === 1" class="ingredient__name-label">Английский</div>
					<div v-if="index === 2" class="ingredient__name-label">Латинский</div>
					<div v-if="index === 3" class="ingredient__name-label">Испанский</div>
					<span class="p-input-icon-right">
						<i class="pi pi-copy" @click="copyText(name.name)" />
						<InputText :readonly="!edit" v-model="name.name" placeholder="Название"/>
					</span>
				</div>
			</template>

			<div class="ingredient__chips">
				<Chip v-for="(tag, index) in listThemes" @click="descriptionIndex = index" :class="{'active': descriptionIndex === index}">
					{{tag}}
					<i v-if="edit" @click="deletedChip(tag, index)" class="pi pi-times-circle"></i>
				</Chip>
			</div>

			<template v-for="(description, index) in ingredient.themes">
				<div class="ingredient__description" v-if="descriptionIndex === index">
					<i class="pi pi-copy" @click="copyText(description.description)"/>
					<Textarea :readonly="!edit" v-model="description.description" autoResize rows="5" cols="30" placeholder="Описание"/>
				</div>
			</template>

			<div class="ingredient__images">
				<div class="ingredient-images-preview" v-if="!edit">
					<div class="ingredient-images-preview__box" v-if="imagesReset" v-for="image in imagesReset.files">
						<img :src="image.objectURL">
					</div>
				</div>
				<FileUpload
					v-show="edit"
					name="demo[]"
					:multiple="true"
					accept="image/*"
					@select="handleFileUpload"
					@remove="handleFileUpload"
					:showUploadButton="false"
					ref="imagesReset"
				>
				</FileUpload>
			</div>
			<div class="ingredient__button" v-if="edit">
				<Button @click="send" rounded label="Сохранить"></Button>
			</div>
		</div>
	</Dialog>
</template>

<script setup>
import MultiSelect from 'primevue/multiselect'
import FileUpload from 'primevue/fileupload'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import {useIngredientsStore} from '@/stores/ingredients'
import {onBeforeMount, ref, watchEffect} from 'vue'
import {copyText} from 'vue3-clipboard'
import useFetch from "@/composables/useFetch"
import { onClickOutside } from '@vueuse/core'

const store = useIngredientsStore()
const ingredient = ref()
const descriptionIndex = ref(0)
const imagesReset = ref({files: []})
let formData = new FormData()
const edit = ref(false)

const dbThemes = ref(['Омоложение', 'Похудение', 'Зрение'])
const listThemes = ref([])
const VITE_IMAGE_PATH = import.meta.env.MODE === 'production' ? import.meta.env.VITE_IMAGE_PATH_PROD : import.meta.env.VITE_IMAGE_PATH_DEV

// добавляем картинки
const handleFileUpload = () => {
	formData.delete('ingredientsImages')
	for (let key in imagesReset.value.files) formData.append('ingredientsImages', imagesReset.value.files[key])
}

const changeSelectTheme = () => {
	// добавляем элементы
	listThemes.value.forEach(el1 => {
		if(!ingredient.value.themes.some(el2 => el2.theme === el1)) ingredient.value.themes.push({theme: el1, description: ''})
	})

	// удаляем элементы
	ingredient.value.themes.forEach((el, index) => {
		if(dbThemes.value.filter(el1 => !listThemes.value.includes(el1)).includes(el.theme)) ingredient.value.themes.splice(index, 1)
	})

	themeRef.value.hide()
}

// удаляем теги тем
const deletedChip = (tag, index) => {
	listThemes.value.splice(index, 1)
	ingredient.value.themes.splice(index, 1)
}

const customUpload = async () => {
	for(const image of ingredient.value.images) {
		const blob = await fetch(`${VITE_IMAGE_PATH}/ingredients/${image.src}`).then((r) => r.blob())
		const file = new File([blob], image.src, {type: blob.type})
		file.objectURL = URL.createObjectURL(blob)
		imagesReset.value.files.push(file)
	}
}

// получаем ингредиент
const getIngredient = async () => {
	ingredient.value = await store.getIngredient()
	ingredient.value.themes.forEach(el => listThemes.value.push(el.theme))
	await customUpload()
}

const themeRef = ref()

const menuRef = ref()
onClickOutside(menuRef, () => menu.value = false)
const menu = ref(false)
const menuCopy = () => {
	copyText(`
					Название: ${ingredient.value.names[0].name}
					Тема: ${ingredient.value.themes.length ? ingredient.value.themes[0].theme : 'Пусто'}
					Описание: ${ingredient.value.themes.length ? ingredient.value.themes[0].description : 'Пусто'}
					Сссылка на картинку: ${ingredient.value.images.length ? VITE_IMAGE_PATH + '/ingredients/' + ingredient.value.images[0].src : 'Пусто'}
				`)
}
const menuDelete = () => {
	store.visibleDeleted = true
	store.idDeleted = ingredient.value._id
	store.imagesDeleted = ingredient.value.images
}

const emit = defineEmits(['updateIngredients'])
const send = async () => {
	try {
		const headers = {
			method: 'POST',
			body: formData,
			credentials: 'include',
		}
		handleFileUpload()
		formData.append('ingredient', JSON.stringify(ingredient.value))
		const res = await useFetch.post('ingredients/edit-ingredient', null, headers)

		emit('updateIngredients')
		store.modalViewVisible = false

		console.log(res.json())
	} catch (e) {
		console.log(e)
	}
}

watchEffect(async () => {
	store.ingredientId
	await getIngredient()
})

onBeforeMount(getIngredient)
</script>

<style lang="scss">
	@import '@/components/Ingredients/styles/ingredient.scss';
</style>