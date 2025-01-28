<template>
  <div
      :class="{promo__add: true, promo__add_fix: props.isNewPromo }"
      @click="showAddPromo"
      title="Добавить архив"
  >+
  </div>
  <div v-if="visibleFlags.isAddPromo"
       class="promo__modal"
       ref="modal"
       @click="hideAddPromo"
  >
    <div class="promo__card promo__card-item">
      <div class="promo__card-container container">
        <form class="promo__add-form"
              enctype="multipart/form-data"
        >
          <div class="promo__add-row">
            <p
                v-if="props.title"
                class="promo__add-promo"
            >
              Добавить в {{ props.title }}
            </p>
            <InputText
                v-else
                v-model="titleLocal"
                class="promo__add-input promo__add-title"
                name="title"
                placeholder="Название промо"
            />
          </div>
          <div class="promo__add-row">
            <div class="promo__add-file-item">
              <input type="file"
                     id="promo__add-file-default"
                     @change="checkFiles"
                     ref="inputFile"
                     class="promo__add-file-default"
                     name="archive"
                     placeholder="lal"
                     multiple
              >
              <label for="promo__add-file-default"
                     class="promo__add-input promo__add-file"
              >
                выберите архив
              </label>
            </div>
            <button
                v-if="hasFile"
                class="btn promo__add-reset"
                @click.prevent="resetInput()"
                title="Сбросить архивы"
            >
              +
            </button>
          </div>
          <p class="promo__add-error"
             v-if="isError"
          >{{ isError }}</p>
          <div class="promo__add-info"
               v-if="resultArrayToSend.length !== 0"
               v-for="item of resultArrayToSend"
          >
            <p>{{ item.name }}</p>
          </div>
          <button @click.prevent="sendArchive"
                  class="btn promo__add-file"
                  v-if="hasFile"
          >загрузить
          </button>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, defineEmits, reactive } from 'vue'
import InputText from 'primevue/inputtext'
import { useNewPromoStore } from '@/stores/new-promo'

const store = useNewPromoStore()
const emit = defineEmits(['updateServerStatus'])
const props = defineProps({
  title: String,
  isNewPromo: Boolean
})

const input = ref(null)
const inputFile = ref(null)
const hasFile = ref(false)
const titleLocal = ref(null)
const resultArrayToSend = ref([])
const visibleFlags = reactive({
  isAddPromo: false,
  isNewPromo: props.isNewPromo,
})
const isError = ref(null)
const uniq = ref(new Set())
const showAddPromo = () => visibleFlags.isAddPromo = true
titleLocal.value = props.title
const resetInput = (err = undefined) => {
  isError.value = err
  if (inputFile.value) {
    inputFile.value.value = null
  }
  hasFile.value = false
  resultArrayToSend.value.length = 0
  uniq.value.clear()
  return err
}

const checkFiles = () => {
  const list = Array.from(inputFile.value.files)

  for (let i = 0; i < list.length; i++) {
    //check zip ext
    if (!list[i].type.includes('zip')) {
      return resetInput('Только zip архив')
    }

    //check valid name
    if (titleLocal.value && !list[i].name.includes(titleLocal.value)) {
      return resetInput('Название архива должно содержать название промо')
    }

    //check double name
    if (uniq.value.has(list[i].name)) {
      return resetInput('вы добавили 2 архива с одинаковым названием')
    }
    uniq.value.add(list[i].name)
  }

  list.forEach(item => resultArrayToSend.value.push(item))
  isError.value = null
  hasFile.value = inputFile.value.files.length > 0
}

const hideAddPromo = (e) => {
  if (e) {
    e.target === e.currentTarget ? visibleFlags.isAddPromo = false : undefined
    return
  }
  visibleFlags.isAddPromo = false
}

const isErrorBeforeSend = (list, title) => {
  //check empty
  if (!title || list.length === 0) {
    return isError.value = 'Выберите промо или прикрепите архив'
  }

  for (let i = 0; i < list.length; i++) {
    //check valid name
    if (titleLocal.value && !list[i].name.includes(titleLocal.value)) {
      return isError.value = resetInput('Название архива должно содержать название промо')
    }
  }
  return isError.value = null
}

const sendArchive = async () => {
  const list = resultArrayToSend.value
  const title = titleLocal.value
  isErrorBeforeSend(list, title)
  if (isError.value) {
    return resetInput(isError.value)
  }
  for (let i = 0; i < list.length; i++) {
    list[i].archiveName = list[i].name.replace('.zip', '')
  }

// requests
// send archive
  try {
    for (let i = 0; i < list.length; i++) {
      await store.uploadArchive(title, visibleFlags.isNewPromo, list[i], list[i].archiveName, i + 1, list.length)
      emit('updateServerStatus')

      // update database
      await store.updateNewPromo(title, visibleFlags.isNewPromo, list[i].archiveName, i + 1, list.length)
      emit('updateServerStatus')
      visibleFlags.isNewPromo = false
    }
    hideAddPromo()
  }
  catch (e) {
    return resetInput(e.message)
  }
  // create screenshot
  try {
    for (let i = 0; i < list.length; i++) {
      await store.createScreenShot(title, list[i].archiveName, i + 1, list.length)
      emit('updateServerStatus')
    }
    resetInput()
  }
  catch (e) {
    return resetInput(e.message)
  }
  visibleFlags.isNewPromo = props.isNewPromo
}
</script>

<style lang="scss">
@use "@/assets/styles/button.scss" as *;
@use "@/components/new-promo/styles/new-promo-card.scss" as *;
@use "@/components/new-promo/styles/new-promo-add.scss" as *;
</style>