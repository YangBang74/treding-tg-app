<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import Icons from '@/components/shared/Icons.vue'
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'

export interface ChartSeries {
  name: string
  data: number[]
}

export interface EntryPosition {
  label: string
  price: string
  amount: string
  color: string
}

export interface TerminalCardData {
  logo: string
  name: string
  priceChange: string
  priceChangeColor?: string
  percentage: string
  entryPositions: EntryPosition[]
  chartSeries: ChartSeries[]
  chartCategories: number[]
  periods?: string[]
  timestamps: {
    label: string
    value: string
  }[]
  amount?: string
  total?: string
  buyIndex?: number
  sellIndex?: number
}

interface Props {
  data: TerminalCardData
  buyIndex?: number
  sellIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    logo: '',
    name: '',
    priceChange: '',
    priceChangeColor: '#22C55E',
    percentage: '',
    entryPositions: [],
    chartSeries: [],
    chartCategories: [],
    periods: ['1D', '1W', '1M', '1Y'],
    timestamps: [],
    amount: '',
    total: '',
  }),
  buyIndex: undefined,
  sellIndex: undefined,
})

const selectedPeriod = ref(props.data.periods?.[3] || '1Y')
const periods = computed(() => props.data.periods || ['1D', '1W', '1M', '1Y'])
const selectedRightTab = ref<'timer' | 'quarter'>('timer')
const isChartVisible = ref(false)

// Индексы для BUY и SELL точек - приоритет у пропсов, затем у data, затем дефолтные значения
const buyIndexValue = computed(() => {
  if (props.buyIndex !== undefined) {
    return props.buyIndex
  }
  if (props.data.buyIndex !== undefined) {
    return props.data.buyIndex
  }
  return 0
})

const sellIndexValue = computed(() => {
  if (props.sellIndex !== undefined) {
    return props.sellIndex
  }
  if (props.data.sellIndex !== undefined) {
    return props.data.sellIndex
  }
  return props.data.chartCategories.length > 1 ? props.data.chartCategories.length - 1 : 0
})

// Chart options
const chartOptions = computed(
  (): ApexOptions => ({
    chart: {
      type: 'line',
      height: '100%',
      width: '100%',
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
    },
    colors: ['#AD00FF'],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      strokeDashArray: 1,
      xaxis: {
        lines: { show: true },
      },
      yaxis: {
        lines: { show: true },
      },
    },
    xaxis: {
      labels: { show: false },
      categories: props.data.chartCategories,
    },
    yaxis: {
      labels: { show: false },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false, // Отключаем tooltip при наведении
    },
  }),
)

const chartData = computed(() => {
  // Берем только последний (фиолетовый) график из серий
  const purpleSeries =
    props.data.chartSeries.length > 1
      ? [props.data.chartSeries[props.data.chartSeries.length - 1]]
      : props.data.chartSeries.length > 0
        ? [props.data.chartSeries[0]]
        : []

  const seriesData = purpleSeries[0]?.data || []
  const categories = props.data.chartCategories

  // Получаем значения для BUY и SELL точек
  const buyValue = seriesData[buyIndexValue.value] || 0
  const sellValue = seriesData[sellIndexValue.value] || 0

  return {
    series: purpleSeries,
    chartOptions: {
      ...chartOptions.value,
      xaxis: {
        ...chartOptions.value.xaxis,
        categories: props.data.chartCategories,
      },
      markers: {
        size: 0,
        hover: {
          size: 0, // Отключаем маркеры при наведении
        },
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: buyIndexValue.value,
            fillColor: '#AD00FF',
            strokeColor: '#AD00FF',
            size: 6,
          },
          {
            seriesIndex: 0,
            dataPointIndex: sellIndexValue.value,
            fillColor: '#22C55E',
            strokeColor: '#22C55E',
            size: 6,
          },
        ],
      },
      // annotations: {
      //   points: [
      //     {
      //       x:
      //         categories[buyIndexValue.value] !== undefined
      //           ? categories[buyIndexValue.value]
      //           : buyIndexValue.value,
      //       y: buyValue,
      //       yAxisIndex: 0,
      //       xAxisIndex: 0,
      //       marker: {
      //         size: 0, // Скрываем стандартный маркер аннотации
      //       },
      //       label: {
      //         text: 'BUY',
      //         style: {
      //           color: '#ffffff',
      //           fontSize: '14px',
      //           fontWeight: 400,
      //           background: '#3D346E',
      //           padding: {
      //             left: 5,
      //             right: 5,
      //             top: 2.5,
      //             bottom: 2.5,
      //           },
      //           borderRadius: '4px',
      //         },
      //         offsetY: -20,
      //         offsetX: 0,
      //         textAnchor: 'middle',
      //       },
      //     },
      //     {
      //       x:
      //         categories[sellIndexValue.value] !== undefined
      //           ? categories[sellIndexValue.value]
      //           : sellIndexValue.value,
      //       y: sellValue,
      //       yAxisIndex: 0,
      //       xAxisIndex: 0,
      //       marker: {
      //         size: 0,
      //       },
      //       label: {
      //         text: 'SELL',
      //         style: {
      //           color: '#ffffff',
      //           fontSize: '14px',
      //           fontWeight: 400,
      //           background: '#3D346E',
      //           padding: {
      //             left: 5,
      //             right: 5,
      //             top: 2.5,
      //             bottom: 2.5,
      //           },
      //           borderRadius: '4px',
      //         },
      //         offsetY: -20,
      //         offsetX: 0,
      //         textAnchor: 'middle',
      //       },
      //     },
      //   ],
      // },
    },
  }
})

</script>

<template>
  <div class="bg-white/4 p-5 rounded-[1.25rem] space-y-2.5 transition-all duration-300 ease-in-out">
    <div @click="isChartVisible = !isChartVisible" class="space-y-2.5">
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
          <img :src="data.logo" :alt="data.name" class="w-12 h-12" />
          <div class="font-medium">
            <h3 class="text-lg">{{ data.name }}</h3>
            <div class="flex items-center gap-2.5">
              <p
                :class="data.priceChangeColor || '#22C55E'"
                :style="{ color: data.priceChangeColor || '#22C55E' }"
              >
                {{ data.priceChange }}
              </p>
              <button class="border border-white/40 py-1.25 px-2.75 rounded-[2.5rem]">
                <Icons name="checks" :size="12" />
              </button>
            </div>
          </div>
        </div>
        <button class="flex items-center gap-2.5">
          <p class="text-lg font-medium">{{ data.percentage }}</p>
          <div
            class="bg-white/8 w-5 h-5 flex items-center justify-center rounded-full transition-transform"
            :class="{ 'rotate-180': isChartVisible }"
          >
            <Icons name="arrow-down-lil" :size="7" />
          </div>
        </button>
      </div>
      <div class="bg-white/4 rounded-xl py-3 px-4 flex justify-between">
        <div v-for="(position, index) in data.entryPositions" :key="index" class="w-1/2">
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: position.color }" />
            <p class="text-xs font-medium" :style="{ color: position.color }">
              {{ position.label }}
            </p>
          </div>
          <p class="text-lg font-medium">{{ position.price }}</p>
          <p class="text-[#9CA3AF] text-xs">{{ position.amount }}</p>
        </div>
      </div>
    </div>
    <Transition name="slide-fade">
      <div v-if="isChartVisible" class="flex items-center justify-between">
        <div class="flex items-center gap-2 bg-white/4 rounded-[0.9375rem] p-1.25">
          <button
            v-for="period in periods"
            :key="period"
            @click="selectedPeriod = period"
            :class="[
              'w-7.5 h-7.5 rounded-lg text-sm font-medium transition-colors',
              selectedPeriod === period
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white/80',
            ]"
          >
            {{ period }}
          </button>
        </div>
        <div class="flex items-center gap-2 bg-white/4 rounded-[0.9375rem] p-1.25">
          <button
            @click="selectedRightTab = selectedRightTab === 'timer' ? 'quarter' : 'timer'"
            :class="[
              'flex items-center justify-center w-8.75 h-8.75 rounded-lg text-sm font-medium transition-colors border',
              selectedRightTab === 'timer'
                ? 'border-white text-white'
                : 'border-transparent text-white/60 hover:text-white/80',
            ]"
          >
            <Icons name="timer" :size="15" color="currentColor" />
          </button>
          <button
            @click="selectedRightTab = selectedRightTab === 'quarter' ? 'timer' : 'quarter'"
            :class="[
              'flex items-center justify-center w-8.75 h-8.75 rounded-lg text-sm font-medium transition-colors border',
              selectedRightTab === 'quarter'
                ? 'border-white text-white'
                : 'border-transparent text-white/60 hover:text-white/80',
            ]"
          >
            <Icons name="quarter" :size="15" color="currentColor" />
          </button>
        </div>
      </div>
    </Transition>
    <Transition name="slide-fade" appear>
      <div
        v-if="isChartVisible"
        class="relative w-full overflow-hidden p-0"
        style="margin-left: -1rem; margin-right: -1rem; width: calc(100% + 1.25rem)"
      >
        <VueApexCharts
          type="line"
          height="194"
          :options="chartData.chartOptions as ApexOptions"
          :series="chartData.series"
        />
      </div>
    </Transition>

    <div class="flex justify-between gap-2.5 font-medium">
      <div
        v-for="(timestamp, index) in data.timestamps"
        :key="index"
        class="bg-white/4 w-full py-2.5 px-4 rounded-xl text-sm"
      >
        <p class="text-[#9CA3AF] text-xs">{{ timestamp.label }}</p>
        <p>{{ timestamp.value }}</p>
      </div>
    </div>
    <Transition name="slide-fade">
      <div
        v-if="isChartVisible && (data.amount || data.total)"
        class="flex justify-between gap-2.5 font-medium"
      >
        <div v-if="data.amount" class="bg-white/4 w-full py-2.5 px-4 rounded-xl text-sm">
          <p class="text-[#9CA3AF] text-xs">Amount</p>
          <p>{{ data.amount }}</p>
        </div>
        <div v-if="data.total" class="bg-white/4 w-full py-2.5 px-4 rounded-xl text-sm">
          <p class="text-[#9CA3AF] text-xs">Total</p>
          <p>{{ data.total }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Slide and fade animation */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.25s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Stagger animation for chart controls */
.slide-fade-enter-active:nth-child(1) {
  transition-delay: 0.05s;
}

.slide-fade-enter-active:nth-child(2) {
  transition-delay: 0.1s;
}

.slide-fade-enter-active:nth-child(3) {
  transition-delay: 0.15s;
}

/* Smooth transition for parent block */
.bg-white\/4 {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
