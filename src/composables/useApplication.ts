import { MapFileOfString } from '@/modules/application/mapFile/MapFileOfString';
import { MapFileContentFS } from '@/modules/application/mapFileContent/MapFIleContentFS';
import { MapFileDocument, MapDocument } from '@/modules/entities/MapStructures';
import { VueRefTarget } from '@/modules/integration/vue/VueRefTarget';
import { Ref } from 'vue';

export const useApplication = (canvasRef: Ref<HTMLElement | undefined>) => {
  const mapFileContent = new MapFileContentFS();
  const mapFile = new MapFileOfString(mapFileContent);

  const currentMapTarget = new VueRefTarget<MapDocument>();
  mapFile.currentMapPool(currentMapTarget);

  const mapFileTarget = new VueRefTarget<MapFileDocument>();
  mapFile.mapFilePool(mapFileTarget);

  return {
    map: currentMapTarget.ref(),
    mapFile: mapFileTarget.ref(),
  };
};
