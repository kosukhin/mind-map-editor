import { MapFile } from '@/entities/Map';
import { BrowserLaunchParams } from '@/modules/eo/v2/application/BrowserLaunchParams';
import { BrowserMapFile } from '@/modules/eo/v2/application/BrowserMapFile';
import { FileResponseFactory } from '@/modules/eo/v2/application/FileResponseFactory';
import { JSONString } from '@/modules/eo/v2/application/JSONString';
import { ConsoleLog } from '@/modules/eo/v2/system/ConsoleLog';
import { MemoryCache } from '@/modules/eo/v2/system/MemoryCache';
import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';
import { App } from 'vue';
import { PropertyPath } from '../modules/eo/v2/system/PropertyPath';

const log = new ConsoleLog(new OptionalSync(true));

const editor = {
  log,
  optionalMapFile: new BrowserMapFile(
    new PropertyPath('files[0]', new BrowserLaunchParams()),
    new MemoryCache<FileSystemFileHandle, MapFile>(log),
    new JSONString(),
    log,
    new FileResponseFactory(),
  ),
};

export const useEditor = () => editor;

export default {
  install: (app: App<unknown>) => {
    app.provide('editor', editor);
  },
};
