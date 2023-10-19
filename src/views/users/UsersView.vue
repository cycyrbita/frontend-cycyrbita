<template>
	<div class="users">
		<pre>{{users}}</pre>
		<button @click="getUsers">Click</button>
	</div>
</template>

<script setup>
  import {ref} from "vue";
  import useFetch from "@/composables/useFetch";
	import {useUserStore} from "@/stores/user";

	const users = ref()
	const storeUser = useUserStore()

  const getUsers = async () => {
    try {
      const res = await useFetch.post('users', {role: storeUser.user.role}, false, true)
      const json = await res.json()
      if(res.status === 200) users.value = json
    } catch (e) {
      throw e
    }
  }
</script>

<style scoped>
@import "/src/views/users/styles/users.scss";
</style>