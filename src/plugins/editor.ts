import { BrowserLaunchParams } from '@/modules/eo/v2/application/BrowserLaunchParams';
import { BrowserMapFile } from '@/modules/eo/v2/application/BrowserMapFile';
import { App } from 'vue';
import { MemoryCache } from '@/modules/eo/v2/system/MemoryCache';
import { JSONObjectFromString } from '@/modules/eo/v2/application/JSONObjectFromString';
import { MapFile } from '@/entities/Map';
import { PropertyPath } from '../modules/eo/v2/system/PropertyPath';

const editor = {
  optionalMapFile: new BrowserMapFile(
    new PropertyPath('files[0]', new BrowserLaunchParams()),
    new MemoryCache<FileSystemFileHandle, MapFile>(),
    new JSONObjectFromString(),
  ),
};

export const useEditor = () => editor;

export default {
  install: (app: App<unknown>) => {
    app.provide('editor', editor);
  },
};
