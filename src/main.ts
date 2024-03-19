import { createApp } from 'vue';
import i18n from '@/plugins/i18n';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import '@/assets/styles/global.scss';

createApp(App).use(router).use(i18n)
  .mount('#app');
