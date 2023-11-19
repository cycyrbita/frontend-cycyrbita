<template>
	<div class="ingredient-card">
		<div class="ingredient-card__countrys">
			<p><b>Список языков:</b></p>
			<div class="ingredient-card__list">
				<span v-for="(country, index) in props.ingredient.countries">{{country.country}}<span v-if="props.ingredient.countries.length > 1 && index + 1 < props.ingredient.countries.length">, </span></span>
			</div>
		</div>
		<div class="ingredient-card__themes">
			<p><b>Список тем:</b></p>
			<div class="ingredient-card__list">
				<span v-for="(theme, index) in props.ingredient.themes">{{theme.theme}}<span v-if="props.ingredient.themes.length > 1 && index + 1 < props.ingredient.themes.length">, </span></span>
			</div>
		</div>
		<div class="ingredient-card__titles">
			<p><b>Список названий:</b></p>
			<div class="ingredient-card__list">
				<span v-for="(title, index) in props.ingredient.titles">{{title.title}}<span v-if="props.ingredient.titles.length > 1 && index + 1 < props.ingredient.titles.length">, </span></span>
			</div>
		</div>
		<div class="ingredient-card__descriptions">
			<p><b>Список описаний:</b></p>
			<div class="ingredient-card__list">
				<span v-for="(description, index) in props.ingredient.descriptions">{{description.description}}<span v-if="props.ingredient.descriptions.length > 1 && index + 1 < props.ingredient.descriptions.length">, </span></span>
			</div>
		</div>
		<div class="ingredient-card__tags">
			<p><b>Список тегов:</b></p>
			<div class="ingredient-card__list">
				<span v-for="(tag, index) in props.ingredient.tags">{{tag.tag}}<span v-if="props.ingredient.tags.length > 1 && index + 1 < props.ingredient.tags.length">, </span></span>
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
	}
</style>