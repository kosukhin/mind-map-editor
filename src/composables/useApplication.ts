import { MapFileOfContent } from '@/modules/application/mapFile/MapFileOfContent';
import { MapFileContentFS } from '@/modules/application/mapFileContent/MapFIleContentFS';
import { MapDocument, MapFileDocument, MapSettingsDocument } from '@/modules/entities/MapStructures';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { MapCurrent } from '@/modules/application/map/MapCurrent';
import { MapSettingsGuest } from '@/modules/application/mapSettings/MapSettingsGuest';
import { NotificationMemory } from '@/modules/application/notification/NotificationMemory';
import { NotificationDocument } from '@/modules/application/notification/Notification';

const notification = new NotificationMemory();
const mapFile = new MapFileOfContent(new MapFileContentFS(new BrowserLaunchQueue(), notification));
const mapCurrent = new MapCurrent(mapFile);
const mapSettings = new MapSettingsGuest(mapFile, mapCurrent);

const mapSettingsPatron = new VueRefPatron<MapSettingsDocument>();
mapCurrent.mapSettings(mapSettingsPatron);

const currentMapPatron = new VueRefPatron<MapDocument>();
mapFile.currentMap(currentMapPatron);

const mapFilePatron = new VueRefPatron<MapFileDocument>();
mapFile.mapFile(mapFilePatron);

const canvasPatron = new VueRefPatron<HTMLElement>();

const notificationPatron = new VueRefPatron<NotificationDocument>();
notification.message(notificationPatron);

export const useApplication = () => ({
  map: currentMapPatron.ref(),
  mapFile: mapFilePatron.ref(),
  mapSettings: mapSettingsPatron.ref(),
  mapSettingsGuest: mapSettings,
  canvas: canvasPatron.ref(),
  notification: notificationPatron.ref(),
});
