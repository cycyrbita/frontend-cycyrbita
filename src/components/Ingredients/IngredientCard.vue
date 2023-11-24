<template>
	<div class="ingredient-card">
<!--		<div class="ingredient-card__names">-->
<!--			<p><b>Список названий:</b></p>-->
<!--			<div class="ingredient-card__list">-->
<!--				<span v-for="(el, index) in props.ingredient.names">{{el.name}}<span v-if="props.ingredient.names.length > 1 && index + 1 < props.ingredient.names.length">, </span></span>-->
<!--			</div>-->
<!--			<div class="ingredient-card__list">-->
<!--				<span v-for="(el, index) in props.ingredient.names">{{el.country.language}}<span v-if="props.ingredient.names.length > 1 && index + 1 < props.ingredient.names.length">, </span></span>-->
<!--			</div>-->
<!--		</div>-->
<!--		<div class="ingredient-card__themes">-->
<!--			<p><b>Список тем:</b></p>-->
<!--			<div class="ingredient-card__list">-->
<!--				<span v-for="(el, index) in props.ingredient.themes">{{el.theme}}<span v-if="props.ingredient.themes.length > 1 && index + 1 < props.ingredient.themes.length">, </span></span>-->
<!--			</div>-->
<!--			<div class="ingredient-card__list">-->
<!--				<span v-for="(el, index) in props.ingredient.themes">{{el.description}}<span v-if="props.ingredient.themes.length > 1 && index + 1 < props.ingredient.themes.length">, </span></span>-->
<!--			</div>-->
<!--		</div>-->
		<picture class="ingredient-card-picture">
			<Carousel
				:value="props.ingredient.images"
				:numVisible="3"
				:numScroll="1"
				contentClass="asgsdftjrthf"
				indicatorsContentClass="sdsfhsdrtherg3"
			>
				<template #item="slotProps">
					<div class="ingredient-card-picture__box">
						<img
							class="ingredient-card-picture__img"
							:src="`${VITE_IMAGE_PATH}/ingredients/${slotProps.data.src}`"
							:alt="slotProps.data.alt"
						/>
					</div>
				</template>
			</Carousel>
		</picture>
	</div>
</template>

<script setup>
	import Carousel from 'primevue/carousel'
	const VITE_IMAGE_PATH = import.meta.env.MODE === 'production' ? import.meta.env.VITE_IMAGE_PATH_PROD : import.meta.env.VITE_IMAGE_PATH_DEV
	const props = defineProps(['ingredient'])
</script>

<style scoped lang="scss">
	@import '@/components/Ingredients/styles/ingredient-card.scss';
</style>