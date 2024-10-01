<template>
  <Toast/>
  <section class="promo">
    <Dialog
        v-model:visible="store.visibleDeleted"
        modal
        :dismissableMask="true"
    >
      <template #container="{ closeCallback }">
        <div class="promo-confirmation">
          <div class="promo-confirmation__title">Вы хорошо подумали?</div>
          <div class="promo-confirmation__subtitle">Точно удалить?</div>
          <div class="promo-confirmation__buttons">
            <Button
                class="promo-confirmation__button"
                label="Я передумал"
                @click="closeCallback"
            ></Button>
            <Button
                class="promo-confirmation__button promo-confirmation__button--active"
                label="Удалить"
                @click="deletePromo"
            ></Button>
          </div>
        </div>
      </template>
    </Dialog>
    <div class="promo__container container">
      <div class="promo__card"
           v-for="item of store.list.promo"
           :key="item._id"
      >
        <h2 class="promo__title">{{ item.title }}</h2>
        <div class="promo__list">
          <div
              class="promo__btn promo__btn_lend"
              v-for="lend of item.lends"
              :key="lend"
              @click="store.selectPromo(item._id, item.title, lend)"
          >{{ formatName(lend, item.title) }}
          </div>
        </div>
        <div class="promo__list">
          <div class="promo__btn promo__btn_prelend"
               v-for="prelend of item.prelends"
               :key="prelend"
               @click="store.selectPromo(item._id, item.title, prelend)"
          >{{ formatName(prelend, item.title) }}
          </div>
        </div>
        <div class="promo__list">
          <div class="promo__btn promo__btn_sites"
               v-for="site of item.sites"
               :key="site"
               @click="store.selectPromo(item._id, item.title, site)"
          >{{ formatName(site, item.title) }}
          </div>
        </div>
      </div>
      <NewPromoCard v-if="store.targetPromo.title"/>
      <NewPromoAdd
          @updateServerStatus="updateServerStatus"
      />
    </div>
  </section>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useNewPromoStore } from '@/stores/new-promo'
import NewPromoCard from "@/components/new-promo/new-promo-card.vue";
import NewPromoAdd from "@/components/new-promo/new-promo-add.vue";
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from "primevue/usetoast";

const toast = useToast()
const store = useNewPromoStore()
const updateServerStatus = () => toast.add({ severity: 'success', detail: store.serverStatus, life: 5000 })
const formatName = (fullName, deletePart) => fullName.replaceAll('_', ' ').replace(deletePart, '')
const deletePromo = async () => {
  await store.deletePromo(store.targetPromo)
  await store.getNewPromo()
  store.hidePromo()
  store.visibleDeleted.value = false
}
onMounted(store.getNewPromo)
</script>

<style scoped
       lang="scss"
>
@import "@/views/new-promo/styles/new-promo.scss";
</style>