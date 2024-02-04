<template>
  <Dialog
    v-model:visible="store.modalCreateVisible"
    :dismissableMask="true"
    :draggable="false"
    modal
    class="ingredient-create"
  >
    <div class="ingredient-create__body">
      <div class="ingredient-create__name">
        <span class="p-input-icon-right">
          <i
            class="pi pi-copy"
            @click="copyText(ingredient.names[0].name)"
          />
          <InputText
            v-model="ingredient.names[0].name"
            placeholder="Название"
          />
        </span>
        <div v-if="ingredient.names[0].name.trim() === '' && sendFlag"><small class="ingredient-create__error">Введите название</small></div>
      </div>

      <div class="ingredient-create__themes">
        <MultiSelect
          panelClass="ingredient-themes-panel"
          v-model="listThemes"
          :options="dbThemes"
          scrollHeight="350px"
          optionLabel="theme"
          @change="changeSelectTheme"
          ariaLabel="false"
          :showToggleAll="false"
          placeholder="ТЕМАТИКА"
          ref="themeRef"
        />
      </div>

      <template v-for="(name, index) in ingredient.names">
        <div
          class="ingredient-create__name"
          v-if="index !== 0"
        >
          <div
            v-if="index === 1"
            class="ingredient-create__name-label"
          >
            Английский
          </div>
          <div
            v-if="index === 2"
            class="ingredient-create__name-label"
          >
            Латинский
          </div>
          <div
            v-if="index === 3"
            class="ingredient-create__name-label"
          >
            Испанский
          </div>
          <span class="p-input-icon-right">
            <i
              class="pi pi-copy"
              @click="copyText(name.name)"
            />
            <InputText
              v-model="name.name"
              placeholder="Название"
            />
          </span>
        </div>
      </template>

      <div class="ingredient-create__chips">
        <Chip
          v-for="(tag, index) in listThemes"
          @click.stop="descriptionIndex = index"
          :class="{ active: descriptionIndex === index }"
        >
          {{ tag.theme }}
          <i
            @click.stop="deletedChip(tag, index)"
            class="pi pi-times-circle"
          ></i>
        </Chip>
      </div>

      <template v-for="(description, index) in ingredient.themes">
        <div
          class="ingredient-create__description"
          v-if="descriptionIndex === index"
        >
          <i
            class="pi pi-copy"
            @click="copyText(description.description)"
          />
          <Textarea
            v-model="description.description"
            autoResize
            rows="5"
            cols="30"
            placeholder="Описание"
          />
        </div>
      </template>

      <div
        class="ingredient-create__description"
        v-if="!ingredient.themes.length"
      >
        <i
          class="pi pi-copy"
          @click="copyText(first_description)"
        />
        <Textarea
          v-model="first_description"
          autoResize
          rows="5"
          cols="30"
          placeholder="Описание"
        />
      </div>

      <div class="ingredient-create__images">
        <FileUpload
          name="demo[]"
          :multiple="true"
          accept=".jpg, .png, .webp, .jpeg"
          invalidFileTypeMessage="Можно использовать только эти форматы: jpg, png, webp, jpeg"
          @select="handleFileUpload"
          @remove="handleFileUpload"
          :showUploadButton="false"
          ref="imagesReset"
          :maxFileSize="2000000"
          invalidFileSizeMessage="Файл слишком большой"
          :fileLimit="10"
          invalidFileLimitMessage="Максимальное количество картинок 10"
        >
          <template #empty>
            <p>Перетащите файл в эту область.</p>
          </template>
        </FileUpload>
      </div>
      <div class="ingredient-create__button">
        <Button
          @click="send"
          rounded
          label="Сохранить"
        ></Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
  import MultiSelect from 'primevue/multiselect'
  import FileUpload from 'primevue/fileupload'
  import InputText from 'primevue/inputtext'
  import Textarea from 'primevue/textarea'
  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'
  import Chip from 'primevue/chip'
  import { useIngredientsStore } from '@/stores/ingredients'
  import { onBeforeMount, ref } from 'vue'
  import { copyText } from 'vue3-clipboard'
  import useFetch from '@/composables/useFetch'

  const store = useIngredientsStore()
  const ingredient = ref({
    names: [
      { name: '', language: 'Русский' },
      { name: '', language: 'Английский' },
      { name: '', language: 'Латинский' },
      { name: '', language: 'Испанский' },
    ],
    themes: [],
  })

  const first_description = ref()
  const descriptionIndex = ref(0)
  const imagesReset = ref({ files: [] })
  let formData = new FormData()

  const dbThemes = ref([])
  const listThemes = ref([])

  // добавляем картинки
  const handleFileUpload = () => {
    if (imagesReset.value.files.length > 10) imagesReset.value.files = imagesReset.value.files.slice(0, 10)
    formData.delete('ingredientsImages')
    for (let key in imagesReset.value.files) formData.append('ingredientsImages', imagesReset.value.files[key])
  }

  const changeSelectTheme = () => {
    // добавляем элементы
    listThemes.value.forEach(el1 => {
      if (!ingredient.value.themes.some(el2 => el2.theme === el1.theme)) ingredient.value.themes.push({ theme: el1.theme, description: '' })
      if (ingredient.value.themes.length) ingredient.value.themes[0].description = first_description.value
    })

    // удаляем элементы
    ingredient.value.themes.forEach((el, index) => {
      if (dbThemes.value.filter(el1 => !listThemes.value.some(el2 => el1.theme === el2.theme)).some(el3 => el.theme === el3.theme)) {
        if (ingredient.value.themes.length === 1) first_description.value = ingredient.value.themes[0].description
        ingredient.value.themes.splice(index, 1)
      }
    })
    descriptionIndex.value = listThemes.value.length - 1
    themeRef.value.hide()
  }

  // удаляем теги тем
  const deletedChip = (tag, index) => {
    if (ingredient.value.themes.length === 1) first_description.value = ingredient.value.themes[0].description
    listThemes.value.splice(index, 1)
    ingredient.value.themes.splice(index, 1)

    if (descriptionIndex.value < index) return
    if (descriptionIndex.value > index) return (descriptionIndex.value = descriptionIndex.value - 1)
    if (descriptionIndex.value === listThemes.value.length) return (descriptionIndex.value = index - 1)
    if (descriptionIndex.value === index) return (descriptionIndex.value = index)
  }

  const themeRef = ref()

  const emit = defineEmits(['updateIngredients', 'toastIngredientCreate'])

  const load = ref(true)

  const sendFlag = ref(false)
  const send = async () => {
    sendFlag.value = true
    if (ingredient.value.names[0].name.trim() === '') return

    if (!load) return
    load.value = false

    try {
      const headers = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessTokenCycyrbita')}`,
        },
        body: formData,
        credentials: 'include',
      }

      formData.append('ingredient', JSON.stringify(ingredient.value))
      const res = await useFetch.post('ingredients/create-ingredient', null, headers, true)
      emit('updateIngredients')
      emit('toastIngredientCreate')
      store.modalCreateVisible = false
      load.value = true
    } catch (e) {
      console.log(e)
    }
  }

  const getIngredientsThemes = async () => {
    try {
      dbThemes.value = await store.getIngredientsThemes()
    } catch (e) {
      console.log(e)
    }
  }

  onBeforeMount(getIngredientsThemes)
</script>

<style lang="scss">
  @import '@/components/Ingredients/styles/ingredient-create.scss';
</style>
