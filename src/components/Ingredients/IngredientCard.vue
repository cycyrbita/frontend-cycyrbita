<template>
	<div class="ingredient-card">
		<div class="ingredient-card__menu" v-if="!store.ingredientId">
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
					class="ingredient-card__menu-list"
			/>
		</div>
		<picture class="ingredient-card-picture ingredient-card__picture">
			<Carousel
				:value="props.ingredient.images"
				:numVisible="3"
				:numScroll="1"
				:circular="true"
				:d_circular="true"
				:showNavigators="false"
				:showIndicators="false"
				:responsiveOptions="responsiveOptions"
			>
				<template #item="slotProps">
					<div class="ingredient-card-picture__box">
						<img
							v-if="slotProps.data.src !== ''"
							class="ingredient-card-picture__img"
							:src="`${VITE_IMAGE_PATH}/ingredients/${slotProps.data.src}`"
							:alt="slotProps.data.alt"
						/>
					</div>
				</template>
			</Carousel>
		</picture>
		<p class="ingredient-card__name">
			{{props.ingredient.names[0].name}}
		</p>
	</div>
</template>

<script setup>
	import {onBeforeMount, onUpdated, ref} from 'vue'
	import Carousel from 'primevue/carousel'
	import Menu from 'primevue/menu';
	import Button from 'primevue/button';
	import { copyText } from 'vue3-clipboard'
	import {useIngredientsStore} from '@/stores/ingredients'

	const store = useIngredientsStore()
	const VITE_IMAGE_PATH = import.meta.env.MODE === 'production' ? import.meta.env.VITE_IMAGE_PATH_PROD : import.meta.env.VITE_IMAGE_PATH_DEV
	const props = defineProps(['ingredient'])

	const responsiveOptions = ref([
		{
			breakpoint: '575px',
			numVisible: 4,
			numScroll: 1
		},
		{
			breakpoint: '420px',
			numVisible: 3,
			numScroll: 1
		},
	])

	const toggle = (event) => menu.value.toggle(event)
	const menu = ref()
	const items = ref([
		{
			label: 'Удалить',
			command: () => {
				store.visibleDeleted = true
				store.idDeleted = props.ingredient._id
				store.imagesDeleted = props.ingredient.images
			}
		},
		{
			label: 'Копировать',
			command: () => {
				copyText(`
					Название: ${props.ingredient.names[0].name}
					Тема: ${props.ingredient.themes.length ? props.ingredient.themes[0].theme : 'Пусто'}
					Описание: ${props.ingredient.themes.length ? props.ingredient.themes[0].description : 'Пусто'}
					Сссылка на картинку: ${props.ingredient.images.length ? VITE_IMAGE_PATH + '/ingredients/' + props.ingredient.images[0].src : 'Пусто'}
				`)
			}
		},
	])

	const addItemsImages = () => {
		if(props.ingredient.images.length === 0) props.ingredient.images.push({src: '', alt: ''})
		for(const image of props.ingredient.images) {
			if(props.ingredient.images.length < 4) {
				props.ingredient.images.push({src: '', alt: ''})
			}
		}
	}

	onUpdated(addItemsImages)
	onBeforeMount(addItemsImages)
</script>

<style lang="scss">
	@import '@/components/Ingredients/styles/ingredient-card.scss';
</style>