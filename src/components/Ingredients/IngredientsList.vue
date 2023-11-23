<template>
	<div class="ingredients-list">
		<IngredientCard
				class="ingredients-list__card"
				v-for="ingredient in ingredients"
				:ingredient="ingredient"
		/>
	</div>
</template>

<script setup>
import IngredientCard from '@/components/Ingredients/IngredientCard.vue'
import useFetch from '@/composables/useFetch'
import {onBeforeMount, ref} from 'vue'

const ingredients = ref()

const getIngredients = async () => {
	try {
		const res = await useFetch.post('ingredients/get-ingredients')
		ingredients.value = await res.json()
		console.log(ingredients.value)
	} catch (e) {
		console.log(e)
	}
}

onBeforeMount(getIngredients)
</script>
<style scoped lang="scss">
	.ingredients-list {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;

		&__card {
			width: calc(50% - 15px);
		}
	}
</style>