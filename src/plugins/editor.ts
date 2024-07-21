import { MapFile, MapStructure } from '@/entities/Map';
import { BrowserLaunchParams } from '@/modules/eo/v2/application/BrowserLaunchParams';
import { BrowserMapFile } from '@/modules/eo/v2/application/BrowserMapFile';
import { FileResponseFactory } from '@/modules/eo/v2/application/FileResponseFactory';
import { JSONString } from '@/modules/eo/v2/application/JSONString';
import { ConsoleLog } from '@/modules/eo/v2/system/ConsoleLog';
import { MemoryCache } from '@/modules/eo/v2/system/MemoryCache';
import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';
import { App } from 'vue';
import { ValueCached } from '@/modules/eo/v2/system/ValueCached';
import { PropertyPath } from '@/modules/eo/v2/system/PropertyPath';
import { ValueMutable } from '@/modules/eo/v2/system/ValueMutable';

// TOOD Композиция всей программы будет здесь!
// Будут созданые Observable к которым можно подписаться и
// Таким образом будет связана вся система.

const log = new ConsoleLog(new OptionalSync(true));
const map = new ValueMutable<MapStructure | null>(null);

const editor = {
  log,
  mapFile: new BrowserMapFile(
    new ValueCached(new PropertyPath('files[0]', new BrowserLaunchParams())),
    new MemoryCache<FileSystemFileHandle, MapFile>(log),
    new JSONString(),
    log,
    new FileResponseFactory(),
  ),
  map,
};

export const useEditor = () => editor;

export default {
  install: (app: App<unknown>) => {
    app.provide('editor', editor);
  },
};
