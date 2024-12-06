import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';

Promise.all([
  fetch('https://raw.githubusercontent.com/kosukhin/patron-scheme-editor/refs/heads/main/src/locales/ru.json').then((r) => r.json()),
  fetch('https://raw.githubusercontent.com/kosukhin/patron-scheme-editor/refs/heads/main/src/locales/en.json').then((r) => r.json()),
]).then(([ru, en]) => {
  createApp(App)
    .use(
      createI18n({
        legacy: false,
        locale: 'ru',
        fallbackLocale: 'ru',
        globalInjection: true,
        messages: {
          ru,
          en,
        },
      }),
    )
    .mount('#app');
});
