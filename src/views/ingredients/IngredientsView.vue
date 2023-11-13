<template>
	<div class="form">
		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
					<div>Введите язык</div>
					<Dropdown
							v-model="thisCountry"
							:options="countries"
							filter
							optionLabel="country"
							placeholder="Язык"
							class="w-full md:w-14rem"
							@change="addCountry"
					>
						<template #value="slotProps">
							<div
									v-if="slotProps.value"
									class="flex align-items-center">
								<img
									:alt="slotProps.value.label"
									src="@/assets/img/flag_placeholder.png"
									:class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
									style="width: 18px"
								/>
								<div>{{ slotProps.value.country }}</div>
							</div>
							<span v-else>
								{{ slotProps.placeholder }}
							</span>
						</template>
						<template #option="slotProps">
							<div class="flex align-items-center">
								<img
									:alt="slotProps.option.label"
									src="@/assets/img/flag_placeholder.png"
									:class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
									style="width: 18px"
								/>
								<div>{{ slotProps.option.country }}</div>
							</div>
						</template>
					</Dropdown>
					<div
							v-if="listCountrys.length"
							class="card flex flex-wrap gap-2 mt-3"
					>
						<Chip
								v-for="(country, index) in listCountrys"
								icon="pi pi-times"
						>
							{{country.country}}
							<i
									class="pi pi-times-circle"
									style="font-size: 0.9rem; margin-left: 0.3rem; cursor: pointer; padding: 5px 0;"
									@click="removeCountry(index)"
							></i>
						</Chip>
					</div>
				</div>
			</div>
		</div>

		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
					<div>Придумайте свою тему</div>
					<InputText
							type="text"
							v-model="thisTheme"
							@keyup.enter="addTheme"
							placeholder="Тема"
					/>
				</div>
				<div class="form__box">
					<div>Выберите из уже имеющихся тем</div>
					<MultiSelect
							v-model="listDbSelectThemes"
							:options="listDbThemes"
							placeholder="Темы"
							optionLabel="theme"
							emptyMessage="Нет доступных вариантов"
							:maxSelectedLabels="2"
							@change="addSelectTheme"
					/>
				</div>
			</div>
			<div class="form__col">
				<div class="form__tags">
					<Chip
							v-for="(theme, index) in listThemes"
							icon="pi pi-times"
					>
						{{theme.theme}}
						<i
								class="pi pi-times-circle"
								style="font-size: 0.9rem; margin-left: 0.3rem; cursor: pointer; padding: 5px 0;"
								@click="removeTheme(index)"
						></i>
					</Chip>
				</div>
			</div>
		</div>

		<div class="form__row">
			<div
				class="form__col"
				v-for="(title, index) in listTitles"
			>
				<div class="form__box">
					<div>Введите название</div>
					<InputText
							v-model="title.title"
							placeholder="Название"
					/>
				</div>
				<div class="form__box">
					<div>Выберите язык</div>
					<Dropdown
							v-model="title.country"
							:options="listCountrys"
							optionLabel="country"
							placeholder="Язык"
							class="w-full md:w-14rem"
							emptyMessage="Нет доступных вариантов"
					>
						<template #value="slotProps">
							<div
									v-if="slotProps.value"
									class="flex align-items-center">
								<img
										:alt="slotProps.value.label"
										src="@/assets/img/flag_placeholder.png"
										:class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
										style="width: 18px"
								/>
								<div>{{ slotProps.value.country }}</div>
							</div>
							<span v-else>
								{{ slotProps.placeholder }}
							</span>
						</template>
						<template #option="slotProps">
							<div class="flex align-items-center">
								<img
										:alt="slotProps.option.label"
										src="@/assets/img/flag_placeholder.png"
										:class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
										style="width: 18px"
								/>
								<div>{{ slotProps.option.country }}</div>
							</div>
						</template>
					</Dropdown>
				</div>
				<div class="form__box">
					<Button
						@click="listTitles.splice(index, 1)"
						icon="pi pi-times"
						severity="danger"
						aria-label="Cancel"
						class="form__box-button"
					/>
				</div>
			</div>
			<Button
				@click="addTitle"
				label="Primary"
				outlined
				class="form__row-button"
			>
				Добавить название
			</Button>
		</div>

		<div class="form__row">
			<div
				class="form__col"
				v-for="(description, index) in listDescriptions"
			>
				<div class="form__box">
					<div>Введите описание</div>
					<Textarea
						v-model="description.description"
						autoResize rows="5"
						cols="30"
						placeholder="Описание"
					/>
				</div>
				<div class="form__box">
					<div>Выберите язык</div>
					<Dropdown
							v-model="description.country"
							:options="listCountrys"
							optionLabel="country"
							placeholder="Язык"
							class="w-full md:w-14rem"
							emptyMessage="Нет доступных вариантов"
					>
						<template #value="slotProps">
							<div
									v-if="slotProps.value"
									class="flex align-items-center">
								<img
										:alt="slotProps.value.label"
										src="@/assets/img/flag_placeholder.png"
										:class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
										style="width: 18px"
								/>
								<div>{{ slotProps.value.country }}</div>
							</div>
							<span v-else>
								{{ slotProps.placeholder }}
							</span>
						</template>
						<template #option="slotProps">
							<div class="flex align-items-center">
								<img
										:alt="slotProps.option.label"
										src="@/assets/img/flag_placeholder.png"
										:class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
										style="width: 18px"
								/>
								<div>{{ slotProps.option.country }}</div>
							</div>
						</template>
					</Dropdown>
				</div>
				<div class="form__box">
					<div>Выберите темы</div>
					<MultiSelect
						v-model="description.themes"
						display="chip"
						:options="listThemes"
						placeholder="Темы"
						filter
						:maxSelectedLabels="3"
						class="w-full md:w-20rem"
						optionLabel="theme"
						emptyMessage="Нет доступных вариантов"
					/>
				</div>
				<div class="form__box">
					<Button
						@click="listDescriptions.splice(index, 1)"
						icon="pi pi-times"
						severity="danger"
						aria-label="Cancel"
						class="form__box-button"
					/>
				</div>
			</div>
			<Button
				@click="addDescription"
				label="Primary"
				outlined
				class="form__row-button"
			>
				Добавить описание
			</Button>
		</div>

		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
						<div>Введите название тега</div>
						<InputText
							type="text"
							v-model="thisTag"
							@keyup.enter="addTag"
							placeholder="Тег"
						/>
				</div>
				<div class="form__box">
					<div>Выберите темы</div>
					<MultiSelect
						v-model="listTagsTheme"
						display="chip"
						:options="listThemes"
						placeholder="Темы"
						:maxSelectedLabels="3"
						class="w-full md:w-20rem"
						optionLabel="theme"
						emptyMessage="Нет доступных вариантов"
					/>
				</div>
				<div class="form__box">
					<Button
						@click="addTag"
						icon="pi pi-check"
						aria-label="Filter"
						class="form__box-button"
					/>
				</div>
			</div>
			<div class="form__col">
				<div class="form__tags">
					<Chip
							v-for="(tag, index) in dbTags"
							label="Thriller"
							removable
							@remove="removeTag(index)"
					>
						{{tag.tag}}
					</Chip>
				</div>
			</div>
		</div>
		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
					<div>Загрузите изображения</div>
					<FileUpload
						name="demo[]"
						:multiple="true"
						accept="image/*"
						@select="handleFileUpload($event)"
						:showUploadButton="false"
					>
						<template #empty>
							<p>Перетащите сюда файлы для загрузки.</p>
						</template>
					</FileUpload>
				</div>
			</div>
		</div>
		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
					<Button @click="send" label="Primary">Отправить</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import useFetch from '@/composables/useFetch'
import {computed, ref} from 'vue'

import AutoComplete from 'primevue/autocomplete'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import MultiSelect from 'primevue/multiselect'
import FileUpload from 'primevue/fileupload'
import Chip from 'primevue/chip'

import { useContry } from '@/composables/useContry'

let formData = new FormData()
// Ингредиент
const ingredients = ref()

// язык ингредиента
const countries = ref(useContry())
const listCountrys = ref([])
const thisCountry = ref()
const addCountry = () => {
	// добавляем тег
	listCountrys.value.push({country: thisCountry.value.country, code: thisCountry.value.code})
	// удаляем страну из списка
	countries.value.splice(0, countries.value.length, ...countries.value.filter(n => n.country !== thisCountry.value.country))
}
const removeCountry = (index) => {
	countries.value.unshift(listCountrys.value[index])
	listCountrys.value.splice(index, 1)
}

const thisTheme = ref('')
const listThemes = ref([])

const listDbSelectThemes = ref([])
const listDbThemes = ref([])

// фильтрация удаления и добавления тем сложно но работает
const addSelectTheme = (e) => {
	e.value.filter(el1 => !listThemes.value.find(el2 => el1.theme === el2.theme)).forEach(el => listThemes.value.push(el))
	listDbThemes.value.filter(el1 => !listDbSelectThemes.value.some(el2 => el1.theme === el2.theme)).forEach(el1 => listThemes.value.forEach((el2, index) => {
		if(el1.theme === el2.theme) listThemes.value.splice(index, 1)
	}))
}

const addTheme = () => {
	if(listThemes.value.find(el => el.theme === thisTheme.value)) return
	listThemes.value.push({theme: thisTheme.value})
}

const removeTheme = (index) => {
	listThemes.value.splice(index, 1)
	listDbSelectThemes.value = listDbSelectThemes.value.filter(el1 => listThemes.value.find(el2 => el1.theme === el2.theme))
	thisTheme.value = ''
}

// Название ингредиента
const addTitle = () => listTitles.value.push({title: '', country: '', code: ''})
const listTitles = ref([{title: '', country: '', code: ''}])
const dbTitles = computed(() => listTitles.value.map((item) => ({title: item.title, country: item.country.country, code: item.country.code})))

// Описание ингредиента
const addDescription = () => listDescriptions.value.push({description: '', country: '', themes: []})
const listDescriptions = ref([{description: '', country: '', themes: []}])
const dbDescriptions = computed(() => listDescriptions.value.map((item) => ({description: item.description, country: item.country.country, themes: item.themes})))

// Теги ингредиента
const listTagsTheme = ref([])
const thisTag = ref('')
const dbTags = ref([])
const addTag = () => {
	if(thisTag.value.trim() !== '') {
		dbTags.value.push({tag: thisTag.value, themes: listTagsTheme.value})
		thisTag.value = ''
		listTagsTheme.value = []
	}
}
const removeTag = (index) => dbTags.value.splice(index, 1)

// запихиваем картинки в массив и добавляем в formData
const handleFileUpload = (e) => {
	for (let key in e.files) formData.append('ingredientsImages', e.files[key])
}

// метод отправки
const send = async () => {
	try {
		const headers = {
			method: 'POST',
			body: formData,
			credentials: 'include',
		}

		ingredients.value = {
			titles: dbTitles.value,
			countrys: listCountrys.value,
			descriptions: dbDescriptions.value,
			tags: dbTags.value,
			themes: listThemes.value
		}

		formData.append('ingredients', JSON.stringify(ingredients.value))

		const res = await useFetch.post('ingredients/create', null, headers)
		const json = await res.json()

		formData.delete('ingredients')

		console.log(json)
	} catch (e) {
		console.log(e)
	}
}
</script>

<style scoped lang="scss">
.form {
	&__row {
		& + & {
			margin-top: 30px;
		}
	}

	&__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		margin-top: 15px;

		& > .p-tag {
			cursor: pointer;
		}
	}

	&__col {
		display: flex;
		gap: 15px;

		& + .form__row-button {
			margin-top: 15px;
		}
	}

	&__box {
		display: flex;
		flex-direction: column;

		&-button {
			margin-top: 1.5rem;
		}
	}

	.p-dropdown,
	.p-multiselect {
		line-height: normal;
	}
}
</style>