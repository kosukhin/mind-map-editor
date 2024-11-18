import { createI18n } from 'vue-i18n';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

export default createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'ru',
  globalInjection: true,
  messages: {
    ru,
    en,
  },
});
