<template>
	<div class="ingredients">
		<div class="container">
			<div class="ingredients__header">
				<IngredientsFilter></IngredientsFilter>
			</div>
			<div class="ingredients__body">
				<RouterView></RouterView>
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
import IngredientsFilter from '@/components/Ingredients/IngredientsFilter.vue'
import IngredientsPagination from '@/components/Ingredients/IngredientsPagination.vue'
</script>

<style lang="scss" scoped>
	@import '@/views/ingredients/styles/ingredients-view.scss';
</style>