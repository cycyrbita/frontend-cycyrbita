<template>
  <div
      class="promo__add"
      @click="showAddPromo"
  >+
  </div>
  <div v-if="visibleFlags.isAddPromo"
       class="promo__modal"
       ref="modal"
       @click="hideAddPromo"
  >
    <div class="promo__card">
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
          <p class="promo__add-info"
             v-if="currentFileName"
          >{{ currentFileName }}</p>
          <button @click.prevent="uploadArchive(titleLocal, inputFile.files[0])"
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
const emit = defineEmits(['paginationCount'])
const input = ref(null)
const inputFile = ref(null)
const titleLocal = ref(null)
const currentFileName = ref(null)
const visibleFlags = reactive({
  isAddPromo: false,
  isNewPromo: false,
})
const isError = ref(null)
const errors = {
  fileError: 'Только zip архив',
  nameWrong: 'Название архива должно содержать название промо',
  inputEmpty: 'Выберите промо и прикрепите архив',
}
const showAddPromo = () => visibleFlags.isAddPromo = true
const checkFiles = (inputFile) => {
  if (inputFile.files.length > 1) {
    inputFile.value = ''
  }

  if (!inputFile.files[0]) {
    return
  }
  if (!inputFile.files[0].type.includes('zip')) {
    isError.value = errors.fileError
    inputFile.value = ''
    return
  }
  currentFileName.value = inputFile.files[0].name
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
const uploadArchive = async (title, file) => {
  if (!file || !title) {
    isError.value = errors.inputEmpty
    return
  }
  if (!file.name.includes(title)) {
    isError.value = errors.nameWrong
    return
  }
  await store.uploadArchive(title, file, visibleFlags.isNewPromo)
  isError.value = null
  hideAddPromo()
  titleLocal.value = ''
  inputFile.value = ''
  visibleFlags.isNewPromo = false
}
</script>

<style lang="scss">
@import "@/assets/styles/button.scss";
@import "@/components/new-promo/styles/new-promo-card.scss";
@import "@/components/new-promo/styles/new-promo-add.scss";
</style>