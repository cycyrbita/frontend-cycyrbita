<template>
	<div class="form">
		<div class="form__row">
			<div
				class="form__col"
				v-for="(element, index) in listNames"
			>
				<div class="form__box">
					<div><b>Введите название</b></div>
					<InputText
						v-model.trim="element.name"
						placeholder="Название"
					/>
					<small class="error" v-if="listNames[index].name.trim() === '' && errorsFlag">Введите название</small>
				</div>
				<div class="form__box">
					<div><b>Выбрать язык</b></div>
					<Dropdown
						v-model="element.country"
						:options="countries"
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
								<div>{{ slotProps.value.language }}</div>
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
								<div>{{ slotProps.option.language }}</div>
							</div>
						</template>
					</Dropdown>
					<small class="error" v-if="listNames[0].country === '' && errorsFlag">Нужно выбрать язык</small>
				</div>
				<div
					class="form__box"
					v-if="listNames.length > 1"
				>
					<Button
						@click="listNames.splice(index, 1)"
						icon="pi pi-times"
						severity="danger"
						aria-label="Cancel"
						class="form__box-button"
					/>
				</div>
			</div>
			<Button
				@click="addName"
				label="Primary"
				outlined
				class="form__row-button"
				size="small"
			>
				Добавить название
			</Button>
		</div>

		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
					<div><b>Придумайте свою тему</b></div>
					<InputText
						type="text"
						v-model="thisTheme"
						@keyup.enter="addTheme"
						placeholder="Тема"
					/>
				</div>
				<div class="form__box">
					<Button
						@click="addTheme"
						icon="pi pi-check"
						aria-label="Filter"
						class="form__box-button"
					/>
				</div>
				<div class="form__box">
					<div><b>Или выбрать из уже имеющихся тем</b></div>
					<MultiSelect
						v-model="listSelectThemes"
						:options="listDbThemes"
						placeholder="Темы"
						emptyMessage="Нет доступных вариантов"
						:maxSelectedLabels="3"
						@change="addSelectTheme"
						filter
					/>
				</div>
			</div>
			<div class="form__col">
				<div class="form__box">
					<div v-for="(description, index) in listThemes">
						<div v-if="activeThemeDescription === index"><b>Введите описание</b></div>
						<Textarea
							v-model="description.description"
							autoResize rows="5"
							cols="30"
							placeholder="Описание"
							v-if="activeThemeDescription === index"
						/>
					</div>
				</div>
			</div>
			<small class="error" v-if="listThemes.some(el => el.description.trim() === '' && errorsFlag)">Проверьте везде ли есть описание</small>
			<div
				class="form__col"
				v-if="listThemes.length"
			>
				<div class="form__tags">
					<Chip
						v-for="(theme, index) in listThemes"
						icon="pi pi-times"
						@click.stop="activeThemeDescription = index"
						:class="{'active': activeThemeDescription === index}"
					>
						{{theme.theme}}
						<i
							class="pi pi-times-circle"
							style="font-size: 0.9rem; margin-left: 0.3rem; cursor: pointer; padding: 5px 0;"
							@click.stop="removeTheme(index)"
						></i>
					</Chip>
				</div>
			</div>
		</div>

		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
					<div><b>Загрузите изображения</b></div>
					<FileUpload
							name="demo[]"
							:multiple="true"
							accept="image/*"
							@select="handleFileUpload($event)"
							@remove="handleFileUpload($event)"
							:showUploadButton="false"
							chooseLabel="Добвить файл"
							cancelLabel="Удалить все"
							ref="imagesReset"
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
import {ref} from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import MultiSelect from 'primevue/multiselect'
import FileUpload from 'primevue/fileupload'
import Chip from 'primevue/chip'

import {useContry} from '@/composables/useContry'

let formData = new FormData()
// Ингредиент
const ingredients = ref({})
// база языков
const countries = ref(useContry())

// Заголовки =====================================================

// добавление нового названия
const addName = () => listNames.value.push({name: '', country: ''})
// список заголовков
const listNames = ref([{name: '', country: ''}])

// Темы =====================================================

// текущая тема в поле ввода
const thisTheme = ref('')
// список тем на добавление в базу
const listThemes = ref([])
// список выбранных тем из базы
const listSelectThemes = ref([])
// список тем которые уже есть в базе
const listDbThemes = ref(['Омоложение', 'Похудение'])

// добавляем тему через селект
const addSelectTheme = (e) => {
	// добавляем элементы
	listSelectThemes.value.forEach(el1 => {
		if(!listThemes.value.some(el2 => el2.theme === el1)) listThemes.value.push({theme: el1, description: ''})
	})
	// удаляем элементы
	listThemes.value.forEach((el, index) => {
		if(listDbThemes.value.filter(el1 => !listSelectThemes.value.includes(el1)).includes(el.theme)) listThemes.value.splice(index, 1)
	})
	// активная тема
	activeThemeDescription.value = listThemes.value.length - 1
}

// добавляем тему через инпут
const addTheme = () => {
	// проверка на пустую строку
	if(thisTheme.value.trim() === '') return
	if(listThemes.value.some(el => el.theme.toLowerCase() === thisTheme.value.toLowerCase())) return
	listThemes.value.push({theme: thisTheme.value, description: ''})
	// добавляем в селект тему если она была в базе
	listThemes.value.forEach(el => {
		if(listDbThemes.value.includes(el.theme) && !listSelectThemes.value.includes(el.theme)) listSelectThemes.value.push(el.theme)
	})
	// активная тема
	activeThemeDescription.value = listThemes.value.length - 1
	thisTheme.value = ''
}

// удаление тем
const removeTheme = (index) => {
	listThemes.value.splice(index, 1)
	// удаляем тему из активного списка из базы
	listSelectThemes.value = listSelectThemes.value.filter(el1 => listThemes.value.find(el2 => el1 === el2.theme))
	// удаляем список тем
	if(index < activeThemeDescription.value && activeThemeDescription.value != 0) return activeThemeDescription.value = activeThemeDescription.value - 1
	if(index === listThemes.value.length) activeThemeDescription.value = listThemes.value.length - 1
}
// показываем конткретное описание
const activeThemeDescription = ref(0)

// Картинки =====================================================

// запихиваем картинки в массив и добавляем в formData
const handleFileUpload = (e) => {
	console.log(1111111)
	formData.delete('ingredientsImages')
	for (let key in e.files) formData.append('ingredientsImages', e.files[key])
}

const imagesReset = ref(null)

const resetForm = () => {
	ingredients.value = []

	countries.value = useContry()

	thisTheme.value = ''
	listThemes.value = []
	listSelectThemes.value = []

	listNames.value = [{name: '', country: ''}]

	formData.delete('ingredientsImages')
	formData.delete('ingredients')
	imagesReset.value.clear()
}

const errorsFlag = ref(false)
const checkErrorsFlag = () => {
	let flag = false
	listNames.value.forEach(el => {
		if(el.country === '') flag = true
		if(el.name.trim() === '') flag = true
	})
	listThemes.value.forEach(el => {
		if(el.description.trim() === '') flag = true
		if(el.theme.trim() === '') flag = true
	})

	return flag
}

// метод отправки
const send = async () => {
	try {
		if(errorsFlag.value = checkErrorsFlag()) return

		const headers = {
			method: 'POST',
			body: formData,
			credentials: 'include',
		}

		ingredients.value = {
			names: listNames.value,
			themes: listThemes.value
		}

		formData.append('ingredients', JSON.stringify(ingredients.value))

		const res = await useFetch.post('ingredients/create', null, headers)
		const json = await res.json()

		resetForm()
		console.log(json)
	} catch (e) {
		console.log(e)
	}
}
</script>

<style scoped lang="scss">
.form {
	display: flex;
	flex-direction: column;
	gap: 15px;

	b {
		font-weight: 700;
	}

	&__row {
		padding: 15px;
		border: 1px dashed #e1e1e1;
		border-radius: 15px;
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

		& + & {
			margin-top: 10px;
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

	.p-chip {
		cursor: pointer;

		&.active {
			border: 1px solid #000;
		}
	}
	small.error {
		color: red;
	}
}


.lds-roller {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	background: fixed #dea478 top center no-repeat;
}
.lds-roller div {
	animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	transform-origin: 40px 40px;
}
.lds-roller div:after {
	content: " ";
	display: block;
	position: absolute;
	width: 7px;
	height: 7px;
	border-radius: 50%;
	background: #fff;
	margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
	animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
	top: 63px;
	left: 63px;
}
.lds-roller div:nth-child(2) {
	animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
	top: 68px;
	left: 56px;
}
.lds-roller div:nth-child(3) {
	animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
	top: 71px;
	left: 48px;
}
.lds-roller div:nth-child(4) {
	animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
	top: 72px;
	left: 40px;
}
.lds-roller div:nth-child(5) {
	animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
	top: 71px;
	left: 32px;
}
.lds-roller div:nth-child(6) {
	animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
	top: 68px;
	left: 24px;
}
.lds-roller div:nth-child(7) {
	animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
	top: 63px;
	left: 17px;
}
.lds-roller div:nth-child(8) {
	animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
	top: 56px;
	left: 12px;
}
@keyframes lds-roller {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

</style>