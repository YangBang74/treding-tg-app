<script setup lang="ts">
import { ref } from 'vue'
import Icons from '@/components/shared/Icons.vue'
import Info from '@/components/shared/Info.vue'

type TabType = 'deposit' | 'withdraw'

const activeTab = ref<TabType>('deposit')

const setActiveTab = (tab: TabType) => {
  activeTab.value = tab
}
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
          <div class="bg-white/4 py-3 px-5 rounded-[2.5rem] font-medium">TON</div>
        </div>
      </div>
    </div>
  </section>
</template>
