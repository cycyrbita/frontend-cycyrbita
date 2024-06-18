<template>
    <div
        ref="ingredientsFilter"
        class="ingredients-filter"
    >
        <div class="ingredients-filter__container">
            <div
                v-if="$route.name !== 'ingredients-create'"
                class="ingredients-filter__elem ingredients-filter__search"
            >
                <span class="p-input-icon-right"> <i
                    class="pi pi-search"
                />
                    <InputText
                        class="ingredients-filter__field"
                        @input="emit('paginationCount')"
                        v-model="store.filterIngredients.name"
                        placeholder="Поиск"
                    />
                </span>
            </div>
            <div
                v-if="$route.name !== 'ingredients-create'"
                class="ingredients-filter__elem"
            >
                <Dropdown
                    v-model="store.filterIngredients.theme"
                    :options="themes"
                    optionLabel="theme"
                    optionValue="theme"
                    @change="$emit('paginationCount')"
                    showClear
                    scrollHeight="700px"
                    placeholder="Тематика"
                    class="ingredients-filter__select"
                    panelClass="ingredients-filter__select-panel"
                />
            </div>
            <div class="ingredients-filter__elem ingredients-filter__elem-last">
                <div
                    @click="store.modalCreateVisible = true"
                    class="ingredients-filter__add"
                >
                    <i class="pi pi-plus"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
  import { useIngredientsStore } from '@/stores/ingredients'

  import InputText from 'primevue/inputtext'
  import Dropdown from 'primevue/dropdown'
  import {onBeforeMount, onMounted, ref} from 'vue'

  const store = useIngredientsStore()

  const name = ref('')

  const emit = defineEmits(['paginationCount'])

  const themes = ref([])
  const getIngredientsThemes = async () => {
    try {
      themes.value = await store.getIngredientsThemes()
    } catch (e) {
      console.log(e)
    }
  }

  const ingredientsFilter = ref('')

  const ingredientsFilterCssStyleName = 'ingredients-filter_shifted'

  const changeFilterCLassAfterScroll = () => {
      window.addEventListener('scroll', event => {
          return window.scrollY > 0 ?
              ingredientsFilter.value.classList.add(ingredientsFilterCssStyleName) :
              ingredientsFilter.value.classList.remove(ingredientsFilterCssStyleName)
      })
  }
  onMounted(changeFilterCLassAfterScroll)
  onBeforeMount(getIngredientsThemes)
</script>

<style lang="scss">
  @import '@/components/Ingredients/styles/ingredients-filter.scss';
</style>
