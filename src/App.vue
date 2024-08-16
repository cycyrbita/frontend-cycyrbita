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
  // import { socket } from '@/socket'
  import { useUserStore } from '@/stores/user'
  import { onMounted } from 'vue'

  const storeUser = useUserStore()

  // const send = () => {
  //   socket.emit('chat message', 'sdfgsdfgsdfgsdgsdgdfhggfhjdghshr')
  // }

  onMounted(storeUser.getUser)
</script>
