<script setup lang="ts">
import { RouterLink } from 'vue-router'

import Icons from '@/components/shared/Icons.vue'

const navItems = [
  { label: 'Earn', icon: 'earn', name: 'home' },
  { label: 'Wallet', icon: 'wallet', name: 'wallet' },
  { label: 'Terminal', icon: 'trading-up', name: 'trading-up' },
  { label: 'Event', icon: 'cup', name: 'cup' },
  { label: 'Friends', icon: 'users', name: 'users' },
]
</script>

<template>
  <footer
    class="bg-white/5 sticky bottom-0 w-full border-t flex font-medium justify-evenly gap-4 text-xs backdrop-blur-sm border-white/8 z-1000 p-4 rounded-t-[1.25rem]"
  >
    <RouterLink
      v-for="item in navItems"
      :key="item.name"
      :to="{ name: item.name }"
      custom
      v-slot="{ isActive, isExactActive, navigate }"
    >
      <button
        type="button"
        class="flex flex-col items-center gap-1"
        :class="(item.name === 'home' ? isExactActive : isActive) ? 'text-white' : 'text-[#B8BBBC]'"
        @click="navigate"
      >
        <Icons
          :name="item.icon"
          :size="20"
          :color="(item.name === 'home' ? isExactActive : isActive) ? '#ffffff' : '#B8BBBC'"
          :use-gradient="item.name === 'home' ? isExactActive : isActive"
        />
        <span>{{ item.label }}</span>
      </button>
    </RouterLink>
  </footer>
</template>
