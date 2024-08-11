<template>
  <router-view></router-view>
  <!--  <button-->
  <!--    class="buuton"-->
  <!--    @click="send"-->
  <!--  >-->
  <!--    click-->
  <!--  </button>-->
</template>

<script setup>
  import { socket } from '@/socket'
  import useFetch from '@/composables/useFetch'
  import { useUserStore } from '@/stores/user'
  import { useAuthStore } from '@/stores/auth'
  import { watch } from 'vue'
  const storeUser = useUserStore()
  const storeAuth = useAuthStore()

  const intervalGetUser = setInterval(() => {
    if (!storeAuth.auth) return clearInterval(intervalGetUser)
    getUser()
  }, 10000)

  const getUser = async () => {
    try {
      const res = await useFetch.post('user', { email: storeUser.user.email })
      const json = await res.json()
      if (res.status !== 200) return clearInterval(intervalGetUser)
      storeUser.user = json
    } catch (e) {
      clearInterval(intervalGetUser)
      throw e
    }
  }

  if (storeAuth.auth) getUser()

  watch(
    () => storeAuth.auth,
    state => {
      setInterval(() => {
        if (!storeAuth.auth) return clearInterval(intervalGetUser)
        getUser()
      }, 10000)
    },
  )

  const send = () => {
    socket.emit('chat message', 'sdfgsdfgsdfgsdgsdgdfhggfhjdghshr')
  }
</script>
