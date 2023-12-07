<template>
	<Dialog class="ingredients-view-confirmation" v-model:visible="store.visibleDeleted" modal :dismissableMask="true">
		<template #container="{closeCallback}">
			<div class="ingredients-view-confirmation__body">
				<div class="ingredients-view-confirmation__title">Вы хорошо подумали?</div>
				<div class="ingredients-view-confirmation__subtitle">Точно удалить?</div>
				<div class="ingredients-view-confirmation__buttons">
					<Button class="ingredients-view-confirmation__button" label="Я передумал" @click="closeCallback"></Button>
					<Button class="ingredients-view-confirmation__button ingredients-view-confirmation__button--active" label="Удалить" @click="deleted"></Button>
				</div>
			</div>
		</template>
	</Dialog>
	<IngredientCreate v-if="store.modalCreateVisible" @updateIngredients="getIngredients"></IngredientCreate>
	<Ingredient @updateIngredients="getIngredients" v-if="store.ingredientId"></Ingredient>
	<div class="ingredients">
		<div class="container">
			<div class="ingredients__header">
				<IngredientsFilter></IngredientsFilter>
			</div>
			<div class="ingredients__body">
				<div class="ingredients-list">
					<TransitionGroup name="bounce">
						<IngredientCard
							class="ingredients-list__card"
							v-for="ingredient in ingredients"
							:key="ingredient._id"
							:ingredient="ingredient"
							@updateIngredients="getIngredients"
							@click.stop="getIngredient(ingredient._id)"
						/>
					</TransitionGroup>
				</div>
			</div>
			<div class="ingredients__footer">
				<IngredientsPagination></IngredientsPagination>
			</div>
		</div>
	</div>
</template>

<script setup>
import {onBeforeMount, ref} from 'vue'

import IngredientsFilter from '@/components/Ingredients/IngredientsFilter.vue'
import IngredientsPagination from '@/components/Ingredients/IngredientsPagination.vue'
import IngredientCard from '@/components/Ingredients/IngredientCard.vue'
import IngredientCreate from '@/components/Ingredients/IngredientCreate.vue'
import Ingredient from '@/components/Ingredients/Ingredient.vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

import {useIngredientsStore} from '@/stores/ingredients'
const store = useIngredientsStore()

const getIngredient = (id) => {
	store.ingredientId = id
	store.modalViewVisible = true
}

const ingredients = ref()

const getIngredients = async () => {
	try {
		ingredients.value = await store.getIngredients()
	} catch (e) {
		console.log(e)
	}
}

const deleted = async () => {
	await store.deleteIngredient()
	ingredients.value = await store.getIngredients()
}

onBeforeMount(getIngredients)
</script>

<style lang="scss">
	@import '@/views/ingredients/styles/ingredients-view.scss';
</style>