import { MapFileOfContent } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileOfContent';
import { FileSystemContent } from '@/modules/application/l1/fileSystem/FileSystemContent';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { MapCurrent } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrent';
import { MapSettingsGuest } from '@/modules/application/l1/l2/l3/map/mapSettings/MapSettingsGuest';
import { Notification } from '@/modules/application/l1/l2/visualisation/notification/Notification';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { MapObjectsVisible } from '@/modules/application/l1/l2/l3/visibleObjects/MapObjectsVisible';
import { MapObjectsRectsPatron } from '@/modules/application/l1/l2/visualisation/rects/MapObjectsRectsPatron';
import { MapObjectGuest } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectGuest';
import { MiniMap } from '@/modules/application/l1/l2/visualisation/miniMap/MiniMap';
import { Instance } from '@/modules/system/guest/Instance';
import { SystemFileFromHandler } from '@/modules/system/file/SystemFileFromHandler';
import { BrowserFileSaved } from '@/modules/integration/browser/file/BrowserFileSaved';
import { Cache } from '@/modules/system/guest/Cache';
import { Guest } from '@/modules/system/guest/Guest';
import { GuestExecutorType } from '@/modules/system/guest/GuestExecutorType';
import { PatronPool } from '@/modules/system/guest/PatronPool';

/**
 * TODO избавиться от new внутри объектов - вообще
 */
const fileHandlerContent = new Instance(
  (value) => new SystemFileFromHandler(<FileSystemFileHandle>value),
);
const browserFileSaved = new Instance(
  (value) => new BrowserFileSaved(<FileSystemFileHandle>value),
);
const cache = new Instance((initiator) => new Cache(initiator));
const guest = new Instance((executor) => new Guest(<GuestExecutorType<unknown>>executor));
const patronPool = new Instance((initiator) => new PatronPool(initiator));

const notification = new Notification(cache);
const mapFile = new MapFileOfContent(
  new FileSystemContent(
    new BrowserLaunchQueue(),
    notification,
    fileHandlerContent,
    browserFileSaved,
    guest,
    patronPool,
  ),
);
const mapCurrent = new MapCurrent(mapFile);
const mapSettings = new MapSettingsGuest(mapFile, mapCurrent);
const canvas = new BrowserCanvas();
const konvaLayer = new KonvaLayer(canvas);
const mapObject = new MapObjectGuest(mapCurrent, mapFile);
const mapObjects = new MapObjectsVisible(konvaLayer, canvas, mapCurrent);
mapObjects.objects(new MapObjectsRectsPatron(konvaLayer, mapObject));
const miniMap = new MiniMap(mapCurrent, konvaLayer);

export const useApplication = () => ({
  mapFile,
  mapCurrent,
  mapSettings,
  mapObjects,
  canvas,
  miniMap,
  notification,
});
