<template>
	<div class="ingredients-filter">
		<div
				v-if="$route.name !== 'ingredients-create'"
				class="ingredients-filter__elem ingredients-filter__search">
			<span class="p-input-icon-right">
		    <i class="pi pi-search" style="font-size: 1.3rem"/>
		    <InputText class="ingredients-filter__field" @input="emit('paginationCount')" v-model="store.filterIngredients.name" placeholder="Поиск" />
			</span>
		</div>
		<div
				v-if="$route.name !== 'ingredients-create'"
				class="ingredients-filter__elem">
			<MultiSelect
					v-model="store.filterIngredients.themes"
					:options="themes"
					optionLabel="theme"
					@change="changeSelectTheme"
					placeholder="Тематики"
					:maxSelectedLabels="3"
					:showToggleAll="false"
					class="ingredients-filter__select"
					panelClass="ingredients-filter__select-panel"
					ref="themeRef"
			/>
		</div>
		<div class="ingredients-filter__elem ingredients-filter__elem-last">
			<div @click="store.modalCreateVisible = true" class="ingredients-filter__add"><i class="pi pi-plus"></i></div>
		</div>
	</div>
</template>

<script setup>
import {useIngredientsStore} from '@/stores/ingredients'

import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import {onBeforeMount, ref} from 'vue'

const store = useIngredientsStore()

const name = ref('')

const emit = defineEmits(['paginationCount'])
const themeRef = ref()

const changeSelectTheme = () => {
	emit('paginationCount')
	themeRef.value.hide()
}

const themes = ref([])
const getIngredientsThemes = async () => {
	try {
		themes.value = await store.getIngredientsThemes()
	} catch (e) {
		console.log(e)
	}
}

onBeforeMount(getIngredientsThemes)
</script>

<style lang="scss">
@import '@/components/Ingredients/styles/ingredients-filter.scss';
</style>