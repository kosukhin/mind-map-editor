import { MapFile } from '@/modules/application/l1/l2/l3/map/mapFile/MapFile';
import { FileSystemContent } from '@/modules/application/l1/fileSystem/FileSystemContent';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { MapCurrent } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrent';
import { MapSettings } from '@/modules/application/l1/l2/l3/map/mapSettings/MapSettings';
import { Notification } from '@/modules/application/l1/l2/visualisation/notification/Notification';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { MapObjectsVisible } from '@/modules/application/l1/l2/l3/visibleObjects/MapObjectsVisible';
import {
  MapObjectsRects,
} from '@/modules/application/l1/l2/visualisation/rects/MapObjectsRects';
import { MapObject } from '@/modules/application/l1/l2/l3/map/mapObject/MapObject';
import { MiniMap } from '@/modules/application/l1/l2/visualisation/miniMap/MiniMap';
import { useFactories } from '@/composables/useFactories';
import {
  MapObjectsArrows,
} from '@/modules/application/l1/l2/visualisation/arrows/MapObjectsArrows';
import { MapTypes } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypes';
import { MapObjectCurrent } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectCurrent';
import { MapTypeCurrent } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeCurrent';
import { MapObjectNew } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectNew';
import { MapObjectsLink } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectsLink';

const factories = useFactories();

const notification = new Notification(factories);
const mapFile = new MapFile(
  new FileSystemContent(
    new BrowserLaunchQueue(),
    notification,
    factories,
  ),
  factories,
);
const mapCurrent = new MapCurrent(mapFile, factories);
const mapObjectCurrent = new MapObjectCurrent(factories);
const mapTypeCurrent = new MapTypeCurrent(factories);
const mapSettings = new MapSettings(mapFile, mapCurrent, factories);
const canvas = new BrowserCanvas(factories);
const konvaLayer = new KonvaLayer(canvas, factories);
const mapObject = new MapObject(mapCurrent, mapFile, factories);
const mapObjectNew = new MapObjectNew(mapCurrent, mapObject, factories);
const mapType = new MapTypes(mapCurrent, mapFile, factories);
const mapObjectsVisible = new MapObjectsVisible(konvaLayer, canvas, mapCurrent, factories);
const mapRects = new MapObjectsRects(konvaLayer, mapObject, mapObjectCurrent, factories);
mapObjectsVisible.objects(mapRects);
mapObjectsVisible.objects(new MapObjectsArrows(konvaLayer, mapFile, factories));
const miniMap = new MiniMap(mapCurrent, konvaLayer, factories);
const mapObjectsLink = new MapObjectsLink(mapObjectCurrent, mapCurrent, mapObject, factories);

export const useApplication = () => ({
  mapFile,
  mapCurrent,
  mapSettings,
  mapObject,
  mapType,
  mapObjectsVisible,
  mapObjectCurrent,
  mapObjectNew,
  mapObjectsLink,
  mapTypeCurrent,
  mapRects,
  canvas,
  miniMap,
  notification,
});
