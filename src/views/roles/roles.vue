<template>
	<div class="roles">
		<div class="container">
			<div class="roles__body">
				<div class="roles__row">
					<div class="roles__col roles__col--create-field">
						<input
								v-model="role.name"
								type="text"
								class="roles__field roles__field--white"
								placeholder="Добавить роль"
						/>
					</div>
					<div class="roles__col roles__col--create">
						<button class="roles__button" @click="setRole(role)">
							Добавить роль
						</button>
					</div>
				</div>
				<div class="roles__row" v-for="(element, index) in roles">
					<div class="roles__index">{{ ++index }}.</div>
					<div class="roles__col roles__col--first">
						<input type="text" class="roles__field" v-model="element.name">
					</div>
					<div class="roles__col">
						<button class="roles__button roles__button--save" @click="setRole(element)">Сохранить</button>
					</div>
					<div class="roles__col">
						<button class="roles__button roles__button--delete roles__button--danger" @click="deleteRole(element)">Удалить</button>
					</div>
					<div class="roles__col roles__col--last">
						<Transition name="bounce">
							<MultiSelect
									v-model="element.permissions"
									class="roles__permissions"
									panelClass="roles__permissions-panel"
									:maxSelectedLabels="1"
									:options="permissions"
									optionLabel="name"
									scrollHeight="700px"
									:showToggleAll="false"
									placeholder="Доступы"
							/>
						</Transition>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRolesStore } from '@/stores/roles'
  import MultiSelect from "primevue/multiselect";

  const store = useRolesStore()
  const role = ref({ name: '' })
  const roles = ref()
  const permissions = ref()

  // Получение ролей
  const getRoles = async () => {
    try {
      const res = await store.getRoles()
      if (res.status === 200) roles.value = await res.json()
    } catch (error) {
      console.log(error)
    }
  }

  // Создает или обновляет(передаем объект с ролью)
  const setRole = async element => {
    try {
      const res = await store.setRole(element)
      if (res.status === 200) {
        await getRoles()
        role.value.name = ''
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Удаляет
  const deleteRole = async role => {
    try {
      const res = await store.deleteRole(role)
      if (res.status === 200) await getRoles()
    } catch (error) {
      console.log(error)
    }
  }

  const getPermissions = async () => {
    try {
      const res = await store.getPermissions()
      if (res.status === 200) permissions.value = await res.json()
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(getRoles)
  onMounted(getPermissions)
</script>

<style lang="scss">
	@import "@/views/roles/styles/roles.scss";
</style>
