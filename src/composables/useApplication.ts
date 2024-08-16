import { MapFileOfString } from '@/modules/application/mapFile/MapFileOfString';
import { MapFileContentFS } from '@/modules/application/mapFileContent/MapFIleContentFS';
import { MapFileStructure, MapStructure } from '@/modules/entities/MapStructures';
import { VueRefTarget } from '@/modules/integration/vue/VueRefTarget';
import { Ref } from 'vue';

export const useApplication = (canvasRef: Ref<HTMLElement | undefined>) => {
  const mapFileContent = new MapFileContentFS();
  const mapFile = new MapFileOfString(mapFileContent);
  const currentMapTarget = new VueRefTarget<MapStructure>();
  mapFile.currentMapPool(currentMapTarget);
  const mapFileTarget = new VueRefTarget<MapFileStructure>();
  mapFile.mapFilePool(mapFileTarget);

  return {
    map: currentMapTarget.ref(),
    mapFile: mapFileTarget.ref(),
  };
};
