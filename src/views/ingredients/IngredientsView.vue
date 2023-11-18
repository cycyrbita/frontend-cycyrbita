<template>
	<div class="lds-roller" v-if="!optionsReady"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
	<div class="form">
		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
					<div>Выберите язык</div>
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
							v-if="listCountries.length"
							class="card flex flex-wrap gap-2 mt-3"
					>
						<Chip
								v-for="(country, index) in listCountries"
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
					<Button
							@click="addTheme"
							icon="pi pi-check"
							aria-label="Filter"
							class="form__box-button"
					/>
				</div>
			</div>
			<div class="form__col">
				<div class="form__box">
					<div>Выберите из уже имеющихся тем</div>
					<MultiSelect
							v-model="listSelectThemes"
							:options="listDbThemes"
							placeholder="Темы"
							optionLabel="theme"
							emptyMessage="Нет доступных вариантов"
							:maxSelectedLabels="2"
							@change="addSelectTheme"
							filter
					/>
				</div>
			</div>
			<div
					class="form__col"
					v-if="listThemes.length"
			>
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
							v-model.trim="title.title"
							placeholder="Название"
					/>
				</div>
				<div class="form__box">
					<div>Выберите язык</div>
					<Dropdown
							v-model="title.country"
							:options="listCountries"
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
				<div
					class="form__box"
					v-if="listTitles.length > 1"
				>
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
				size="small"
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
						v-model.trim="description.description"
						autoResize rows="5"
						cols="30"
						placeholder="Описание"
					/>
				</div>
				<div class="form__box">
					<div>Выберите язык</div>
					<Dropdown
							v-model="description.country"
							:options="listCountries"
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
				<div
					class="form__box"
					v-if="listDescriptions.length > 1"
				>
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
				size="small"
			>
				Добавить описание
			</Button>
		</div>

		<div class="form__row">
			<div class="form__col">
				<div class="form__box">
					<div>Выберите тему для тега</div>
					<MultiSelect
						v-model="listTagsTheme"
						display="chip"
						:options="listThemes"
						placeholder="Темы"
						:maxSelectedLabels="3"
						class="w-full md:w-20rem"
						optionLabel="theme"
						filter
						emptyMessage="Нет доступных вариантов"
					/>
				</div>
			</div>
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
					<Button
						@click="addTag"
						icon="pi pi-check"
						aria-label="Filter"
						class="form__box-button"
					/>
				</div>
			</div>
			<div
					class="form__col"
					v-if="dbTags.length"
			>
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
import {computed, onBeforeMount, ref} from 'vue'

import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import MultiSelect from 'primevue/multiselect'
import FileUpload from 'primevue/fileupload'
import Chip from 'primevue/chip'

import { useContry } from '@/composables/useContry'

const errorMessages = ref({
	country: {
		success: null,
		messages: '',
	},
	title: {
		success: null,
		messages: '',
	},
})

const successMessages = () => {
	let flag = true
	if(!dbTitles.value.length) {errorMessages.value.succes = false, errorMessages.value.message = 'Заполните все поля', flag = false}
	if(!listCountries.value.length) {errorMessages.value.succes = false, errorMessages.value.message = 'Выберите хотя бы одну срану', flag = false}
	return flag
}

let formData = new FormData()
// Ингредиент
const ingredients = ref()

// готовность опций
const optionsReady = ref()

// Языки =====================================================

// база языков
const countries = ref(useContry())
// список стран которые пойдут в базу
const listCountries = ref([{code: 'RU', country: 'Россия'}])
// текущий язык
const thisCountry = ref({code: 'RU', country: 'Россия'})
// для того, чтобы при добавлении нового языка они также отображались в списке языков во всех элементах
const addCountriesToAllElements = () => {
	if(listTitles.value.length === 1) listTitles.value[0].country = thisCountry.value
	if(listDescriptions.value.length === 1) listDescriptions.value[0].country = thisCountry.value
	for(const description of listDescriptions.value) {
		if(!description.country) description.country = thisCountry.value
	}
	for(const country of listTitles.value) {
		if(!country.country) country.country = thisCountry.value
	}
}
// добавление страны
const addCountry = () => {
	// добавляем тег
	listCountries.value.push({country: thisCountry.value.country, code: thisCountry.value.code})
	// удаляем страну из списка
	countries.value.splice(0, countries.value.length, ...countries.value.filter(n => n.country !== thisCountry.value.country))
	addCountriesToAllElements()
}
// удаляем тег стран
const removeCountry = (index) => {
	// добавляем в начало
	countries.value.unshift(listCountries.value[index])
	// удаляем тег
	listCountries.value.splice(index, 1)
	// присваиваем последний язык селекту из списка языков на добавление
	thisCountry.value = listCountries.value[listCountries.value.length - 1]

	// удаляем языки из селектов
	listTitles.value.forEach(el1 => {
		if(!listCountries.value.some(el2 => el1.country.country === el2.country)) el1.country = ''
	})

	listDescriptions.value.forEach(el1 => {
		if(!listCountries.value.some(el2 => el1.country.country === el2.country)) el1.country = ''
	})

	addCountriesToAllElements()
}

// Темы =====================================================

// текущая тема в поле ввода
const thisTheme = ref('')
// список тем на добавление в базу
const listThemes = ref([])
// список выбранных тем из базы
const listSelectThemes = ref([])
// список тем которые уже есть в базе
const listDbThemes = ref([])
// для того, чтобы при добавлении новой темы они также отображались в списке тем во всех элементах
const addThemesToAllElements = () => {
	if(listDescriptions.value.length === 1) listDescriptions.value[0].themes = listThemes.value
	for(const description of listDescriptions.value) {
		if(!description.themes.length) description.themes = listThemes.value
	}

	if(!listTagsTheme.value.length) listTagsTheme.value = listThemes.value
}
// добавляем тему через селект
const addSelectTheme = (e) => {
	addThemesToAllElements()
	// если список на добавление в базу пустой то добавляем туда значение из списка выбранных селектов которые пришли из базы
	if(!listThemes.value.length) return listThemes.value.push(listSelectThemes.value[0])
	// если нет совпадений между списком из базы и списком на отправку то пушим элемент в список на отправку
	e.value.filter(el1 => !listThemes.value.find(el2 => el1.theme === el2.theme)).forEach(el => listThemes.value.push(el))
	// получаем массив тем которые не выбраны и проверяем есть ли они в списке на добавление в базу и если нет, то удаляем из списка на добавление
	// это нужно для того что бы при удалении из селекта удалялось и в списке на добавление в базу
	listDbThemes.value.filter(el1 => !listSelectThemes.value.some(el2 => el1.theme === el2.theme)).forEach(el1 => listThemes.value.forEach((el2, index) => {
		if(el1.theme === el2.theme) listThemes.value.splice(index, 1)
	}))
}

// добавляем тему через инпут
const addTheme = () => {
	// пустая строка то не добавляем
	if(thisTheme.value.trim() === '') return
	// если в списке уже есть похожая тема
	if(listThemes.value.find(el => el.theme.toLowerCase() === thisTheme.value.toLowerCase())) return
	addThemesToAllElements()
	// если в списке всех тем из базы есть похожая то мы добавляем в список тем селекта
	listDbThemes.value.find(el => {
		if(el.theme.toLowerCase() === thisTheme.value.toLowerCase()) listSelectThemes.value.push({theme: thisTheme.value})
	})
	// добавляем тему в список тем на отправку в базу
	listThemes.value.push({theme: thisTheme.value})
	// обнуляем поле
	thisTheme.value = ''
}
// удаление тегов
const removeTheme = (index) => {
	// удаляем тег по индексу
	listThemes.value.splice(index, 1)
	// удаляем из списка селектов темы
	listSelectThemes.value = listSelectThemes.value.filter(el1 => listThemes.value.find(el2 => el1.theme === el2.theme))
	// обнуляем поле ввода темы
	thisTheme.value = ''

	// удаляем темы из селектов в тегах и описаниях
	listDescriptions.value.forEach(el => {
		el.themes = el.themes.filter(el1 => listThemes.value.some(el2 => el1.theme === el2.theme))
	})
	listTagsTheme.value = listTagsTheme.value.filter(el1 => listThemes.value.some(el2 => el1.theme === el2.theme))
	addThemesToAllElements()
}

// Заголовки =====================================================

// добавление нового названия
const addTitle = () => listTitles.value.push({title: '', country: thisCountry.value})
// список заголовков
const listTitles = ref([{title: '', country: thisCountry.value}])
// список на отправку в базу заголовков
const dbTitles = computed(() => {
	let array = []
	for(const item of listTitles.value) {
		// проверяем что бы все поля были заполнены
		if((item.title !== '' && item.country.country && item.country.code)) array.push({title: item.title, country: item.country.country})
	}
	return array
})

// Описания =====================================================

// добавление нового описания
const addDescription = () => listDescriptions.value.push({description: '', country: thisCountry.value, themes: listSelectThemes.value})
// список описаний
const listDescriptions = ref([{description: '', country: thisCountry.value, themes: listSelectThemes.value}])
// список на добавление в базу описаний
const dbDescriptions = computed(() => {
	let array = []
	for(const item of listDescriptions.value) {
		// проверяем что бы все поля были заполнены
		if((item.description !== '' && item.country.country && item.themes.length)) array.push({description: item.description, country: item.country.country, themes: item.themes})
	}
	return array
})

// Теги =====================================================

// список тем тегов
const listTagsTheme = ref([])
// текущий тег на добавление
const thisTag = ref('')
// список тегов на добавление в базу
const dbTags = ref([])
// добавление тега
const addTag = () => {
	// проверка на пустоту
	if(thisTag.value.trim() !== '') {
		// проверка на повторение
		if(dbTags.value.find(el => el.tag === thisTag.value)) return
		// добавляем тег в список на отправку в базу
		dbTags.value.push({tag: thisTag.value, themes: listTagsTheme.value})
		// обнуляем поле с тегом
		thisTag.value = ''
		// обнуляем список тем тегов
		listTagsTheme.value = []
	}
}
// удаление тега
const removeTag = (index) => dbTags.value.splice(index, 1)

// Картинки =====================================================

// запихиваем картинки в массив и добавляем в formData
const handleFileUpload = (e) => {
	for (let key in e.files) formData.append('ingredientsImages', e.files[key])
}

const imagesReset = ref(null)

const getOptions = async () => {
	optionsReady.value = false
	try {
		const res = await useFetch.get('ingredients/options')
		const json = await res.json()
		listDbThemes.value = json.themes.map(el => ({theme: el.theme}))
		optionsReady.value = true
	} catch (e) {
		console.log(e)
	}
}

const resetForm = () => {
	ingredients.value = []

	countries.value = useContry()
	listCountries.value = []
	thisCountry.value = ''

	thisTheme.value = ''
	listThemes.value = []
	listSelectThemes.value = []

	listTitles.value = [{title: '', country: '', code: ''}]

	listDescriptions.value = [{description: '', country: '', themes: []}]

	listTagsTheme.value = []
	thisTag.value = ''
	dbTags.value = []

	formData.delete('ingredientsImages')
	formData.delete('ingredients')
	imagesReset.value.clear()
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
			countries: listCountries.value,
			descriptions: dbDescriptions.value,
			tags: dbTags.value,
			themes: listThemes.value
		}

		formData.append('ingredients', JSON.stringify(ingredients.value))

		const res = await useFetch.post('ingredients/create', null, headers)
		const json = await res.json()

		resetForm()
		optionsReady.value = false
		await getOptions()
		setTimeout(() => optionsReady.value = true, 1000)

		console.log(json)
	} catch (e) {
		console.log(e)
	}
}

onBeforeMount(getOptions)
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