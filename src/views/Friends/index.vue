<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '@/components/shared'
import HistoryTable, { type Column } from '@/views/Wallet/ui/HistoryTable.vue'
import Pagination from '@/components/shared/Pagination.vue'

type ReferralTabType = '1' | '2' | '3'

const activeReferralTab = ref<ReferralTabType>('1')

const setActiveReferralTab = (tab: ReferralTabType) => {
  activeReferralTab.value = tab
}

const referralLink = '0xb62das1sdasdaf71422f'
const isCopied = ref(false)

// Данные для таблиц
const line1Data = [
  { id: 1, userId: 1, username: 'Ivan Ivanov', avatar: '/src/assets/images/gho.png' },
  { id: 2, userId: 2, username: 'Test213', avatar: '/src/assets/images/eth.png' },
  { id: 3, userId: 3, username: 'Losd12', avatar: '/src/assets/images/usde.png' },
  { id: 4, userId: 4, username: 'Safonov oplati', avatar: '/src/assets/images/gho.png' },
  { id: 5, userId: 5, username: 'Cherry214', avatar: '/src/assets/images/eth.png' },
  { id: 6, userId: 6, username: 'Trollololo', avatar: '/src/assets/images/usde.png' },
]

const line2Data = [
  { id: 1, userId: 7, username: 'User7', avatar: '/src/assets/images/gho.png' },
  { id: 2, userId: 8, username: 'User8', avatar: '/src/assets/images/eth.png' },
  { id: 3, userId: 9, username: 'User9', avatar: '/src/assets/images/usde.png' },
]

const line3Data = [
  { id: 1, userId: 10, username: 'User10', avatar: '/src/assets/images/gho.png' },
  { id: 2, userId: 11, username: 'User11', avatar: '/src/assets/images/eth.png' },
]

// Конфигурация колонок
const referralColumns: Column[] = [
  { key: 'userId', label: 'Id', align: 'left' },
  { key: 'user', label: 'User', align: 'left' },
]

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}

const handleCopyAddress = async () => {
  const success = await copyToClipboard(referralLink)
  if (success) {
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 5000)
  }
}
</script>

<template>
  <section class="text-white p-4 space-y-4">
    <div class="bg-white/4 border border-white/8 p-5.25 space-y-3 rounded-2xl">
      <div class="flex items-center gap-2.5">
        <div
          class="bg-[#F4CE4A]/20 text-[#F4CE4A] w-11 h-11 flex items-center justify-center rounded-full"
        >
          <Icons name="users-i" :size="15" />
        </div>
        <p class="text-xl font-medium leading-7.5">Friends</p>
      </div>
      <div class="flex items-center gap-2.5 font-medium">
        <div class="bg-white/4 rounded-[0.875rem] py-2.5 px-4 w-full">
          <p class="text-xs text-[#9CA3AF] leading-5">Total Friends</p>
          <p>2.133</p>
        </div>
        <div class="bg-white/4 rounded-[0.875rem] py-2.5 px-4 w-full">
          <p class="text-xs text-[#9CA3AF] leading-5">Active users</p>
          <p>24</p>
        </div>
      </div>
      <div class="bg-white/4 rounded-[2.5rem] py-3 px-5 flex items-center gap-3">
        <p class="font-medium flex-1">{{ referralLink }}</p>
        <button type="button" class="pr-px" @click="handleCopyAddress">
          <Icons :name="isCopied ? 'check' : 'copy'" :size="16" />
        </button>
      </div>
      <button
        type="button"
        class="bg-[#4E80EE] border-[#70A3F3] border w-full py-3 rounded-[1.875rem] flex items-center justify-center gap-2.5 font-medium"
        @click="handleCopyAddress"
      >
        <Icons name="super" :size="18" />
        Сopy the link
      </button>
    </div>
    <div class="bg-black/20 py-2.5 px-4 rounded-[1.25rem] space-y-2.5">
      <p class="font-semibold">Your referrals</p>
      <div
        class="flex items-center justify-center w-full bg-white/4 p-1 mx-auto rounded-[0.875rem]"
      >
        <button
          @click="setActiveReferralTab('1')"
          class="rounded-xl text-xs font-medium py-2 px-4 w-full transition-colors"
          :class="
            activeReferralTab === '1'
              ? 'bg-white/8 text-white'
              : 'text-[#9CA3AF] hover:text-white/80'
          "
        >
          1 Line
        </button>
        <button
          @click="setActiveReferralTab('2')"
          class="rounded-xl text-xs font-medium py-2 px-4 w-full transition-colors"
          :class="
            activeReferralTab === '2'
              ? 'bg-white/8 text-white'
              : 'text-[#9CA3AF] hover:text-white/80'
          "
        >
          2 Line
        </button>
        <button
          @click="setActiveReferralTab('3')"
          class="rounded-xl text-xs font-medium py-2 px-4 w-full transition-colors"
          :class="
            activeReferralTab === '3'
              ? 'bg-white/8 text-white'
              : 'text-[#9CA3AF] hover:text-white/80'
          "
        >
          3 Line
        </button>
      </div>

      <!-- Таблица 1 Line -->
      <HistoryTable
        v-if="activeReferralTab === '1'"
        :columns="referralColumns"
        :data="line1Data"
        container-bg
        :gridTemplateColumns="'auto 1fr'"
      >
        <template #cell-user="{ item }">
          <div class="flex items-center gap-2">
            <img
              :src="String(item.avatar || '')"
              :alt="String(item.username || '')"
              class="w-6 h-6 rounded-full object-cover"
            />
            <span class="text-[0.625rem] font-medium text-white/70">{{ item.username }}</span>
          </div>
        </template>
      </HistoryTable>

      <!-- Таблица 2 Line -->
      <HistoryTable
        v-if="activeReferralTab === '2'"
        :columns="referralColumns"
        :data="line2Data"
        container-bg
        :gridTemplateColumns="'auto 1fr'"
      >
        <template #cell-user="{ item }">
          <div class="flex items-center gap-2">
            <img
              :src="String(item.avatar || '')"
              :alt="String(item.username || '')"
              class="w-6 h-6 rounded-full object-cover"
            />
            <span class="text-[0.625rem] font-medium text-white/70">{{ item.username }}</span>
          </div>
        </template>
      </HistoryTable>

      <!-- Таблица 3 Line -->
      <HistoryTable
        v-if="activeReferralTab === '3'"
        :columns="referralColumns"
        :data="line3Data"
        container-bg
        :gridTemplateColumns="'auto 1fr'"
      >
        <template #cell-user="{ item }">
          <div class="flex items-center gap-2">
            <img
              :src="String(item.avatar || '')"
              :alt="String(item.username || '')"
              class="w-6 h-6 rounded-full object-cover"
            />
            <span class="text-[0.625rem] font-medium text-white/70">{{ item.username }}</span>
          </div>
        </template>
      </HistoryTable>
      <Pagination :current-page="1" :total-pages="10" :total-items="100" :items-per-page="10" />
    </div>
  </section>
</template>
