<script setup lang="ts">
import Dialog from '@/components/shared/Dialog.vue'
import Icons from '@/components/shared/Icons.vue'
import Info from '@/components/shared/Info.vue'
import { ref, computed } from 'vue'
import ghoImage from '@/assets/images/gho.png'
import smartImage from '@/assets/images/smart.png'
import powerImage from '@/assets/images/power.png'

interface Props {
  open: boolean
  title?: string
  yourAssets?: string
  roi?: string
  totalVolume?: string
  traders?: number
  balance?: string
  currency?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Stability',
  yourAssets: '$100.00',
  roi: 'up to 1%',
  totalVolume: '$34,214.22',
  traders: 112,
  balance: '$1112.21',
  currency: 'USDT',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
})

const isDeposit = ref(true)
const amount = ref('')

const productImage = computed(() => {
  const titleLower = props.title.toLowerCase()
  if (titleLower === 'stability') {
    return ghoImage
  } else if (titleLower === 'smart') {
    return smartImage
  } else if (titleLower === 'power') {
    return powerImage
  }
  return ghoImage
})

const titleColor = computed(() => {
  const titleLower = props.title.toLowerCase()
  if (titleLower === 'stability') {
    return '#43C761'
  } else if (titleLower === 'smart') {
    return '#3B82F6'
  } else if (titleLower === 'power') {
    return '#3B82F6'
  }
  return '#43C761'
})

const metrics = computed(() => [
  {
    label: 'Your Assets',
    value: props.yourAssets,
    alignRight: false,
    hasInfo: false,
    hasIcon: false,
  },
  {
    label: 'ROI',
    value: props.roi,
    alignRight: true,
    hasInfo: true,
    infoText: 'Return on Investment',
    hasIcon: false,
  },
  {
    label: 'Total volume',
    value: props.totalVolume,
    alignRight: false,
    hasInfo: true,
    infoText: 'Total volume',
    hasIcon: false,
  },
  {
    label: 'Traders',
    value: props.traders,
    alignRight: true,
    hasInfo: true,
    infoText: 'Traders',
    hasIcon: true,
    iconName: 'user',
  },
])

const handleClose = () => {
  isOpen.value = false
}

const setMaxAmount = () => {
  amount.value = props.balance.replace(/[^0-9.]/g, '')
}

const handleSubmit = () => {
  // Handle deposit/withdraw logic here
  console.log(isDeposit.value ? 'Deposit' : 'Withdraw', amount.value)
  handleClose()
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <div class="space-y-4 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="rounded-full flex items-center justify-center">
            <img :src="productImage" :alt="title" class="w-13.5 h-13.5 object-cover" />
          </div>
          <h2 class="text-xl font-semibold" :style="{ color: titleColor }">{{ title }}</h2>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="metric in metrics"
          :key="metric.label"
          :class="['flex flex-col', metric.alignRight ? 'items-end' : '']"
        >
          <div
            class="flex items-center gap-1.25 mb-1"
            :class="metric.alignRight ? 'justify-end' : ''"
          >
            <p class="text-sm text-[#9CA3AF]">{{ metric.label }}</p>
            <Info v-if="metric.hasInfo && metric.infoText" :text="metric.infoText" />
          </div>
          <div
            v-if="metric.hasIcon && metric.iconName"
            class="flex items-center gap-2"
            :class="metric.alignRight ? 'justify-end' : ''"
          >
            <Icons :name="metric.iconName" :size="12" class="text-[#4E80EE]" />
            <p class="text-xl font-medium text-white">{{ metric.value }}</p>
          </div>
          <p v-else class="text-xl font-medium text-white">{{ metric.value }}</p>
        </div>
      </div>

      <div class="flex max-w-44 gap-px mx-auto text-xs bg-white/4 rounded-full p-1">
        <button
          @click="isDeposit = true"
          :class="[
            'flex-1 py-2 px-4 rounded-full  font-medium transition-colors',
            isDeposit ? 'bg-white/10 text-white' : 'text-[#9CA3AF] hover:text-white',
          ]"
        >
          Deposit
        </button>
        <button
          @click="isDeposit = false"
          :class="[
            'flex-1 py-2 px-4 rounded-full  font-medium transition-colors',
            !isDeposit ? 'bg-white/10 text-white' : 'text-[#9CA3AF] hover:text-white',
          ]"
        >
          Withdraw
        </button>
      </div>

      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <p class="text-sm text-[#9CA3AF]">Your Balance</p>
          <div class="flex items-center gap-2">
            <span class="text-xs font-medium text-white">{{ balance }} {{ currency }}</span>
            <button
              @click="setMaxAmount"
              class="text-xs text-[#4E80EE] font-medium hover:text-[#70A3F3]"
            >
              MAX
            </button>
          </div>
        </div>
        <input
          v-model="amount"
          type="number"
          placeholder="$0.00"
          class="w-full bg-white/4 text-right border border-white/8 rounded-[1.25rem] px-4 py-3 text-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4E80EE] transition-colors"
        />
      </div>

      <button
        @click="handleSubmit"
        class="bg-[#4E80EE] border border-[#70A3F3] w-full text-sm font-medium py-3 px-4 rounded-full hover:bg-[#5A8AFF] transition-colors"
      >
        {{ isDeposit ? 'DEPOSIT' : 'WITHDRAW' }}
      </button>

      <div class="flex items-start gap-2 pt-2">
        <div class="mt-0.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.84313 15.6863C12.1748 15.6863 15.6863 12.1748 15.6863 7.84313C15.6863 3.51149 12.1748 0 7.84313 0C3.51149 0 0 3.51149 0 7.84313C0 12.1748 3.51149 15.6863 7.84313 15.6863Z"
              fill="#4E80EE"
              fill-opacity="0.2"
            />
            <path
              d="M7.84192 10.9805V7.84326"
              stroke="#4E80EE"
              stroke-width="1.88235"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.84192 4.70605H7.85036"
              stroke="#4E80EE"
              stroke-width="1.88235"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <p class="text-xs text-[#9CA3AF] font-light leading-5">
          Торговля на спотовом рынке с приоритетом сохранения капитала. Низкая волатильность и
          стабильная доходность до 1% в сутки.
        </p>
      </div>
    </div>
  </Dialog>
</template>

<style scoped></style>
