<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import { RouterLink } from 'vue-router'

defineOptions({
  name: 'EventBlock',
})

interface Props {
  title: string
  status: 'active' | 'inactive'
  description: string
  image: string
  buttonText?: string
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: 'Read More',
})

const statusConfig = {
  active: {
    bg: 'bg-[#22C55E]/10',
    text: 'text-[#22C55E]',
    label: 'Active',
    dotColor: '#22C55E',
  },
  inactive: {
    bg: 'bg-[#9CA3AF]/10',
    text: 'text-[#9CA3AF]',
    label: 'Inactive',
    dotColor: '#9CA3AF',
  },
}

const currentStatus = statusConfig[props.status]
</script>

<template>
  <div class="bg-linear-to-b from-black/20 to-white/10 rounded-[0.875rem] p-5">
    <div class="flex items-center justify-between">
      <p class="text-xl font-medium">{{ title }}</p>
      <div class="flex items-center gap-2">
        <div
          :class="[
            currentStatus.bg,
            currentStatus.text,
            'py-2 h-9 text-xs gap-1.25 flex items-center px-3.5 rounded-[1.875rem]',
          ]"
        >
          <Icons name="dot" :size="12" :color="currentStatus.dotColor" />
          {{ currentStatus.label }}
        </div>
        <div class="bg-white/4 w-9 h-9 flex items-center justify-center rounded-full">
          <Icons name="s" :size="8" color="#9CA3AF" />
        </div>
      </div>
    </div>
    <p class="text-sm text-[#9CA3AF] font-medium max-w-63.75 mt-1.25 mb-2.5">
      {{ description }}
    </p>
    <img
      :src="image"
      :alt="title"
      class="w-full h-full object-cover rounded-[0.875rem] aspect-video"
    />
    <RouterLink
      :to="{ name: 'event-id', params: { id: 1 } }"
      class="text-sm block text-center font-medium bg-[#4E80EE] border border-[#70A3F3] w-full py-2.5 rounded-[1.875rem] mt-2.5"
    >
      {{ buttonText }}
    </RouterLink>
  </div>
</template>
