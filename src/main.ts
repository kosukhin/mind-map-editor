import { useOpenFile } from '@/composables/useOpenFile';
import i18n from '@/plugins/i18n';
import { createApp } from 'vue';
import { BrowserFsFile } from '@/modules/eo/BrowserFsFile';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import '@/assets/styles.scss';

new BrowserFsFile().fileHandler().then((optional) => {
  optional.filled((file) => {
    const { openedFile } = useOpenFile();
    openedFile.value = file;
  });
});

createApp(App).use(router).use(i18n)
  .mount('#app');
