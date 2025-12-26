<script setup lang="ts">
import Dialog from '@/components/shared/Dialog.vue'
import { computed } from 'vue'

interface Props {
  open: boolean
  network?: string
  price?: string
  type?: 'deposit' | 'withdraw'
}

const props = withDefaults(defineProps<Props>(), {
  network: '',
  price: '',
  type: 'deposit',
})

const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'close'): void
}>()

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
})

const title = computed(() => {
  return props.type === 'deposit'
    ? 'You have successfully replenished your balance'
    : 'You have successfully withdrawn from your balance'
})

const label = computed(() => {
  return props.type === 'deposit' ? 'Deposit' : 'Withdraw'
})
</script>
<template>
  <Dialog v-model:open="isOpen">
    <template #default="{ close }">
      <div class="p-5 space-y-5">
        <h2 class="text-xl font-medium mt-10">{{ title }}</h2>
        <div class="bg-white/10 rounded-[1.25rem] py-2.5 px-4 flex items-center justify-between">
          <div class="font-medium space-y-1.25">
            <p class="text-sm text-[#9CA3AF]">Network</p>
            <p class="text-xl">{{ network }}</p>
          </div>
          <div class="font-medium space-y-1.25 text-right">
            <p class="text-sm text-[#9CA3AF]">{{ label }}</p>
            <p class="text-xl">{{ price }}</p>
          </div>
        </div>
        <button
          type="button"
          @click="close"
          class="bg-[#1E2939] border border-[#70A3F3] w-full py-2 rounded-[1.875rem] text-sm"
        >
          OK
        </button>
      </div>
    </template>
  </Dialog>
</template>
