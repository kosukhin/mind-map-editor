import i18n from '@/plugins/i18n';
import { registerServiceWorker } from '@/registerServiceWorker';
import { createApp } from 'vue/dist/vue.esm-bundler';
import App from './App.vue';

const app = createApp(App);
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-');

app.use(i18n)
  .mount('#app');

registerServiceWorker();
