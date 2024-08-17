import { MapFileOfContent } from '@/modules/application/mapFile/MapFileOfContent';
import { MapFileContentFS } from '@/modules/application/mapFileContent/MapFIleContentFS';
import { MapFileDocument, MapDocument } from '@/modules/entities/MapStructures';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { Ref } from 'vue';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';

const mapFileContent = new MapFileContentFS(new BrowserLaunchQueue());
const mapFile = new MapFileOfContent(mapFileContent);

const currentMapPatron = new VueRefPatron<MapDocument>();
mapFile.currentMap(currentMapPatron);

const mapFilePatron = new VueRefPatron<MapFileDocument>();
mapFile.mapFile(mapFilePatron);

export const useApplication = (canvasRef: Ref<HTMLElement | undefined>) => ({
  map: currentMapPatron.ref(),
  mapFile: mapFilePatron.ref(),
});
