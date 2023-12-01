<template>
	<div class="ingredient-view">
		<div class="ingredient-view__body">
			<div class="ingredient-view__name">
				<span class="p-input-icon-right">
					<i class="pi pi-copy" />
					<InputText placeholder="Название"/>
				</span>
				<small class="ingredient-view__error">Введите название</small>
			</div>

			<div class="ingredient-view__themes">
				<MultiSelect
					ariaLabel="false"
					:showToggleAll="false"
					class="ingredient-view-ready-theme"
					panelClass="ingredient-view-ready-theme__select-panel"
					placeholder="ТЕМАТИКА"
					emptyMessage="Нет доступных вариантов"
					:maxSelectedLabels="3"
					ref="themeReference"
				/>
			</div>

			<div class="ingredient-view__name">
				<span class="p-input-icon-right">
					<i class="pi pi-copy" />
					<InputText placeholder="Название"/>
				</span>
			</div>

			<div class="ingredient-view__name">
				<span class="p-input-icon-right">
					<i class="pi pi-copy" />
					<InputText placeholder="Название"/>
				</span>
			</div>

			<div class="ingredient-view__name">
				<span class="p-input-icon-right">
					<i class="pi pi-copy" />
					<InputText placeholder="Название"/>
				</span>
			</div>

			<div class="ingredient-view__tags-theme">
				<Chip><i class="pi pi-times-circle"></i></Chip>
			</div>

			<div class="ingredient-view__description">
				<span class="p-input-icon-right">
					<i class="pi pi-copy" />
					<Textarea autoResize rows="5" cols="30" placeholder="Описание"/>
				</span>
			</div>

			<div class="ingredient-view__images">
				<FileUpload
					name="demo[]"
					:multiple="true"
					accept="image/*"
					@select=""
					@remove=""
					:showUploadButton="false"
					chooseLabel="Добвить файл"
					cancelLabel="Удалить все"
					ref="imagesReset">
				</FileUpload>
			</div>

			<div class="ingredient-view__button">
				<Button rounded label="Primary">Сохранить</Button>
			</div>
		</div>
	</div>
	<pre>{{ingredient}}</pre>
</template>

<script setup>
import MultiSelect from 'primevue/multiselect'
import FileUpload from 'primevue/fileupload'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import {useIngredientsStore} from '@/stores/ingredients'
import {onBeforeMount, ref} from 'vue'

const store = useIngredientsStore()

console.log(store.getIngredient)
const ingredient = ref()

// const getIngredient = async () => {
// 	const res = await store.getIngredient()
// 	ingredient.value = res.json()
// }

// onBeforeMount(getIngredient)
</script>

<style lang="scss">
	@import '@/components/Ingredients/styles/ingredient-view.scss';
</style>