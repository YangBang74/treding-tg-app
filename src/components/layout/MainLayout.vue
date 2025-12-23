<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './NavBar.vue'
import Header from './Header.vue'
</script>

<template>
  <div class="layout flex flex-col h-full min-h-screen z-1">
    <Header />
    <main class="layout__content flex-1 text-transparent pb-20">
      <RouterView />
    </main>
    <NavBar />
  </div>
  <img
    src="@/assets/images/background.svg"
    alt="background"
    class="absolute top-0 left-0 w-full h-full object-cover object-top z-1"
  />
</template>
<style scoped>
.layout {
  background: radial-gradient(50% 50% at 50% 50%, #090d14 0%, #121212 100%);
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
}
</style>
