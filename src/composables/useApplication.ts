import { MapFile } from '@/modules/application/l1/l2/l3/map/mapFile/MapFile';
import { FileSystemContent } from '@/modules/application/l1/fileSystem/FileSystemContent';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { MapCurrent } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrent';
import { MapSettings } from '@/modules/application/l1/l2/l3/map/mapSettings/MapSettings';
import { Notification } from '@/modules/application/l1/l2/visualisation/notification/Notification';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { MapObjectsVisible } from '@/modules/application/l1/l2/l3/visibleObjects/MapObjectsVisible';
import { MapObjectsRects } from '@/modules/application/l1/l2/visualisation/rects/MapObjectsRects';
import { MapObject } from '@/modules/application/l1/l2/l3/map/mapObject/MapObject';
import { MiniMap } from '@/modules/application/l1/l2/visualisation/miniMap/MiniMap';
import { useFactories } from '@/composables/useFactories';
import { MapObjectsArrows } from '@/modules/application/l1/l2/visualisation/arrows/MapObjectsArrows';
import { MapTypes } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypes';
import { MapObjectCurrent } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectCurrent';
import { MapTypeCurrent } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeCurrent';
import { MapObjectNew } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectNew';
import { MapObjectsLink } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectsLink';
import { MapFileForRendering } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileForRendering';
import { Modal } from '@/modules/application/l1/l2/visualisation/modal/Modal';
import { Drawer } from '@/modules/application/l1/l2/visualisation/drawer/Drawer';
import { MapTypeRemoved } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeRemoved';
import { MapTypeNew } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeNew';
import { MapTypeUsed } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeUsed';

const factories = useFactories();

const modal = new Modal(factories);
const drawer = new Drawer(factories);
const notification = new Notification(factories);

const mapFile = new MapFile(
  new FileSystemContent(
    new BrowserLaunchQueue(),
    notification,
    factories,
  ),
  factories,
);

const mapFileForRendering = new MapFileForRendering(mapFile, factories);
const mapForRendering = new MapCurrent(mapFileForRendering, factories);
const mapObjectForRendering = new MapObject(mapForRendering, mapFileForRendering, factories);

const mapCurrent = new MapCurrent(mapFile, factories);
const mapObjectCurrent = new MapObjectCurrent(drawer, factories);
const mapTypeCurrent = new MapTypeCurrent(factories);
const mapSettings = new MapSettings(mapFile, mapCurrent, factories);
const canvas = new BrowserCanvas(factories);
const konvaLayer = new KonvaLayer(canvas, factories);
const mapObject = new MapObject(mapCurrent, mapFile, factories);
const mapObjectNew = new MapObjectNew(mapCurrent, mapObject, factories);
const mapTypeUsed = new MapTypeUsed(mapFile, factories);
const mapType = new MapTypes(mapCurrent, mapFile, notification, mapTypeUsed, factories);
const mapTypeRemoved = new MapTypeRemoved(mapCurrent, mapFile, factories);
const mapTypeNew = new MapTypeNew(mapType);
const mapObjectsVisible = new MapObjectsVisible(konvaLayer, canvas, mapForRendering, factories);
const mapRects = new MapObjectsRects(konvaLayer, mapObject, mapObjectsVisible, mapObjectCurrent, mapObjectForRendering, factories);
const mapArrows = new MapObjectsArrows(konvaLayer, mapFile, mapForRendering, factories);
const miniMap = new MiniMap(mapForRendering, konvaLayer, factories);
const mapObjectsLink = new MapObjectsLink(mapObjectCurrent, mapCurrent, mapObject, factories);

const modules = {
  mapFile,
  mapCurrent,
  mapSettings,
  mapObject,
  mapType,
  mapTypeRemoved,
  mapTypeNew,
  mapObjectsVisible,
  mapObjectCurrent,
  mapObjectNew,
  mapObjectsLink,
  mapTypeCurrent,
  mapRects,
  mapObjectArrows: mapArrows,
  canvas,
  miniMap,
  notification,
  modal,
  drawer,
  konvaLayer,
};

export const useApplication = () => modules;
