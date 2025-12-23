<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import Icons from '@/components/shared/Icons.vue'
import { i18n, type AppLocale, setI18nLanguage } from '@/plugins/i18n'

const isLangOpen = ref(false)
const currentLocale = ref<AppLocale>(i18n.global.locale.value as AppLocale)
const locales: AppLocale[] = ['en', 'ru']

const currentLocaleLabel = computed(() => currentLocale.value.toUpperCase())

const toggleLangDropdown = () => {
  isLangOpen.value = !isLangOpen.value
  console.log(isLangOpen.value)
}

const changeLocale = (locale: AppLocale) => {
  if (locale === currentLocale.value) {
    isLangOpen.value = false
    return
  }

  currentLocale.value = locale
  setI18nLanguage(locale)
  isLangOpen.value = false
}
</script>

<template>
  <header class="flex items-center font-medium justify-between px-4 py-3 z-1000">
    <div
      class="flex items-center gap-2 text-sm py-2.5 px-3.5 rounded-[1.875rem] bg-white/4 border border-white/8"
    >
      <Icons name="database" :size="12" />
      $1112.00
    </div>

    <div class="relative">
      <button
        type="button"
        class="flex items-center gap-3 py-2.5 px-3.5 text-sm rounded-[1.875rem] bg-white/4 border border-white/8 cursor-pointer"
        @click.stop.prevent="toggleLangDropdown()"
      >
        {{ currentLocaleLabel }}
        <Icons name="arrow-down" :size="10" />
      </button>

      <div
        v-if="isLangOpen"
        class="absolute right-0 mt-2 w-24 overflow-hidden rounded-xl bg-[#05050C] border border-white/10 shadow-lg py-1 text-sm"
      >
        <button
          v-for="locale in locales"
          :key="locale"
          type="button"
          class="flex w-full items-center justify-between px-3 py-1.5 hover:bg-white/5"
          :class="{
            'text-white': currentLocale === locale,
            'text-white/80': currentLocale !== locale,
          }"
          @click="changeLocale(locale)"
        >
          <span>{{ locale.toUpperCase() }}</span>
          <span v-if="currentLocale === locale" class="w-1.5 h-1.5 rounded-full bg-[#4E80EE]" />
        </button>
      </div>
    </div>
  </header>
</template>
