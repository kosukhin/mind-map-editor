import { defineI18nConfig } from '#i18n'
import en from '~/locales/en.ts'
import ru from '~/locales/ru.ts'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',
  messages: {
    en,
    ru,
  },
}))
