<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import { defineOptions, onBeforeUnmount, watch } from 'vue'

defineOptions({ name: 'AppDialog' })

const isOpen = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{
  (event: 'close'): void
}>()

const close = () => {
  isOpen.value = false
  emit('close')
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
}

watch(
  isOpen,
  (value) => {
    if (value) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center px-6">
        <button
          class="absolute inset-0 bg-black/60 backdrop-blur-[0.25rem]"
          type="button"
          aria-label="Закрыть"
          @click="close"
        />

        <div
          class="relative w-full max-w-[20.8125rem] rounded-3xl bg-[#090D14] p-3 text-white shadow-2xl transition z-100000"
          @click.stop
        >
          <button
            class="absolute right-7 top-7 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-white/8 text-lg font-medium text-white transition hover:bg-black/10 hover:text-black"
            type="button"
            aria-label="Закрыть"
            @click="close"
          >
            <Icons name="x" :size="14" />
          </button>

          <slot :close="close" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .transition,
.dialog-leave-to .transition {
  transform: scale(0.95) translateY(8px);
}
</style>
