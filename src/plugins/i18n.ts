import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import ru from '@/locales/ru.json'

export const SUPPORT_LOCALES = ['ru', 'en'] as const
export type AppLocale = (typeof SUPPORT_LOCALES)[number]

export const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    en,
    ru,
  },
  globalInjection: true,
})

export function setI18nLanguage(locale: AppLocale) {
  i18n.global.locale.value = locale
  document.documentElement.setAttribute('lang', locale)
}
