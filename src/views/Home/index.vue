<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import Icons from '@/components/shared/Icons.vue'
import Info from '@/components/shared/Info.vue'
import DepositDialog from './ui/DepositDialog.vue'

const isDialogOpen = ref(false)
const selectedProduct = ref<{
  title: string
  yourAssets: string
  roi: string
  totalVolume: string
  traders: number
  balance: string
} | null>(null)

const openDialog = (product: {
  title: string
  yourAssets: string
  roi: string
  totalVolume: string
  traders: number
  balance: string
}) => {
  selectedProduct.value = product
  isDialogOpen.value = true
}

const faqItems = [
  {
    question: 'What is the Lending Protocol of Fluid?',
    answer:
      "The Lending Protocol is the 'Deposit and Earn' side of the Fluid protocol. Supply to the Fluid protocol through this simple UX and earn yield on your supplied asset in kind.",
  },
  {
    question: 'Why is this separate from borrowing?',
    answer:
      'The Lending Protocol is the deposit and earn side of the Fluid protocol. Supply to the Fluid protocol through this simple UX and earn yield on your supplied asset in kind.',
  },
  {
    question: 'Are there supply or withdraw limits?',
    answer:
      'The Lending Protocol is the deposit and earn side of the Fluid protocol. Supply to the Fluid protocol through this simple UX and earn yield on your supplied asset in kind.',
  },
  {
    question: 'What are the risks?',
    answer:
      'The Lending Protocol is the deposit and earn side of the Fluid protocol. Supply to the Fluid protocol through this simple UX and earn yield on your supplied asset in kind.',
  },
  {
    question: 'What are the fees for the Lending Protocol?',
    answer:
      'The Lending Protocol is the deposit and earn side of the Fluid protocol. Supply to the Fluid protocol through this simple UX and earn yield on your supplied asset in kind.',
  },
  {
    question: 'Are there additional rewards?',
    answer:
      'The Lending Protocol is the deposit and earn side of the Fluid protocol. Supply to the Fluid protocol through this simple UX and earn yield on your supplied asset in kind.',
  },
]

const openFaqIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  if (openFaqIndex.value === index) {
    openFaqIndex.value = null
  } else {
    openFaqIndex.value = index
  }
}
</script>

<template>
  <div class="text-white py-7.5 p-4 space-y-4">
    <div class="space-y-3.5 text-center">
      <div class="flex items-center gap-2.5 justify-center">
        <div class="bg-[#4E80EE] p-2.75 rounded-full">
          <Icons name="logo" />
        </div>
        <h1 class="text-2xl font-semibold inline-block">Dashboard</h1>
      </div>
      <span class="text-[#9CA3AF] text-sm"> The Best DeFi Yields In 1-Click </span>
    </div>
    <div class="bg-white/4 rounded-[1.875rem] p-4 space-y-3.5">
      <div class="bg-white/10 rounded-[1.25rem] p-4 py-2.5 flex items-center justify-between">
        <div>
          <p class="text-xs text-[#9CA3AF] leading-5 mb-1">Your balance</p>
          <p class="text-3xl font-semibold text-white leading-7.5 mb-px">$1112.00</p>
        </div>
        <button
          class="bg-[#4E80EE] border border-[#70A3F3] py-2 px-6.5 rounded-full flex items-center gap-2"
        >
          <Icons name="database" :size="16" />
          <span class="font-sm font-medium">Wallet</span>
        </button>
      </div>
      <div class="bg-black/20 rounded-[1.25rem] p-4 py-2.5 flex items-center justify-start gap-3">
        <div class="bg-[#22C55E]/20 w-10 h-10 flex items-center justify-center p-2.5 rounded-full">
          <Icons name="dollar" class="text-[#22C55E]" />
        </div>
        <div>
          <div class="flex items-center gap-1.25">
            <p class="text-xs text-[#9CA3AF] leading-5">Total Lendings</p>
            <Info text="Total Lendings" />
          </div>
          <p class="text-xl font-semibold text-white leading-7.5 mb-px">$586,268,741</p>
        </div>
      </div>
      <div class="bg-black/20 rounded-[1.25rem] p-4 py-2.5 flex items-center justify-start gap-3">
        <div class="bg-[#F4CE4A]/20 w-10 h-10 flex items-center justify-center p-2.5 rounded-full">
          <Icons name="users-i" class="text-[#F4CE4A]" :size="16" />
        </div>
        <div>
          <div class="flex items-center gap-1.25">
            <p class="text-xs text-[#9CA3AF] leading-5">Traders</p>
            <Info text="Total Lendings" />
          </div>
          <p class="text-xl font-semibold text-white leading-7.5 mb-px">155</p>
        </div>
      </div>
    </div>
    <div class="bg-linear-to-b from-[#43C761]/20 to-[#43C761]/10 rounded-[1.25rem] p-5">
      <div class="flex items-center justify-between">
        <div class="flex items-start flex-col justify-between">
          <p class="text-xl font-semibold text-[#43C761] leading-7.5">Stability</p>
          <p class="text-sm font-medium">$0.00</p>
        </div>
        <div class="flex items-end flex-col justify-between">
          <div class="flex gap-1 items-center text-s, font-medium text-[#43C761] leading-7.5">
            <svg
              width="7"
              height="6"
              viewBox="0 0 7 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.60885 0.6C4.11603 -0.2 2.88397 -0.2 2.39115 0.6L0.17345 4.2C-0.31937 5 0.29666 6 1.2823 6L5.7177 6C6.70335 6 7.31937 5 6.82655 4.2L4.60885 0.6Z"
                fill="#22C55E"
              />
            </svg>
            <p class="text-white">+$1.232 <span class="text-[#9CA3AF]">today</span></p>
          </div>
          <div class="flex gap-1 items-center text-sm font-medium text-[#DF3C2E]">
            <svg
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="4" height="4" rx="2" fill="#DF3C2E" />
            </svg>
            High risk
          </div>
        </div>
      </div>
      <div class="flex justify-center p-2.5 pb-10">
        <img src="@/assets/images/gho.png" alt="stability" class="w-25 h-25 object-cover" />
      </div>
      <div class="bg-white/4 rounded-[1.25rem]">
        <div
          class="flex py-3 px-3.5 border-b text-sm font-medium border-white/8 items-center justify-between"
        >
          <p class="text-[#9CA3AF]">Earnings 24h</p>
          <div class="flex items-center gap-3">$0 USDT <Info text="Earnings 24h" /></div>
        </div>
        <div class="flex py-3 px-3.5 text-sm font-medium items-center justify-between">
          <p class="text-[#9CA3AF]">Possible income</p>
          <div class="flex items-center gap-3">up to 1% <Info text="Earnings 24h" /></div>
        </div>
      </div>
      <button
        @click="
          openDialog({
            title: 'Stability',
            yourAssets: '$100.00',
            roi: 'up to 1%',
            totalVolume: '$34,214.22',
            traders: 112,
            balance: '$1112.21',
          })
        "
        class="bg-[#4E80EE] border border-[#70A3F3] w-full mt-5 block text-sm font-medium py-3 px-4 rounded-full"
      >
        START EARNING
      </button>
    </div>
    <div class="bg-linear-to-b from-[#3B82F6]/20 to-[#3B82F6]/10 rounded-[1.25rem] p-5">
      <div class="flex items-center justify-between">
        <div class="flex items-start flex-col justify-between">
          <p class="text-xl font-semibold text-[#3B82F6] leading-7.5">Smart</p>
          <p class="text-sm font-medium">$0.00</p>
        </div>
        <div class="flex items-end flex-col justify-between">
          <div class="flex gap-1 items-center text-s, font-medium text-[#43C761] leading-7.5">
            <svg
              width="7"
              height="6"
              viewBox="0 0 7 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.60885 5.4C4.11603 6.2 2.88397 6.2 2.39115 5.4L0.17345 1.8C-0.31937 1 0.29666 0 1.2823 0L5.7177 0C6.70335 0 7.31937 1 6.82655 1.8L4.60885 5.4Z"
                fill="#DF3C2E"
              />
            </svg>

            <p class="text-white">-$0.232 <span class="text-[#9CA3AF]">today</span></p>
          </div>
          <div class="flex gap-1 items-center text-sm font-medium text-[#E9B306]">
            <svg
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="4" height="4" rx="2" fill="#E9B306" />
            </svg>

            Average risk
          </div>
        </div>
      </div>
      <div class="flex justify-center p-2.5 pb-10">
        <img src="@/assets/images/smart.png" alt="stability" class="w-25 h-25 object-cover" />
      </div>
      <div class="bg-white/4 rounded-[1.25rem]">
        <div
          class="flex py-3 px-3.5 border-b text-sm font-medium border-white/8 items-center justify-between"
        >
          <p class="text-[#9CA3AF]">Earnings 24h</p>
          <div class="flex items-center gap-3">$0 USDT <Info text="Earnings 24h" /></div>
        </div>
        <div
          class="flex py-3 px-3.5 border-b text-sm border-white/8 font-medium items-center justify-between"
        >
          <p class="text-[#9CA3AF]">Possible income</p>
          <div class="flex items-center gap-3">up to 1% <Info text="Earnings 24h" /></div>
        </div>
        <div class="flex py-3 px-3.5 text-sm font-medium items-center justify-between">
          <p class="text-[#9CA3AF]">Possible risk</p>
          <div class="flex items-center gap-3">-20% month <Info text="Earnings 24h" /></div>
        </div>
      </div>
      <button
        @click="
          openDialog({
            title: 'Smart',
            yourAssets: '$100.00',
            roi: 'up to 1%',
            totalVolume: '$34,214.22',
            traders: 112,
            balance: '$1112.21',
          })
        "
        class="bg-[#4E80EE] border border-[#70A3F3] w-full mt-5 block text-sm font-medium py-3 px-4 rounded-full"
      >
        START EARNING
      </button>
    </div>
    <div class="bg-linear-to-b from-[#AD00FF]/20 to-[#AD00FF]/10 rounded-[1.25rem] p-5">
      <div class="flex items-center justify-between">
        <div class="flex items-start flex-col justify-between">
          <p class="text-xl font-semibold text-[#AD00FF] leading-7.5">Power</p>
          <p class="text-sm font-medium">$0.00</p>
        </div>
        <div class="flex items-end flex-col justify-between">
          <div class="flex gap-1 items-center text-s, font-medium text-[#43C761] leading-7.5">
            <svg
              width="7"
              height="6"
              viewBox="0 0 7 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.60885 0.6C4.11603 -0.2 2.88397 -0.2 2.39115 0.6L0.17345 4.2C-0.31937 5 0.29666 6 1.2823 6L5.7177 6C6.70335 6 7.31937 5 6.82655 4.2L4.60885 0.6Z"
                fill="#22C55E"
              />
            </svg>
            <p class="text-white">+$1.232 <span class="text-[#9CA3AF]">today</span></p>
          </div>
          <div class="flex gap-1 items-center text-sm font-medium text-[#22C55E]">
            <svg
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="4" height="4" rx="2" fill="#22C55E" />
            </svg>
            No risk
          </div>
        </div>
      </div>
      <div class="flex justify-center p-2.5 pb-10">
        <img src="@/assets/images/power.png" alt="stability" class="w-25 h-25 object-cover" />
      </div>
      <div class="bg-white/4 rounded-[1.25rem]">
        <div
          class="flex py-3 px-3.5 border-b text-sm font-medium border-white/8 items-center justify-between"
        >
          <p class="text-[#9CA3AF]">Earnings 24h</p>
          <div class="flex items-center gap-3">$0 USDT <Info text="Earnings 24h" /></div>
        </div>
        <div
          class="flex py-3 px-3.5 border-b text-sm border-white/8 font-medium items-center justify-between"
        >
          <p class="text-[#9CA3AF]">Possible income</p>
          <div class="flex items-center gap-3">up to 1% <Info text="Earnings 24h" /></div>
        </div>
        <div class="flex py-3 px-3.5 text-sm font-medium items-center justify-between">
          <p class="text-[#9CA3AF]">Possible risk</p>
          <div class="flex items-center gap-3">-20% month <Info text="Earnings 24h" /></div>
        </div>
      </div>
      <button
        @click="
          openDialog({
            title: 'Power',
            yourAssets: '$100.00',
            roi: 'up to 1%',
            totalVolume: '$34,214.22',
            traders: 112,
            balance: '$1112.21',
          })
        "
        class="bg-[#4E80EE] border border-[#70A3F3] w-full mt-5 block text-sm font-medium py-3 px-4 rounded-full"
      >
        START EARNING
      </button>
    </div>
    <div class="bg-white text-[#111827] p-5 rounded-[1.25rem]">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-4">
          <Icons name="lite" />
          <p class="text-3xl font-medium">Lite</p>
        </div>
        <Icons name="arrow-right" :size="16" />
      </div>
      <div class="space-y-3.5">
        <div class="flex items-start gap-2">
          <Icons name="check" class="text-[#22C55E]" />
          <p class="text-sm font-medium">Longest running stETH Strategy</p>
        </div>
        <div class="flex items-start gap-2">
          <Icons name="check" class="text-[#22C55E] mt-1" />
          <p class="text-sm font-medium flex-1">
            Diversified with popular DeFi lending Protocols including Fluid, AAVE, Spark And
            Compound
          </p>
        </div>
        <div class="flex items-start gap-2">
          <Icons name="check" class="text-[#22C55E]" />
          <p class="text-sm font-medium">Earn +1.5x on your stETH earnings</p>
        </div>
      </div>
    </div>
    <div class="text-center">
      <h1 class="text-[2.5rem] font-semibold">FAQS</h1>
      <span class="text-[#9CA3AF] text-sm">
        Here you can find all the frequently asked questions!
      </span>
      <div class="bg-white/4 space-y-2.5 py-4 px-3.5 text-left rounded-[2.5rem] mt-7.5">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="cursor-pointer"
          @click="toggleFaq(index)"
        >
          <div class="p-5 rounded-[1.25rem]" :class="{ 'bg-white/5': openFaqIndex === index }">
            <div class="flex items-center justify-between gap-2">
              <p class="text-xl font-medium">{{ item.question }}</p>
              <button
                class="w-7.5 h-7.5 aspect-square flex items-center justify-center bg-[#1E2939] rounded-full hover:bg-[#1E2939]/80 transition-colors delay-100"
                :class="{ 'rotate-45 bg-[#5072E6] hover:bg-[#5072E6]/80': openFaqIndex === index }"
                @click.stop="toggleFaq(index)"
              >
                <Icons name="plus" :size="12" class="text-white transition" />
              </button>
            </div>
            <transition name="faq">
              <div v-if="openFaqIndex === index" class="mt-4">
                <p class="text-[#9CA3AF] text-sm leading-6">
                  {{ item.answer }}
                </p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DepositDialog
    v-if="selectedProduct"
    v-model:open="isDialogOpen"
    :title="selectedProduct.title"
    :your-assets="selectedProduct.yourAssets"
    :roi="selectedProduct.roi"
    :total-volume="selectedProduct.totalVolume"
    :traders="selectedProduct.traders"
    :balance="selectedProduct.balance"
  />
</template>

<style scoped>
.faq-enter-active {
  transition: all 0.3s ease-out;
}

.faq-leave-active {
  transition: all 0.2s ease-in;
}

.faq-enter-from {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.faq-enter-to {
  opacity: 1;
  transform: translateY(0);
  max-height: 200px;
}

.faq-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 200px;
}

.faq-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}
</style>
