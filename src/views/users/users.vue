<template>
	<div class="users">
		<div
			class="overlay"
			v-if="isLoading"
		></div>
		<div class="users__box">
			<h2>Список пользователей</h2>
			<button @click="getUsers">Показать список пользователей</button>
			<label>
				<p>Показать удаленных пользователей</p>
				<input type="checkbox" v-model="showDeletedUsers">
			</label>
			<div
				v-for="user in users"
				class="users-list"
			>
				<div
					class="users-list__body"
					v-if="(user._id !== storeUser.user.id) && (showDeletedUsers || !user.accountDeleted)"
				>
					<ul>
						<li><b>Id:</b> {{user._id}}</li>
						<li><b>Ник:</b> {{user.nickName}}</li>
						<li><b>Имя:</b> {{user.firstName}}</li>
						<li><b>Фамилия:</b> {{user.lastName}}</li>
						<li><b>Возраст:</b> {{user.age}}</li>
						<li><b>Аватарка:</b> {{user.avatarImg}}</li>
						<li><b>Почта:</b> {{user.email}}</li>
						<li><b>Пароль:</b> {{user.password}}</li>
						<li><b>Роль:</b> {{user.role}}
							<select @change="editRole(user._id, $event.target.value)">
								<option :value="user.role">{{user.role}}</option>
								<option value="role.admin">role.admin</option>
								<option value="role.cycyrbit">role.cycyrbit</option>
								<option value="role.default">role.default</option>
							</select>
						</li>
						<li><b>Активирован аккаунт:</b> {{user.isActivated}}</li>
						<li><b>Активационная ссылка:</b> {{user.activationLink}}</li>
						<li><b>Флаг для восстановления пароля:</b> {{user.isRecoveryPassword}}</li>
						<li><b>Список редактируемы страниц:</b> {{user.edits}}</li>
						<li><b>Последняя активность:</b> {{user.lastActivityAt}}</li>
						<li><b>Дата созданя:</b> {{user.createdAt}}</li>
						<li><b>Дата последнего обновления:</b> {{user.updatedAt}}</li>
						<li><b>Удален аккаунт или нет:</b> {{user.accountDeleted}}</li>
					</ul>
					<button
						v-if="!user.accountDeleted"
						class="users-list__button"
						@click="deleteUser(user._id, user.email)"
					>
						Удалить пользователя
					</button>
					<button
						v-if="user.accountDeleted"
						class="users-list__button"
						@click="restoreUser(user._id, user.email)"
					>
						Восстановить пользователя
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
  import {ref} from "vue";
  import useFetch from "@/composables/useFetch";
	import {useUserStore} from "@/stores/user";

	const users = ref()
	const storeUser = useUserStore()
	const isLoading = ref(false)
	const showDeletedUsers = ref(false)

  const getUsers = async () => {
    try {
      const res = await useFetch.post('users', {role: storeUser.user.role}, false, true)
      const json = await res.json()
      if(res.status === 200) users.value = json
    } catch (e) {
      throw e
    }
  }

	const deleteUser = async (id, email) => {
		try {
			const res = await useFetch.delete('delete-user', {id: id, email, role: storeUser.user.role}, false, true)
			if(res.status === 200) await getUsers()
		} catch (e) {
			throw e
		}
	}

	const restoreUser = async (id, email) => {
		try {
			const res = await useFetch.post('restore-user', {id: id, email, role: storeUser.user.role}, false, true)
			if(res.status === 200) await getUsers()
		} catch (e) {
			throw e
		}
	}

	const editRole = async (id, editRole) => {
		try {
			const res = await useFetch.post('edit-role', {id: id, editRole, role: storeUser.user.role}, false, true)
			if(res.status === 200) await getUsers()
		} catch (e) {
			throw e
		}
	}
</script>

<style scoped>
@import "/src/views/users/styles/users.scss";
</style>