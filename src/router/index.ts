import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/components/layout/MainLayout.vue'

import HomeView from '@/views/Home/index.vue'
import WalletView from '@/views/Wallet/index.vue'
import TerminalView from '@/views/Terminal/index.vue'
import EventView from '@/views/Event/index.vue'
import FriendsView from '@/views/Friends/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'wallet',
          name: 'wallet',
          component: WalletView,
        },
        {
          path: 'terminal',
          name: 'trading-up',
          component: TerminalView,
        },
        {
          path: 'event',
          name: 'cup',
          component: EventView,
        },
        {
          path: 'friends',
          name: 'users',
          component: FriendsView,
        },
      ],
    },
  ],
})

export default router
