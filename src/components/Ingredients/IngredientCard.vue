<template>
	<div class="ingredient-card">
		<SpeedDial
				:model="items"
				type="quarter-circle"
				direction="down-right"
				:radius="50"
				showIcon="pi pi-ellipsis-h"
				class="ingredient-card-menu"
				buttonClass="ingredient-card-menu__button"
				:rotateAnimation="false"
				:mask="true"
				maskClass="ingredient-card-menu__mask"
		/>
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
import {defineEmits, onBeforeMount, onUpdated, ref} from 'vue'
	import Carousel from 'primevue/carousel'
	import SpeedDial from 'primevue/speeddial'
	import useFetch from '@/composables/useFetch'

	const emit = defineEmits(['updateIngredients'])

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
	]);

	const deleted = async () => {
		try {
			const res = await useFetch.delete('ingredients/deleted-ingredient', {id: props.ingredient._id, images: props.ingredient.images})
			const json = await res.json()
			emit('updateIngredients')
		} catch (e) {
			console.log(e)
		}
	}

	const items = ref([
		{
			label: 'Удалить',
			icon: 'pi pi-trash',
			command: () => deleted()
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