<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import Icons from '@/components/shared/Icons.vue'
import EventBlock from './ui/EventBlock.vue'

type ReferralTabType = '1' | '2'

const activeReferralTab = ref<ReferralTabType>('1')

const setActiveReferralTab = (tab: ReferralTabType) => {
  activeReferralTab.value = tab
}

// Моковые данные для событий
const allEvents = [
  {
    id: 1,
    title: 'Referal boom',
    status: 'active' as const,
    description: 'Получайте комиссионные от пополнения друзей',
    image: '/src/assets/images/referall.png',
    buttonText: 'Read More',
  },
  {
    id: 2,
    title: 'Trading Challenge',
    status: 'active' as const,
    description: 'Соревнуйтесь с другими трейдерами и выигрывайте призы',
    image: '/src/assets/images/referall.png',
    buttonText: 'Участвовать',
  },
  {
    id: 3,
    title: 'Weekly Bonus',
    status: 'inactive' as const,
    description: 'Еженедельные бонусы за активность на платформе',
    image: '/src/assets/images/referall.png',
    buttonText: 'Подробнее',
  },
  {
    id: 4,
    title: 'VIP Program',
    status: 'active' as const,
    description: 'Станьте VIP-участником и получите эксклюзивные привилегии',
    image: '/src/assets/images/referall.png',
    buttonText: 'Узнать больше',
  },
]

// Фильтрация событий по вкладке
const filteredEvents = computed(() => {
  if (activeReferralTab.value === '1') {
    return allEvents.filter((event) => event.status === 'active')
  }
  return allEvents.filter((event) => event.status === 'inactive')
})
</script>

<template>
  <section class="p-4 space-y-5">
    <div class="flex items-center justify-center w-full bg-white/4 p-1 mx-auto rounded-[0.875rem]">
      <button
        @click="setActiveReferralTab('1')"
        class="rounded-xl text-xs font-medium py-2 px-4 w-full transition-colors"
        :class="
          activeReferralTab === '1' ? 'bg-white/8 text-white' : 'text-[#9CA3AF] hover:text-white/80'
        "
      >
        Активные
      </button>
      <button
        @click="setActiveReferralTab('2')"
        class="rounded-xl text-xs font-medium py-2 px-4 w-full transition-colors"
        :class="
          activeReferralTab === '2' ? 'bg-white/8 text-white' : 'text-[#9CA3AF] hover:text-white/80'
        "
      >
        Архив
      </button>
    </div>
    <div class="mt-2.5">
      <div class="flex items-center justify-center gap-2.5">
        <div class="bg-[#E7B307] w-12.5 h-12.5 rounded-full flex items-center justify-center">
          <Icons name="rocket" :size="25" />
        </div>
        <p class="text-[1.75rem] font-semibold">Event Hub</p>
      </div>
      <p class="text-[#9CA3AF] text-center text-sm font-medium mt-3.5">
        Проявляй активность и получай <br />
        награды в USDT
      </p>
    </div>
    <div class="space-y-5">
      <EventBlock
        v-for="event in filteredEvents"
        :key="event.id"
        :title="event.title"
        :status="event.status"
        :description="event.description"
        :image="event.image"
        :button-text="event.buttonText"
      />
    </div>
  </section>
</template>
