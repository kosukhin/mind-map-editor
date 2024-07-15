import { BrowserLaunchQueue } from '@/modules/eo/BrowserLaunchQueue';
import { Editor } from '@/modules/eo/Editor';
import { FileFromFS } from '@/modules/eo/FileFromFS';
import { FileOpened } from '@/modules/eo/FileOpened';
import { OptionalAsync } from '@/modules/eo/OptionalAsync';
import { App, inject } from 'vue';

export const useEditor = () => {
  const editor = inject<OptionalAsync<Editor | null>>('editor');

  return editor ?? new OptionalAsync(Promise.resolve(null));
};

export default {
  install: (app: App<unknown>) => {
    app.provide('editor', new FileFromFS(new BrowserLaunchQueue())
      .fileHandler()
      .chainFilled((file) => new Editor(new FileOpened(file))));
  },
};
