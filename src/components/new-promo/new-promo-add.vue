<template>
  <div
      class="promo__add "
      @click="showAddPromo"
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
            <Dropdown
                v-if="!visibleFlags.isNewPromo"
                v-model="titleLocal"
                :options="store.list.promoTitle"
                optionLabel="title"
                optionValue="title"
                @change="selectPromo"
                showClear
                scrollHeight="700px"
                placeholder="Промо"
                class="promo__add-select"
                panelClass="promo__add-select-panel"
            />
            <InputText
                v-else
                v-model="titleLocal"
                class="promo__add-input promo__add-title"
                name="title"
                placeholder="Название промо"
            />
            <button
                @click.prevent="addNewPromoTitle"
                :title="visibleFlags.isNewPromo ? 'выбрать из существующих' : 'добавить новое промо'"
                :class="{
                  btn: true,
                  'promo__add-btn': true,
                  'promo__add-new': !visibleFlags.isNewPromo,
                  'promo__add-old': visibleFlags.isNewPromo
              }"
            >
              +
            </button>
          </div>
          <div class="promo__add-file">
            <input type="file"
                   id="promo__add-file-default"
                   @change="checkFiles(inputFile)"
                   ref="inputFile"
                   class="promo__add-file-default"
                   name="archive"
                   placeholder="lal"
                   required
                   multiple
            >
            <label for="promo__add-file-default"
                   class="promo__add-input promo__add-file"
            >
              выберите архив
            </label>
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
import Dropdown from 'primevue/dropdown'

const store = useNewPromoStore()
const emit = defineEmits(['paginationCount', 'updateServerStatus'])
const input = ref(null)
const inputFile = ref(null)
const titleLocal = ref(null)
const resultArrayToSend = ref([])
const visibleFlags = reactive({
  isAddPromo: false,
  isNewPromo: false,
})
const isError = ref(null)
const uniq = ref(new Set())
const showAddPromo = () => visibleFlags.isAddPromo = true

const resetInput = (err = undefined) => {
  isError.value = err
  inputFile.value = ''
  resultArrayToSend.value.length = 0
  uniq.value.clear()
  return err
}

const checkFiles = (inputFile) => {
  const list = Array.from(inputFile.files)

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
}

const hideAddPromo = (e) => {
  if (e) {
    e.target === e.currentTarget ? visibleFlags.isAddPromo = false : undefined
    return
  }
  visibleFlags.isAddPromo = false
}

const selectPromo = () => emit('paginationCount')

const addNewPromoTitle = () => {
  visibleFlags.isNewPromo = !visibleFlags.isNewPromo
  titleLocal.value = ''
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
  console.log(title)
  console.log(list)
  isErrorBeforeSend(list, title)
  if (isError.value) {
    return resetInput(isError.value)
  }
  for (let i = 0; i < list.length; i++) {
    list[i].archiveName = list[i].name.replace('.zip', '')
  }

// requests
// send archive
  for (let i = 0; i < list.length; i++) {
    try {
      await store.uploadArchive(title, visibleFlags.isNewPromo, list[i], list[i].archiveName, i + 1, list.length)
      emit('updateServerStatus')

      // update database
      await store.updateNewPromo(title, visibleFlags.isNewPromo, list[i].archiveName, i + 1, list.length)
      emit('updateServerStatus')
      hideAddPromo()
      visibleFlags.isNewPromo = false

    }
    catch (e) {
      resetInput(e.message)
    }
  }

  // create screenshot
  for (let i = 0; i < list.length; i++) {
    try {
      await store.createScreenShot(title, list[i].archiveName, i + 1, list.length)
      emit('updateServerStatus')
    }
    catch (e) {
      resetInput(e.message)
    }
  }
  resetInput()
  titleLocal.value = ''
}
</script>

<style lang="scss">
@use "@/assets/styles/button.scss" as *;
@use "@/components/new-promo/styles/new-promo-card.scss" as *;
@use "@/components/new-promo/styles/new-promo-add.scss" as *;
</style>