<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './NavBar.vue'
import Header from './Header.vue'
</script>

<template>
  <div class="layout">
    <div class="layout__container relative flex flex-col h-full min-h-screen z-1">
      <Header />
      <main class="layout__content flex-1 z-1000">
        <RouterView />
      </main>
      <NavBar />
    </div>
  </div>
  <img
    src="@/assets/images/background.svg"
    alt="background"
    class="fixed top-0 sm:hidden left-0 w-full h-full object-cover object-top z-0!"
  />
</template>
<style scoped>
.layout {
  background: radial-gradient(50% 50% at 50% 50%, #090d14 0%, #121212 100%);
}

.layout__container {
  max-width: 37.5rem;
  margin: 0 auto;
  height: 100%;
}
</style>
