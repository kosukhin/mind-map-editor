import { MapFileOfContent } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileOfContent';
import { FileSystemContent } from '@/modules/application/l1/fileSystem/FileSystemContent';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { MapCurrent } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrent';
import { MapSettingsGuest } from '@/modules/application/l1/l2/l3/map/mapSettings/MapSettingsGuest';
import { Notification } from '@/modules/application/l1/l2/visualisation/notification/Notification';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { MapObjectsVisible } from '@/modules/application/l1/l2/l3/visibleObjects/MapObjectsVisible';
import {
  MapObjectsRectsPatron,
} from '@/modules/application/l1/l2/visualisation/rects/MapObjectsRectsPatron';
import { MapObjectGuest } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectGuest';
import { MiniMap } from '@/modules/application/l1/l2/visualisation/miniMap/MiniMap';
import { useInstances } from '@/modules/system/guest/useInstances';

const {
  fileHandlerContent,
  browserFileSaved,
  cache,
  guest,
  guestInTheMiddle,
  patron,
  patronPool,
  transformToObject,
  transformToString,
} = useInstances();

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
  patronPool,
  guestInTheMiddle,
  transformToString,
  transformToObject,
);
const mapCurrent = new MapCurrent(mapFile, cache, guest, patron);
const mapSettings = new MapSettingsGuest(mapFile, mapCurrent, guest);
const canvas = new BrowserCanvas(cache, guestInTheMiddle);
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
