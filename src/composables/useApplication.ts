import { MapFileOfContent } from '@/modules/application/mapFile/MapFileOfContent';
import { MapFileContentFS } from '@/modules/application/mapFileContent/MapFileContentFS';
import { MapDocument, MapFileDocument, MapSettingsDocument } from '@/modules/entities/MapStructures';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { MapCurrent } from '@/modules/application/map/MapCurrent';
import { MapSettingsGuest } from '@/modules/application/mapSettings/MapSettingsGuest';
import { Notification } from '@/modules/application/notification/Notification';
import { NotificationDocument } from '@/modules/application/notification/NotificationType';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { MapObjectsVisible } from '@/modules/application/mapObject/MapObjectsVisible';
import { MapObjectsRectsPatron } from '@/modules/application/mapObject/MapObjectsRectsPatron';
import { MapObjectGuest } from '@/modules/application/mapObject/MapObjectGuest';
import { MiniMap } from '@/modules/application/miniMap/MiniMap';
import { Factory } from '@/modules/system/guest/Factory';
import { SystemFileFromHandler } from '@/modules/system/file/SystemFileFromHandler';
import { BrowserFileSaved } from '@/modules/integration/browser/file/BrowserFileSaved';

const fileHandlerReadFactory = new Factory((value: FileSystemFileHandle) => new SystemFileFromHandler(value));
const browserFileSavedFactory = new Factory((value: FileSystemFileHandle) => new BrowserFileSaved(value));
const notification = new Notification();
const mapFile = new MapFileOfContent(new MapFileContentFS(
  new BrowserLaunchQueue(),
  notification,
  fileHandlerReadFactory,
  browserFileSavedFactory,
));
const mapCurrent = new MapCurrent(mapFile);
const mapSettings = new MapSettingsGuest(mapFile, mapCurrent);
const canvas = new BrowserCanvas();
const konvaLayer = new KonvaLayer(mapFile, canvas);
const mapObject = new MapObjectGuest(mapCurrent, mapFile);
const mapObjects = new MapObjectsVisible(konvaLayer, canvas, mapCurrent);

// TODO убрать отсюда Vue патроны, делать их только там где они нужны

const mapObjectsPatron = new VueRefPatron();
mapObjects.objects(mapObjectsPatron);
mapObjects.objects(new MapObjectsRectsPatron(konvaLayer, mapObject));

const mapSettingsPatron = new VueRefPatron<MapSettingsDocument>();
mapCurrent.mapSettings(mapSettingsPatron);

const mapPatron = new VueRefPatron<MapDocument>();
mapFile.currentMap(mapPatron);

const mapFilePatron = new VueRefPatron<MapFileDocument>();
mapFile.mapFile(mapFilePatron);

const notificationPatron = new VueRefPatron<NotificationDocument>();
notification.message(notificationPatron);

const miniMap = new MiniMap(mapCurrent, konvaLayer);

export const useApplication = () => ({
  map: mapPatron.ref(),
  mapBehaviour: mapCurrent,
  mapFile: mapFilePatron.ref(),
  mapSettings: mapSettingsPatron.ref(),
  mapObjects: mapObjectsPatron.ref(),
  mapSettingsGuest: mapSettings,
  canvasGuest: canvas,
  notification: notificationPatron.ref(),
  miniMapBehaviour: miniMap,
});
