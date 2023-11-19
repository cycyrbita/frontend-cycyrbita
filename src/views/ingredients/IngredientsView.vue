<template>
	<div class="ingredients">
		<div class="ingredients-header">
			<div class="ingredients-header__list">
				<router-link v-if="$route.name !== 'ingredients'" style="line-height: normal; text-decoration: none" class="p-button p-component p-button-outlined" :to="{name: 'ingredients'}" outlined>Псомотреть ингредиенты</router-link>
				<router-link v-if="$route.name !== 'ingredients-create'" style="line-height: normal; text-decoration: none" class="p-button p-component p-button-outlined" :to="{name: 'ingredients-create'}" outlined>Создать ингредиент</router-link>
			</div>
		</div>
		<div class="ingredients-body">
			<RouterView></RouterView>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.ingredients-header__list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		padding-top: 15px;
		padding-bottom: 15px;
	}
</style>