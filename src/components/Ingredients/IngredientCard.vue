<template>
	<div class="ingredient-card">
		<div class="ingredient-card__menu">
				<div class="ingredient-card-menu" ref="menuRef">
					<div class="ingredient-menu__icon" @click.stop="menu = !menu">
						<i class="pi pi-ellipsis-h"></i>
					</div>
					<Transition name="bounce">
						<div v-if="menu" class="ingredient-card-menu__list">
							<div class="ingredient-card-menu__item" @click.stop="menuCopy">Копировать всё</div>
							<div class="ingredient-card-menu__item" @click.stop="menuDelete">Удалить</div>
						</div>
					</Transition>
				</div>
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
							v-if="slotProps.data !== ''"
							class="ingredient-card-picture__img"
							:src="`${VITE_IMAGE_PATH}/ingredients/${slotProps.data}`"
							alt="Картинка"
						/>
					</div>
				</template>
			</Carousel>
		</picture>
		<p @click.stop class="ingredient-card__name">
			{{props.ingredient.names[0].name}}
		</p>
	</div>
</template>

<script setup>
	import {onBeforeMount, onUpdated, ref} from 'vue'
	import Carousel from 'primevue/carousel'
	import { copyText } from 'vue3-clipboard'
	import {useIngredientsStore} from '@/stores/ingredients'
	import {onClickOutside} from "@vueuse/core/index"

	const store = useIngredientsStore()
	const VITE_IMAGE_PATH = import.meta.env.MODE === 'production' ? import.meta.env.VITE_IMAGE_PATH_PROD : import.meta.env.VITE_IMAGE_PATH_DEV
	const VITE_CLIENT_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_CLIENT_URL_DEV
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

	const menuRef = ref()
	onClickOutside(menuRef, () => menu.value = false)
	const menu = ref(false)
	const menuCopy = () => {
		let createText = ``
		if(props.ingredient.names[0].name) createText += props.ingredient.names[0].name
		if(props.ingredient.themes.length) {
			if(props.ingredient.themes[0].theme) createText += `
${props.ingredient.themes[0].theme}`
			if(props.ingredient.themes[0].description) createText += `
${props.ingredient.themes[0].description}`
		}
		if(props.ingredient.images.length) createText += `
${VITE_CLIENT_URL + VITE_IMAGE_PATH + '/ingredients/' + props.ingredient.images[0]}`

		copyText(createText)
		menu.value = false
	}
	const menuDelete = () => {
		store.visibleDeleted = true
		store.idDeleted = props.ingredient._id
		store.imagesDeleted = props.ingredient.images
	}

	const addItemsImages = () => {
		if(props.ingredient.images && props.ingredient.images.length === 0) props.ingredient.images.push('')
		for(const image of props.ingredient.images) {
			if(props.ingredient.images.length < 4) {
				props.ingredient.images.push('')
			}
		}
	}

	onUpdated(addItemsImages)
	onBeforeMount(addItemsImages)
</script>

<style lang="scss">
	@import '@/components/Ingredients/styles/ingredient-card.scss';
</style>