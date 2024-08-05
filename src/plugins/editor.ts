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
import { KonvaEventObject } from 'konva/lib/Node';
import { App } from 'vue';
import {
  MapFile, MapObject, MapStructure, MapType,
} from '@/entities/Map';
om 'vue';

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

const layerDragend = new ValueMutable<KonvaEventObject<DragEvent> | null>(null);
const layerDragstart = new ValueMutable<KonvaEventObject<DragEvent> | null>(null);
const layerClick = new ValueMutable<KonvaEventObject<DragEvent> | null>(null);
const layerStageClick = new ValueMutable<KonvaEventObject<DragEvent> | null>(null);
const layerTap = new ValueMutable<KonvaEventObject<DragEvent> | null>(null);
const layerMouseenter = new ValueMutable<KonvaEventObject<DragEvent> | null>(null);
const layerMouseleave = new ValueMutable<KonvaEventObject<DragEvent> | null>(null);
const layerWheel = new ValueMutable<KonvaEventObject<DragEvent> | null>(null);
const layerDragmove = new ValueMutable<KonvaEventObject<DragEvent> | null>(null);

const editor = {
  log,
  mapFile,
  map,
  mapNewType,
  mapEditType,
  mapNewObject,
  mapEditObject,
  layerDragend,
  layerDragstart,
  layerClick,
  layerStageClick,
  layerTap,
  layerMouseenter,
  layerMouseleave,
  layerWheel,
  layerDragmove,
};

export const useEditor = () => editor;

export default {
  install: (app: App<unknown>) => {
    app.provide('editor', editor);
  },
};
