import {
  MapFile, MapObject, MapStructure, MapType,
} from '@/entities/Map';
import { BrowserLaunchParams } from '@/modules/eo/v2/application/BrowserLaunchParams';
import { BrowserMapFile } from '@/modules/eo/v2/application/BrowserMapFile';
import { FileResponseFactory } from '@/modules/eo/v2/application/FileResponseFactory';
import { JSONString } from '@/modules/eo/v2/application/JSONString';
import { MapObjectObserver } from '@/modules/eo/v2/application/MapObjectObserver';
import { MapObserver } from '@/modules/eo/v2/application/MapObserver';
import { MapTypeObserver } from '@/modules/eo/v2/application/MapTypeObserver';
import { ConsoleLog } from '@/modules/eo/v2/system/ConsoleLog';
import { MemoryCache } from '@/modules/eo/v2/system/MemoryCache';
import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';
import { PropertyPath } from '@/modules/eo/v2/system/PropertyPath';
import { ValueCached } from '@/modules/eo/v2/system/ValueCached';
import { ValueMutable } from '@/modules/eo/v2/system/ValueMutable';
import { App } from 'vue';

// TOOD Композиция всей программы будет здесь!
// Будут созданые Observable к которым можно подписаться и
// Таким образом будет связана вся система.

const isProduction = false;
const log = new ConsoleLog(new OptionalSync(!isProduction));

const mapFile = new BrowserMapFile(
  new ValueCached(new PropertyPath('files[0]', new BrowserLaunchParams())),
  new MemoryCache<FileSystemFileHandle, MapFile>(log),
  new JSONString(),
  log,
  new FileResponseFactory(),
);

const map = new ValueMutable<MapStructure | null>(null);
map.subscribe(new MapObserver(mapFile));
mapFile.value().filled((realMapFile) => {
  map.set(realMapFile.current);
});

const mapNewType = new ValueMutable<MapType | null>(null);
const mapEditType = new ValueMutable<MapType | null>(null);
const mapNewObject = new ValueMutable<MapObject | null>(null);
const mapEditObject = new ValueMutable<MapObject | null>(null);

const mapTypeObserver = new MapTypeObserver(map);
mapNewType.subscribe(mapTypeObserver);
mapEditType.subscribe(mapTypeObserver);

const mapObjectObserver = new MapObjectObserver(map);
mapNewObject.subscribe(mapObjectObserver);
mapEditObject.subscribe(mapObjectObserver);

const editor = {
  log,
  mapFile,
  map,
  mapNewType,
  mapEditType,
  mapNewObject,
  mapEditObject,
};

export const useEditor = () => editor;

export default {
  install: (app: App<unknown>) => {
    app.provide('editor', editor);
  },
};
