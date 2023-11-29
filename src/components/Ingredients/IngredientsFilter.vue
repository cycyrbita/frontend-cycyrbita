<template>
	<div class="ingredients-filter">
		<div
				v-if="$route.name !== 'ingredients-create'"
				class="ingredients-filter__elem ingredients-filter__search">
			<span class="p-input-icon-right">
		    <i class="pi pi-search" style="font-size: 1.3rem"/>
		    <InputText class="ingredients-filter__field" v-model="value" placeholder="Поиск" />
			</span>
		</div>
		<div
				v-if="$route.name !== 'ingredients-create'"
				class="ingredients-filter__elem">
			<MultiSelect
					v-model="selectedThemes"
					:options="themes"
					optionLabel="name"
					placeholder="Тематики"
					:maxSelectedLabels="3"
					:showToggleAll="false"
					class="ingredients-filter__select"
					panelClass="ingredients-filter__select-panel"
			/>
		</div>
		<div class="ingredients-filter__elem ingredients-filter__elem-last">
			<div @click="storeModal.modalCreateVisible = true" class="ingredients-filter__add"><i class="pi pi-plus"></i></div>
		</div>
	</div>
</template>

<script setup>
import {useIngredientsStore} from '@/stores/ingredients'

import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import {ref} from 'vue'

const storeModal = useIngredientsStore()

const value = ref(null);
const selectedThemes = ref();
const themes = ref([
	{ name: 'New York', code: 'NY' },
	{ name: 'Rome', code: 'RM' },
	{ name: 'London', code: 'LDN' },
	{ name: 'Istanbul', code: 'IST' },
	{ name: 'Paris', code: 'PRS' }
]);
</script>

<style lang="scss">
@import '@/components/Ingredients/styles/ingredients-filter.scss';
</style>