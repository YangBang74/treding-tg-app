<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'TaskCard',
})

interface Props {
  avatar: string
  title: string
  description: string
  current: number
  target: number
  reward: string
}

const props = defineProps<Props>()

const progress = computed(() => {
  if (props.target === 0) return 0
  return Math.min((props.current / props.target) * 100, 100)
})

const isCompleted = computed(() => props.current >= props.target)

const progressText = computed(() => {
  if (isCompleted.value) {
    return 'Done'
  }
  return `${props.current}/${props.target}`
})
</script>

<template>
  <div class="bg-linear-to-b from-black/20 to-white/10 rounded-[0.875rem] p-4 space-y-3">
    <!-- Header: Avatar, Title, Status -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img :src="avatar" :alt="title" class="w-10.75 h-10.75 rounded-full object-cover" />
        <div>
          <h3 class="text-base font-medium text-white">{{ title }}</h3>
          <p class="text-xs text-[#9CA3AF] font-medium">{{ description }}</p>
        </div>
      </div>
      <div
        class="bg-[#22C55E]/10 text-[#22C55E] text-xs font-medium px-3 py-1.5 rounded-[1.875rem]"
      >
        {{ progressText }}
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="space-y-1.5">
      <div class="w-full h-1.25 bg-white/8 rounded-full overflow-hidden">
        <div
          class="h-full bg-[#22C55E] transition-all duration-300 rounded-full"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <!-- Footer: Reward and Percentage -->
      <div class="flex items-center justify-between">
        <p class="text-xs font-medium text-white">{{ reward }}</p>
        <p class="text-xs font-medium text-white">{{ progress.toFixed(2) }}%</p>
      </div>
    </div>
  </div>
</template>
