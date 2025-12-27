<script setup lang="ts">
import { computed } from 'vue'
import Icons from './Icons.vue'

defineOptions({
  name: 'AppPagination',
})

interface Props {
  currentPage?: number
  totalPages?: number
  totalItems?: number
  itemsPerPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
})

const emit = defineEmits<{
  (event: 'update:currentPage', page: number): void
  (event: 'change', page: number): void
}>()

const isFirstPage = computed(() => props.currentPage === 1)
const isLastPage = computed(() => props.currentPage === props.totalPages)

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages || page === props.currentPage) return
  emit('update:currentPage', page)
  emit('change', page)
}

const goToFirst = () => goToPage(1)
const goToPrevious = () => goToPage(props.currentPage - 1)
const goToNext = () => goToPage(props.currentPage + 1)
const goToLast = () => goToPage(props.totalPages)

// Вычисляем какие страницы показывать
const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    // Если страниц мало, показываем все
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Всегда показываем первую страницу
    pages.push(1)

    if (current <= 3) {
      // Если мы в начале
      for (let i = 2; i <= 4; i++) {
        pages.push(i)
      }
    } else if (current >= total - 2) {
      for (let i = total - 3; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // Если мы в середине
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})
</script>

<template>
  <div class="flex items-center justify-between gap-2 mt-2.5 border-t pt-2.5 border-white/4">
    <!-- Кнопка "В начало" -->
    <button
      :disabled="isFirstPage"
      class="border bg-white/4 border-white/8 w-6 h-6 flex items-center justify-center rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/4"
      @click="goToFirst"
    >
      <Icons name="arrow-left-dub" :size="10" />
    </button>

    <!-- Кнопка "Назад" -->
    <button
      :disabled="isFirstPage"
      class="border bg-white/4 border-white/8 w-6 h-6 flex items-center justify-center rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/4"
      @click="goToPrevious"
    >
      <Icons name="arrow-right" :size="10" class="rotate-180" />
    </button>
    <button
      v-for="(page, index) in visiblePages"
      :key="index"
      :disabled="page === '...'"
      class="border border-white/8 min-w-7 h-6 px-2 flex items-center justify-center rounded-lg text-xs font-medium transition-colors disabled:cursor-default disabled:border-transparent hover:bg-[#4E80EE]"
      :class="
        page === currentPage
          ? 'bg-[#4E80EE] text-white border-[#70A3F3]'
          : 'bg-white/4 text-white/70'
      "
      @click="typeof page === 'number' && goToPage(page)"
    >
      {{ page }}
    </button>

    <!-- Кнопка "Вперед" -->
    <button
      :disabled="isLastPage"
      class="border bg-white/4 border-white/8 w-6 h-6 flex items-center justify-center rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/4"
      @click="goToNext"
    >
      <Icons name="arrow-right" :size="10" />
    </button>

    <!-- Кнопка "В конец" -->
    <button
      :disabled="isLastPage"
      class="border bg-white/4 border-white/8 w-6 h-6 flex items-center justify-center rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/4"
      @click="goToLast"
    >
      <Icons name="arrow-left-dub" :size="10" class="rotate-180" />
    </button>
  </div>
</template>
