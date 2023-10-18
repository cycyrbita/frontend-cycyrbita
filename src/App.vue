<template>
	<router-view></router-view>
</template>

<script setup>
import useFetch from "@/composables/useFetch";

import {useAuthStore} from "@/stores/auth";
import {useUserStore} from "@/stores/user";

import router from "@/router";
import {onBeforeMount} from "vue";

const storeAuth = useAuthStore()
const storeUser = useUserStore()

const authorisation = async () => {
	try {
		const res = await useFetch.get('refresh')
		const json = await res.json()

		if(res.status === 200) {
			localStorage.setItem('accessTokenCycyrbita', json.accessToken)
			storeAuth.auth = true
			storeUser.user = json.user
		} else {
			router.push('/login')
		}
	} catch (e) {
		console.log(e)
	}
}

onBeforeMount(authorisation)
</script>