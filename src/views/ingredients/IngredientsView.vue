<template>
	<div class="ingredients">
		<div class="container">
			<div class="ingredients__header">
				<IngredientsFilter></IngredientsFilter>
			</div>
			<div class="ingredients__body">
				<div class="ingredients-list">
					<IngredientCard
						class="ingredients-list__card"
						v-for="ingredient in ingredients"
						:ingredient="ingredient"
						@updateIngredients="console.log(111111111111111111)"
					/>
				</div>
			</div>
			<div class="ingredients__footer">
				<IngredientsPagination></IngredientsPagination>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">

</style>

<script setup>
import {onBeforeMount, ref} from 'vue'

import IngredientsFilter from '@/components/Ingredients/IngredientsFilter.vue'
import IngredientsPagination from '@/components/Ingredients/IngredientsPagination.vue'
import IngredientCard from '@/components/Ingredients/IngredientCard.vue'

import useFetch from '@/composables/useFetch'

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

<style lang="scss" scoped>
	@import '@/views/ingredients/styles/ingredients-view.scss';
</style>