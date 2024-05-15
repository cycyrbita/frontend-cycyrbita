<template>
  <div class="page">
    <div class="page__header">
      <Header></Header>
    </div>
    <div class="page__body">
	    <RouterView></RouterView>
    </div>
    <div class="page__footer">
			<Footer></Footer>
		</div>
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue"
import Footer from "@/components/Footer/Footer.vue"
</script>