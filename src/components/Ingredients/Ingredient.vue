<template>
  <Dialog
    class="ingredient"
    v-if="ingredient"
    v-model:visible="store.modalViewVisible"
    :dismissableMask="true"
    :draggable="false"
    modal
    @hide="store.ingredientId = ''"
  >
    <template #header>
      <div
        class="ingredient-menu"
        ref="menuRef"
      >
        <div
          class="ingredient-menu__icon"
          @click="menu = !menu"
        >
          <i class="pi pi-ellipsis-h"></i>
        </div>
        <Transition name="bounce">
          <div
            v-if="menu"
            class="ingredient-menu__list"
          >
            <div
              class="ingredient-menu__item"
              @click="menuCopy"
            >
              Копировать всё
            </div>
            <div
              class="ingredient-menu__item"
              @click="menuEdit"
            >
              {{ edit ? 'Просмотр' : 'Редактировать' }}
            </div>
            <div
              class="ingredient-menu__item"
              @click="menuDelete"
            >
              Удалить
            </div>
          </div>
        </Transition>
      </div>
    </template>
    <div class="ingredient__body">
      <div class="ingredient__name">
        <span class="p-input-icon-right">
          <i
            class="pi pi-copy"
            @click="copyText(ingredient.names[0].name)"
          />
          <InputText
            :readonly="!edit"
            v-model="ingredient.names[0].name"
            placeholder="Название"
          />
        </span>
        <div v-if="ingredient.names[0].name.trim() === ''"><small class="ingredient__error">Введите название</small></div>
      </div>

      <div class="ingredient__themes">
        <Transition name="bounce">
          <MultiSelect
            panelClass="ingredient-themes-panel"
            v-model="listThemes"
            :options="dbThemes"
            optionLabel="theme"
            scrollHeight="350px"
            @change="changeSelectTheme"
            ariaLabel="false"
            :showToggleAll="false"
            placeholder="ТЕМАТИКА"
            ref="themeRef"
            v-if="edit"
          />
        </Transition>
      </div>

      <template v-for="(name, index) in ingredient.names">
        <div
          class="ingredient__name"
          v-if="index !== 0"
        >
          <div
            v-if="index === 1"
            class="ingredient__name-label"
          >
            Английский
          </div>
          <div
            v-if="index === 2"
            class="ingredient__name-label"
          >
            Латинский
          </div>
          <div
            v-if="index === 3"
            class="ingredient__name-label"
          >
            Испанский
          </div>
          <span class="p-input-icon-right">
            <i
              class="pi pi-copy"
              @click="copyText(name.name)"
            />
            <InputText
              :readonly="!edit"
              v-model="name.name"
              placeholder="Название"
            />
          </span>
        </div>
      </template>

      <div class="ingredient__chips">
        <Chip
          v-for="(tag, index) in listThemes"
          @click.stop="descriptionIndex = index"
          :class="{ active: descriptionIndex === index }"
        >
          {{ tag.theme }}
          <Transition name="bounce">
            <i
              v-if="edit"
              @click.stop="deletedChip(tag, index)"
              class="pi pi-times-circle"
            ></i>
          </Transition>
        </Chip>
      </div>

      <template v-for="(description, index) in ingredient.themes">
        <div
          class="ingredient__description"
          v-if="descriptionIndex === index"
        >
          <i
            class="pi pi-copy"
            @click="copyText(description.description)"
          />
          <Textarea
            :readonly="!edit"
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

      <div class="ingredient__images">
        <div
          class="ingredient-images-preview"
          v-if="!edit"
        >
          <div
            class="ingredient-images-preview__box"
            v-if="imagesReset"
            v-for="image in imagesReset.files"
          >
            <img :src="image.objectURL" />
          </div>
        </div>
        <Transition name="bounce">
          <FileUpload
            v-show="edit"
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
        </Transition>
      </div>
      <Transition name="bounce">
        <div
          class="ingredient__button"
          v-if="edit"
        >
          <Button
            @click="send"
            rounded
            label="Сохранить"
          ></Button>
        </div>
      </Transition>
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
  import { onClickOutside } from '@vueuse/core'

  const store = useIngredientsStore()
  const ingredient = ref()
  const first_description = ref()
  const descriptionIndex = ref(0)
  const imagesReset = ref({ files: [] })
  let formData = new FormData()
  const edit = ref(false)

  const dbThemes = ref([])
  const listThemes = ref([])
  const VITE_IMAGE_PATH = import.meta.env.MODE === 'production' ? import.meta.env.VITE_IMAGE_PATH_PROD : import.meta.env.VITE_IMAGE_PATH_DEV
  const VITE_CLIENT_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_CLIENT_URL_DEV

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
      if (ingredient.value.themes.length === 1) first_description.value = ingredient.value.themes[0].description
      if (dbThemes.value.filter(el1 => !listThemes.value.some(el2 => el1.theme === el2.theme)).some(el3 => el.theme === el3.theme))
        ingredient.value.themes.splice(index, 1)
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

  const customUpload = async () => {
    for (const image of ingredient.value.images) {
      const blob = await fetch(`${VITE_IMAGE_PATH}/ingredients/${image}`).then(r => r.blob())
      const file = new File([blob], image, { type: blob.type })
      file.objectURL = URL.createObjectURL(blob)
      imagesReset.value.files.push(file)
    }
  }

  // получаем ингредиент
  const getIngredient = async () => {
    ingredient.value = await store.getIngredient()
    ingredient.value.themes.forEach(el => listThemes.value.push({ theme: el.theme }))
    await customUpload()
  }

  const themeRef = ref()

  const menuRef = ref()
  onClickOutside(menuRef, () => (menu.value = false))
  const menu = ref(false)
  const menuCopy = () => {
    let createText = ``
    if (ingredient.value.names[0].name) createText += ingredient.value.names[0].name
    if (ingredient.value.themes.length) {
      if (ingredient.value.themes[0].theme)
        createText += `
${ingredient.value.themes[0].theme}`
      if (ingredient.value.themes[0].description)
        createText += `
${ingredient.value.themes[0].description}`
    }
    if (ingredient.value.images.length)
      createText += `
${VITE_CLIENT_URL + VITE_IMAGE_PATH + '/ingredients/' + ingredient.value.images[0]}`

    copyText(createText)
    menu.value = false
  }
  const menuEdit = () => {
    edit.value = !edit.value
    menu.value = false
  }
  const menuDelete = () => {
    store.visibleDeleted = true
    store.idDeleted = ingredient.value._id
    store.imagesDeleted = ingredient.value.images
  }

  const emit = defineEmits(['updateIngredients', 'toastIngredientEdits'])
  const send = async () => {
    try {
      const headers = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessTokenCycyrbita')}`,
        },
        body: formData,
        credentials: 'include',
      }
      handleFileUpload()
      formData.append('ingredient', JSON.stringify(ingredient.value))
      const res = await useFetch.post('ingredients/edit-ingredient', null, headers)

      emit('updateIngredients')
      emit('toastIngredientEdits')

      store.ingredientId = ''
      store.modalViewVisible = false
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
  onBeforeMount(getIngredient)
</script>

<style lang="scss">
  @import '@/components/Ingredients/styles/ingredient.scss';
</style>
