import { BrowserLaunchQueue } from '@/modules/eo/BrowserLaunchQueue';
import { Editor } from '@/modules/eo/Editor';
import { FileFromFS } from '@/modules/eo/FileFromFS';
import { FileOpened } from '@/modules/eo/FileOpened';
import { TruthyAsyncOptional } from '@/modules/eo/TruthyAsyncOptional';
import { App, inject } from 'vue';

export const useEditor = () => {
  const editor = inject<TruthyAsyncOptional<Editor | null>>('editor');

  return editor ?? new TruthyAsyncOptional(Promise.resolve(null));
};

export default {
  install: (app: App<unknown>) => {
    app.provide('editor', new FileFromFS(new BrowserLaunchQueue())
      .fileHandler()
      .chainFilled((file) => new Editor(new FileOpened(file))));
  },
};
