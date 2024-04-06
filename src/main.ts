import '@/assets/main.scss';
import { useOpenFile } from '@/composables/useOpenFile';
import i18n from '@/plugins/i18n';
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

const { openedFile } = useOpenFile();
if ('launchQueue' in window) {
  (window as any).launchQueue.setConsumer((launchParams: any) => {
    if (launchParams.files && launchParams.files.length) {
      const [file] = launchParams.files;
      openedFile.value = file;
    }
  });
}

createApp(App).use(router).use(i18n)
  .mount('#app');
