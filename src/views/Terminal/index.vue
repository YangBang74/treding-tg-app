<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import TerminalCard, { type TerminalCardData } from './ui/TerminalCard.vue'

// Generate sample chart data
const generateChartData = () => {
  const categories: number[] = []
  const supplyData: number[] = []
  const borrowData: number[] = []

  for (let i = 0; i < 12; i++) {
    categories.push(i)
    const baseSupply = 15 + Math.sin(i / 5) * 10 + Math.random() * 5
    const baseBorrow = baseSupply + 2 + Math.random() * 3
    supplyData.push(Math.max(1.61, Math.min(29.38, baseSupply)))
    borrowData.push(Math.max(3.55, Math.min(33, baseBorrow)))
  }

  return {
    categories,
    supply: supplyData,
    borrow: borrowData,
  }
}

// Sample data for terminal cards
const terminalCards = ref<TerminalCardData[]>([
  {
    logo: '/src/assets/images/power.png',
    name: 'ETH',
    priceChange: '+$58 USDT',
    priceChangeColor: '#22C55E',
    percentage: '0.23%',
    entryPositions: [
      {
        label: 'Entry position',
        price: '$3,019.12',
        amount: '1 ETH',
        color: '#3B82F6',
      },
      {
        label: 'Entry position',
        price: '$3,079.21',
        amount: '1 ETH',
        color: '#AD00FF',
      },
    ],
    chartSeries: [
      {
        name: 'Supply',
        data: generateChartData().supply,
      },
      {
        name: 'Borrow',
        data: generateChartData().borrow,
      },
    ],
    chartCategories: generateChartData().categories,
    periods: ['1D', '1W', '1M', '1Y'],
    timestamps: [
      { label: 'Entry position', value: '12:23:54' },
      { label: 'Entry position', value: '13:01:22' },
    ],
    amount: '$51,860.12',
    total: '10$',
  },
  {
    logo: '/src/assets/images/eth.png',
    name: 'weETH',
    priceChange: '+$58 USDT',
    priceChangeColor: '#22C55E',
    percentage: '0.23%',
    entryPositions: [
      {
        label: 'Entry position',
        price: '$3,019.12',
        amount: '1 ETH',
        color: '#3B82F6',
      },
      {
        label: 'Entry position',
        price: '$3,079.21',
        amount: '1 ETH',
        color: '#AD00FF',
      },
    ],
    chartSeries: [
      {
        name: 'Supply',
        data: generateChartData().supply,
      },
      {
        name: 'Borrow',
        data: generateChartData().borrow,
      },
    ],
    chartCategories: generateChartData().categories,
    periods: ['1D', '1W', '1M', '1Y'],
    timestamps: [
      { label: 'Entry position', value: '12:23:54' },
      { label: 'Entry position', value: '13:01:22' },
    ],
    amount: '$51,860.12',
    total: '10$',
  },
  {
    logo: '/src/assets/images/usde.png',
    name: 'sUSDe',
    priceChange: '+$58 USDT',
    priceChangeColor: '#22C55E',
    percentage: '0.23%',
    entryPositions: [
      {
        label: 'Entry position',
        price: '$3,019.12',
        amount: '1 ETH',
        color: '#3B82F6',
      },
      {
        label: 'Entry position',
        price: '$3,079.21',
        amount: '1 ETH',
        color: '#AD00FF',
      },
    ],
    chartSeries: [
      {
        name: 'Supply',
        data: generateChartData().supply,
      },
      {
        name: 'Borrow',
        data: generateChartData().borrow,
      },
    ],
    chartCategories: generateChartData().categories,
    periods: ['1D', '1W', '1M', '1Y'],
    timestamps: [
      { label: 'Entry position', value: '12:23:54' },
      { label: 'Entry position', value: '13:01:22' },
    ],
    amount: '$51,860.12',
    total: '10$',
  },
  // Можно добавить больше карточек здесь
])
</script>

<template>
  <section class="text-white p-4 space-y-5">
    <TerminalCard v-for="(card, index) in terminalCards" :key="index" :data="card" />
  </section>
</template>
