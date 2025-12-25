<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Icons from '@/components/shared/Icons.vue'
import Info from '@/components/shared/Info.vue'
import HistoryTable, { type Column } from './ui/HistoryTable.vue'

type TabType = 'deposit' | 'withdraw'
type HistoryTabType = 'depositing' | 'withdrawal' | 'referrals'

const activeTab = ref<TabType>('deposit')

const setActiveTab = (tab: TabType) => {
  activeTab.value = tab
}

const activeHistoryTab = ref<HistoryTabType>('depositing')

const setActiveHistoryTab = (tab: HistoryTabType) => {
  activeHistoryTab.value = tab
}

// Данные для таблиц
const depositingData = [
  { id: 1, coin: 'TON', total: '+0.00005', status: 'done' },
  { id: 2, coin: 'TON', total: '+0.00005', status: 'done' },
  { id: 3, coin: 'TRC20', total: '+0.00005', status: 'cancel' },
  { id: 4, coin: 'BEP20', total: '+0.00005', status: 'process' },
  { id: 5, coin: 'TON', total: '+0.00005', status: 'process' },
  { id: 6, coin: 'TON', total: '+0.00005', status: 'done' },
]

const withdrawalData = [
  { id: 1, coin: 'TON', total: '-0.00005', status: 'done' },
  { id: 2, coin: 'TON', total: '-0.00005', status: 'done' },
  { id: 3, coin: 'TRC20', total: '-0.00005', status: 'cancel' },
  { id: 4, coin: 'BEP20', total: '-0.00005', status: 'process' },
  { id: 5, coin: 'TON', total: '-0.00005', status: 'process' },
  { id: 6, coin: 'TON', total: '-0.00005', status: 'done' },
]

const referralsData = [
  { id: 1, user: 'Ivan Ivanov', percent: '+0.0001' },
  { id: 2, user: 'Test213', percent: '+0.0001' },
  { id: 3, user: 'Losd12', percent: '+0.0001' },
  { id: 4, user: 'Safonov oplati', percent: '+0.0001' },
  { id: 5, user: 'Cherry214', percent: '+0.0001' },
  { id: 6, user: 'Trollololo', percent: '+0.0001' },
]

const networks = ['TON', 'ETH', 'BTC', 'USDT', 'USDC']
const selectedNetwork = ref('TON')
const isNetworkOpen = ref(false)
const networkDropdownRef = ref<HTMLElement | null>(null)

const selectNetwork = (network: string) => {
  selectedNetwork.value = network
  isNetworkOpen.value = false
}

const toggleNetworkDropdown = () => {
  isNetworkOpen.value = !isNetworkOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (networkDropdownRef.value && !networkDropdownRef.value.contains(event.target as Node)) {
    isNetworkOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Конфигурация колонок для таблиц
const depositingColumns: Column[] = [
  { key: 'coin', label: 'Coin', align: 'center' },
  { key: 'total', label: 'Total', align: 'center' },
  { key: 'status', label: 'Status', align: 'center', showStatusDot: true },
]

const withdrawalColumns: Column[] = [
  { key: 'coin', label: 'Coin', align: 'center' },
  { key: 'total', label: 'Total', align: 'center' },
  { key: 'status', label: 'Status', align: 'center', showStatusDot: true },
]

const referralsColumns: Column[] = [
  { key: 'user', label: 'User', align: 'left' },
  {
    key: 'percent',
    label: '%',
    align: 'right',
    cellClass: 'font-medium text-[#22C55E]',
  },
]
</script>

<template>
  <section class="text-white p-4 space-y-4">
    <div class="bg-white/4 rounded-[1.875rem] py-4 space-y-4">
      <div class="bg-black/20 rounded-[1.25rem] py-2.5 px-4 flex items-center gap-3">
        <div class="bg-[#22C55E]/20 w-10 h-10 flex items-center justify-center p-2.5 rounded-full">
          <Icons name="dollar" class="text-[#22C55E]" />
        </div>
        <div>
          <div class="flex items-center gap-1.25">
            <p class="text-xs text-[#9CA3AF] leading-5">Your balance</p>
            <Info text="Total Lendings" />
          </div>
          <p class="text-xl font-semibold text-white leading-7.5 mb-px">$1112.21</p>
        </div>
      </div>
      <div class="bg-black/20 rounded-[1.25rem] py-2.5 px-4">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center bg-white/4 p-1 mx-auto rounded-[0.875rem]">
            <button
              @click="setActiveTab('deposit')"
              class="rounded-xl text-xs font-medium py-2 px-4 transition-colors"
              :class="
                activeTab === 'deposit'
                  ? 'bg-white/8 text-white'
                  : 'text-[#9CA3AF] hover:text-white/80'
              "
            >
              Deposit
            </button>
            <button
              @click="setActiveTab('withdraw')"
              class="rounded-xl text-xs font-medium py-2 px-4 transition-colors"
              :class="
                activeTab === 'withdraw'
                  ? 'bg-white/8 text-white'
                  : 'text-[#9CA3AF] hover:text-white/80'
              "
            >
              Withdraw
            </button>
          </div>
        </div>
        <div class="mt-3.75 space-y-1.25">
          <p class="text-[#9CA3AF] text-xs font-medium">Select a network</p>
          <div ref="networkDropdownRef" class="relative">
            <button
              @click="toggleNetworkDropdown"
              class="bg-white/4 py-3 px-5 rounded-[2.5rem] font-medium flex items-center justify-between w-full cursor-pointer hover:bg-white/5 transition-colors"
            >
              <span>{{ selectedNetwork }}</span>
              <Icons
                name="arrow-down"
                :size="12"
                class="text-[#9CA3AF] transition-transform"
                :class="{ 'rotate-180': isNetworkOpen }"
              />
            </button>
            <transition name="dropdown">
              <div
                v-if="isNetworkOpen"
                class="absolute top-full left-0 right-0 mt-2 bg-[#090d14]/96 border border-white/10 rounded-xl shadow-lg z-50 overflow-hidden"
              >
                <button
                  v-for="network in networks"
                  :key="network"
                  @click="selectNetwork(network)"
                  class="w-full px-5 py-3 text-left hover:bg-white/5 transition-colors font-medium"
                  :class="selectedNetwork === network ? 'bg-white/10 text-white' : 'text-[#9CA3AF]'"
                >
                  {{ network }}
                </button>
              </div>
            </transition>
          </div>
          <p class="text-[#9CA3AF] text-xs font-medium">Deposit</p>
          <input
            type="number"
            placeholder="$0.00"
            class="bg-white/4 py-3 w-full focus:outline-none focus:border-white/8 border-transparent border px-5 rounded-[2.5rem] font-medium flex items-center justify-between"
          />
          <button
            class="bg-[#4E80EE] border border-[#70A3F3] w-full mt-5 block text-sm font-medium py-2 px-4 rounded-full"
          >
            DEPOSIT
          </button>
        </div>
      </div>
      <div class="bg-black/20 rounded-[1.25rem] py-2.5 px-4">
        <p class="text-xl font-semibold mb-3">History</p>
        <div class="flex items-center gap-3 mb-4">
          <div
            class="flex items-center justify-center w-full bg-white/4 p-1 mx-auto rounded-[0.875rem]"
          >
            <button
              @click="setActiveHistoryTab('depositing')"
              class="rounded-xl text-xs font-medium py-2 px-4 w-full transition-colors"
              :class="
                activeHistoryTab === 'depositing'
                  ? 'bg-white/8 text-white'
                  : 'text-[#9CA3AF] hover:text-white/80'
              "
            >
              Depositing
            </button>
            <button
              @click="setActiveHistoryTab('withdrawal')"
              class="rounded-xl text-xs font-medium py-2 px-4 w-full transition-colors"
              :class="
                activeHistoryTab === 'withdrawal'
                  ? 'bg-white/8 text-white'
                  : 'text-[#9CA3AF] hover:text-white/80'
              "
            >
              Withdrawal
            </button>
            <button
              @click="setActiveHistoryTab('referrals')"
              class="rounded-xl text-xs font-medium py-2 px-4 w-full transition-colors"
              :class="
                activeHistoryTab === 'referrals'
                  ? 'bg-white/8 text-white'
                  : 'text-[#9CA3AF] hover:text-white/80'
              "
            >
              Referrals
            </button>
          </div>
        </div>

        <!-- Таблица Depositing -->
        <HistoryTable
          v-if="activeHistoryTab === 'depositing'"
          :columns="depositingColumns"
          :data="depositingData"
          status="depositing"
          container-bg
        />

        <!-- Таблица Withdrawal -->
        <HistoryTable
          v-if="activeHistoryTab === 'withdrawal'"
          :columns="withdrawalColumns"
          :data="withdrawalData"
          status="withdrawal"
        />

        <!-- Таблица Referrals -->
        <HistoryTable
          v-if="activeHistoryTab === 'referrals'"
          :columns="referralsColumns"
          :data="referralsData"
          status="referrals"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.dropdown-enter-active {
  transition: all 0.2s ease-out;
}

.dropdown-leave-active {
  transition: all 0.15s ease-in;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
