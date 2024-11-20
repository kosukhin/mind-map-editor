import i18n from '@/plugins/i18n';
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';

createApp(App)
  .use(i18n)
  .mount('#app');
