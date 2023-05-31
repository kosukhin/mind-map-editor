import { defineI18nConfig } from '#i18n'
import en from '~/locales/en.json'
import ru from '~/locales/ru.json'

export default defineI18nConfig(() => ({
  legacy: true,
  locale: 'ru',
  messages: {
    en,
    ru,
  },
}))
