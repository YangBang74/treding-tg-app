<script setup lang="ts">
import { computed } from 'vue'

export interface Column {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  render?: (value: unknown, item: Record<string, unknown>) => unknown
  cellClass?: string | ((value: unknown, item: Record<string, unknown>) => string)
  showStatusDot?: boolean
}

interface Props {
  columns: Column[]
  data: Record<string, unknown>[]
  headerBg?: boolean
  rowBg?: boolean
  containerBg?: boolean
  status?: 'depositing' | 'withdrawal' | 'referrals'
}

const props = withDefaults(defineProps<Props>(), {
  headerBg: false,
  rowBg: true,
  containerBg: true,
  status: undefined,
})

const gridCols = computed(() => `grid-cols-${props.columns.length}`)

const getStatusColor = (status: string) => {
  if (status === 'done') {
    return {
      dot: 'bg-[#22C55E]',
      text: 'text-[#22C55E]',
    }
  } else if (status === 'cancel') {
    return {
      dot: 'bg-[#DF3C2E]',
      text: 'text-[#DF3C2E]',
    }
  } else {
    return {
      dot: 'bg-[#3B82F6]',
      text: 'text-[#3B82F6]',
    }
  }
}

const renderCell = (column: Column, item: Record<string, unknown>) => {
  const value = item[column.key]

  if (column.render) {
    return column.render(value, item)
  }

  return value
}

const getCellClass = (column: Column, value: unknown, item: Record<string, unknown>) => {
  if (typeof column.cellClass === 'function') {
    return column.cellClass(value, item)
  }
  return column.cellClass || 'text-[0.625rem] font-medium text-white/70'
}
</script>

<template>
  <div :class="['space-y-2 rounded-[0.875rem] px-1', containerBg ? 'bg-white/4' : '']">
    <!-- Header -->
    <div
      :class="[
        `grid ${gridCols} gap-4 px-3 py-2 text-xs font-medium text-[#9CA3AF] mb-2`,
        headerBg ? 'bg-white/4' : '',
      ]"
    >
      <div
        v-for="column in columns"
        :key="column.key"
        class="text-[#6B7280] text-[0.625rem] mb-0 pt-2.5"
        :class="[
          column.align === 'right'
            ? 'text-right'
            : column.align === 'center'
              ? 'text-center'
              : 'text-left',
          props?.status === 'referrals' ? 'px-6' : '',
        ]"
      >
        {{ column.label }}
      </div>
    </div>

    <!-- Rows -->
    <div
      v-for="item in data"
      :key="String(item.id ?? '')"
      :class="[
        `grid ${gridCols} gap-4 pb-2 items-center border-t border-[#6B7280]/39 mx-px`,
        rowBg ? ' p-4' : ' p-4',
      ]"
    >
      <div
        v-for="column in columns"
        :key="column.key"
        class="text-[0.625rem] text-white/70 gap-1 justify-center"
        :class="[
          column.align === 'right'
            ? 'text-right'
            : column.align === 'center'
              ? 'text-center'
              : 'text-left',
          column.showStatusDot ? 'flex items-center gap-2 ' : '',
          !column.showStatusDot ? getCellClass(column, item[column.key], item) : '',
        ]"
      >
        <slot :name="`cell-${column.key}`" :value="item[column.key]" :item="item" :column="column">
          <template v-if="column.showStatusDot">
            <span
              class="w-1 h-1 rounded-full"
              :class="getStatusColor(String(item[column.key] ?? '')).dot"
            />
            <span
              class="text-[0.625rem] font-medium"
              :class="getStatusColor(String(item[column.key] ?? '')).text"
            >
              {{ item[column.key] }}
            </span>
          </template>
          <template v-else>
            <span :class="getCellClass(column, item[column.key], item)">
              {{ renderCell(column, item) }}
            </span>
          </template>
        </slot>
      </div>
    </div>
  </div>
</template>
