<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  text: string
  size?: number
}>()

const isTooltipVisible = ref(false)
</script>

<template>
  <div class="relative inline-block">
    <div
      @mouseenter="isTooltipVisible = true"
      @mouseleave="isTooltipVisible = false"
      class="cursor-help"
    >
      <svg
        :width="size ? size : 14"
        :height="size ? size : 14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.86274 13.7255C10.6529 13.7255 13.7255 10.6529 13.7255 6.86274C13.7255 3.07256 10.6529 0 6.86274 0C3.07256 0 0 3.07256 0 6.86274C0 10.6529 3.07256 13.7255 6.86274 13.7255Z"
          fill="white"
          fill-opacity="0.2"
        />
        <path
          d="M6.86169 9.60799V6.86292"
          stroke="white"
          stroke-width="1.64706"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.86169 4.1178H6.86864"
          stroke="white"
          stroke-width="1.64706"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <transition name="tooltip" appear>
      <div
        v-if="isTooltipVisible"
        class="tooltip-content absolute bottom-full left-1/2 mb-2 px-3 py-2 bg-[#2A323F] text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-lg pointer-events-none"
        style="transform: translateX(-50%)"
      >
        {{ text }}
        <div
          class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-[#2A323F] rotate-45"
        />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.tooltip-content {
  will-change: opacity, transform;
}

.tooltip-enter-active {
  transition:
    opacity 0.15s ease-out,
    transform 0.15s ease-out;
}

.tooltip-leave-active {
  transition:
    opacity 0.1s ease-in,
    transform 0.1s ease-in;
}

.tooltip-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(4px) scale(0.95) !important;
}

.tooltip-enter-to {
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1) !important;
}

.tooltip-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1) !important;
}

.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(4px) scale(0.95) !important;
}
</style>
