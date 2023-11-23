<template>
	<div class="ingredient-card">
		<div class="ingredient-card__names">
			<p><b>Список названий:</b></p>
			<div class="ingredient-card__list">
				<span v-for="(el, index) in props.ingredient.names">{{el.name}}<span v-if="props.ingredient.names.length > 1 && index + 1 < props.ingredient.names.length">, </span></span>
			</div>
			<div class="ingredient-card__list">
				<span v-for="(el, index) in props.ingredient.names">{{el.country.language}}<span v-if="props.ingredient.names.length > 1 && index + 1 < props.ingredient.names.length">, </span></span>
			</div>
		</div>
		<div class="ingredient-card__themes">
			<p><b>Список тем:</b></p>
			<div class="ingredient-card__list">
				<span v-for="(el, index) in props.ingredient.themes">{{el.theme}}<span v-if="props.ingredient.themes.length > 1 && index + 1 < props.ingredient.themes.length">, </span></span>
			</div>
			<div class="ingredient-card__list">
				<span v-for="(el, index) in props.ingredient.themes">{{el.description}}<span v-if="props.ingredient.themes.length > 1 && index + 1 < props.ingredient.themes.length">, </span></span>
			</div>
		</div>
		<div class="ingredient-card__images">
			<p><b>Список картинок:</b></p>
			<div class="ingredient-card__list">
				<img v-for="image in props.ingredient.images" :src="`${VITE_IMAGE_PATH}/ingredients/${image.src}`" :alt="image.alt">
			</div>
		</div>
	</div>
</template>

<script setup>
	const VITE_IMAGE_PATH = import.meta.env.VITE_IMAGE_PATH
	const props = defineProps(['ingredient'])
	console.log(props.ingredient)
</script>

<style scoped lang="scss">
	.ingredient-card {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 15px;
		border-radius: 15px;
		border: 1px dashed #c3c3c3;

		& > div {
			border: 1px dashed #e1e1e1;
			padding: 10px;
			border-radius: 15px;

			& + div {
				border-top: 1px solid #e1e1e1;
			}
		}

		&__list {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
		}

		b {
			font-weight: 700;
		}

		img {
			max-width: 100%;
		}
	}
</style>