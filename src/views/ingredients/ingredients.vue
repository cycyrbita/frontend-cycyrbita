<template>
  <Toast />
  <Dialog
    class="ingredients-confirmation"
    v-model:visible="store.visibleDeleted"
    modal
    :dismissableMask="true"
  >
    <template #container="{ closeCallback }">
      <div class="ingredients-confirmation__body">
        <div class="ingredients-confirmation__title">Вы хорошо подумали?</div>
        <div class="ingredients-confirmation__subtitle">Точно удалить?</div>
        <div class="ingredients-confirmation__buttons">
          <Button
            class="ingredients-confirmation__button"
            label="Я передумал"
            @click="closeCallback"
          ></Button>
          <Button
            class="ingredients-confirmation__button ingredients-confirmation__button--active"
            label="Удалить"
            @click="deleted"
          ></Button>
        </div>
      </div>
    </template>
  </Dialog>
  <IngredientCreate
    v-if="store.modalCreateVisible"
    @updateIngredients="getIngredients"
    @toastIngredientCreate="toastIngredientCreate"
  ></IngredientCreate>
  <Ingredient
    @updateIngredients="getIngredients"
    @toastIngredientEdits="toastIngredientEdits"
    v-if="store.ingredientId"
  ></Ingredient>
  <div class="ingredients">
      <div class="ingredients__header">
        <IngredientsFilter @paginationCount="debounced"></IngredientsFilter>
      </div>
      <div class="container">
      <div class="ingredients__body">
        <div
          class="ingredients__list ingredients-list"
          v-if="ingredients.length"
        >
          <IngredientCard
            class="ingredients-list__card"
            v-for="ingredient in ingredients"
            :key="ingredient._id"
            :ingredient="ingredient"
            @updateIngredients="getIngredients"
            @click.stop="getIngredient(ingredient._id)"
          />
        </div>
        <Paginator
          v-if="ingredients.length"
          class="ingredients-pagination ingredients__pagination"
          v-model:first="paginationCount"
          @update:first="getIngredients"
          :rows="limit"
          :pageLinkSize="4"
          :totalRecords="ingredientsLength"
          :template="{
            '767px': 'PrevPageLink PageLinks NextPageLink',
          }"
        ></Paginator>
      </div>
      <div class="ingredients__footer"></div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'

  import IngredientsFilter from '@/components/Ingredients/IngredientsFilter.vue'
  import IngredientCard from '@/components/Ingredients/IngredientCard.vue'
  import IngredientCreate from '@/components/Ingredients/IngredientCreate.vue'
  import Ingredient from '@/components/Ingredients/Ingredient.vue'
  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'
  import Paginator from 'primevue/paginator'
  import Toast from 'primevue/toast'
  import { debounce } from 'lodash'
  import { useToast } from 'primevue/usetoast'
  const toast = useToast()

  const toastIngredientCreate = () => toast.add({ severity: 'success', detail: 'Ингредиент создан!', life: 3000 })
  const toastIngredientDeleted = () => toast.add({ severity: 'success', detail: 'Ингредиент удален!', life: 3000 })
  const toastIngredientEdits = () => toast.add({ severity: 'success', detail: 'Ингредиент изменен!', life: 3000 })

  import { useIngredientsStore } from '@/stores/ingredients'
  const store = useIngredientsStore()

  const getIngredient = id => {
    store.ingredientId = id
    store.modalViewVisible = true
  }

  const ingredients = ref([])

  const ingredientsLength = ref(0)
  const paginationCount = ref(0)
  const limit = ref(12)

  const filterIngredietns = () => {
    paginationCount.value = 0
    getIngredients()
  }

  const debounced = debounce(() => filterIngredietns(), 300)

  const getIngredients = async () => {
    try {
      const res = await store.getIngredients(paginationCount.value, limit.value)
      ingredients.value = res.ingredients
      ingredientsLength.value = res.ingredientsLength
    } catch (e) {
      console.log(e)
    }
  }

  const deleted = async () => {
    await store.deleteIngredient()
    await getIngredients()
    toastIngredientDeleted()
  }
  onMounted(getIngredients)
</script>

<style lang="scss">
  @import '@/views/ingredients/styles/ingredients.scss';
</style>
