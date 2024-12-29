import i18n from '@/plugins/i18n';
import { createApp } from 'vue';
import { registerServiceWorker } from '@/registerServiceWorker';
import App from './App.vue';

createApp(App)
  .use(i18n)
  .mount('#app');

registerServiceWorker();
