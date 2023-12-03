<template>
	<Dialog
			class="ingredient"
			v-if="ingredient"
			v-model:visible="store.modalViewVisible"
			:dismissableMask="true"
			modal
			@hide="store.ingredientId = ''"
	>
		<template #header>
			<Button
					type="button"
					icon="pi pi-ellipsis-h"
					@click.stop="toggle"
					aria-haspopup="true"
					showIcon="pi pi-ellipsis-h"
					aria-controls="overlay_menu"
			/>
			<Menu
					ref="menu"
					id="overlay_menu"
					:model="items"
					:popup="true"
					class="ingredient__menu-list"
			/>
		</template>
		<div class="ingredient__body">
			<div class="ingredient__name">
				<span class="p-input-icon-right">
					<i class="pi pi-copy" @click="copyText(ingredient.names[0].name) "/>
					<InputText :readonly="!edit" v-model="ingredient.names[0].name" placeholder="Название"/>
				</span>
				<div><small class="ingredient__error">Введите название</small></div>
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
					ref="themeReference"
					v-if="edit"
				/>
			</div>

			<template v-for="(name, index) in ingredient.names">
				<div class="ingredient__name" v-if="index !== 0">
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
				<div class="ingredient__images-preview" v-if="!edit" v-for="image in ingredient.images">
					<img :src="`${VITE_IMAGE_PATH}/ingredients/${image.src}`" :alt="image.alt">
				</div>
				<FileUpload
					v-else
					name="demo[]"
					:multiple="true"
					accept="image/*"
					@select="handleFileUpload($event)"
					@remove="handleFileUpload($event)"
					:showUploadButton="false"
					ref="imagesReset"
				>
				</FileUpload>
			</div>

			<div class="ingredient__button" v-if="edit">
				<Button rounded label="Primary">Сохранить</Button>
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
import Menu from 'primevue/menu'
import {useIngredientsStore} from '@/stores/ingredients'
import {onBeforeMount, ref} from 'vue'
import {copyText} from 'vue3-clipboard'

const store = useIngredientsStore()
const ingredient = ref()
const descriptionIndex = ref(0)
const imagesReset = ref(null)
let formData = new FormData()
const edit = ref(false)

const dbThemes = ref(['Омоложение', 'Похудение', 'Зрение'])
const listThemes = ref([])
const VITE_IMAGE_PATH = import.meta.env.MODE === 'production' ? import.meta.env.VITE_IMAGE_PATH_PROD : import.meta.env.VITE_IMAGE_PATH_DEV

// добавляем картинки
const handleFileUpload = (e) => {
	formData.delete('ingredientsImages')
	for (let key in e.files) formData.append('ingredientsImages', e.files[key])
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
}

// удаляем теги тем
const deletedChip = (tag, index) => {
	listThemes.value.splice(index, 1)
	ingredient.value.themes.splice(index, 1)
}

// получаем ингредиент
const getIngredient = async () => {
	ingredient.value = await store.getIngredient()
	ingredient.value.themes.forEach(el => listThemes.value.push(el.theme))
}

const toggle = (event) => menu.value.toggle(event)
const menu = ref()
const items = ref([
	{
		label: 'Удалить',
		command: () => {
			store.visibleDeleted = true
			store.idDeleted = ingredient.value._id
			store.imagesDeleted = ingredient.value.images
		}
	},
	{
		label: 'Копировать',
		command: () => {
			copyText(`
					Название: ${ingredient.value.names[0].name}
					Тема: ${ingredient.value.themes.length ? ingredient.value.themes[0].theme : 'Пусто'}
					Описание: ${ingredient.value.themes.length ? ingredient.value.themes[0].description : 'Пусто'}
					Сссылка на картинку: ${ingredient.value.images.length ? VITE_IMAGE_PATH + '/ingredients/' + ingredient.value.images[0].src : 'Пусто'}
				`)
		}
	},
	{
		label: 'Редактировать',
		command: function () {
			edit.value = !edit.value
			edit.value ? this.label = 'Просмотр' : this.label = 'Редактировать'
		}
	},
])
onBeforeMount(getIngredient)
</script>

<style lang="scss">
	@import '@/components/Ingredients/styles/ingredient.scss';
</style>