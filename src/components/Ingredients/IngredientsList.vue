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
	} catch (e) {
		console.log(e)
	}
}

onBeforeMount(getIngredients)
</script>

<style scoped lang="scss">
	@import '@/components/Ingredients/styles/ingredients-list.scss'
</style>