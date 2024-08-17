import { MapFile } from '@/modules/application/mapFile/MapFile';
import { MapStructure, MapFileStructure } from '@/modules/entities/MapStructures';
import { Target } from '@/modules/system/target/Target';

// TODO сделать позже файл который строит по текущему роуту
export class MapFileOfRoute implements MapFile {
  currentMapPool(target: Target<MapStructure>): this {
    throw new Error('Method not implemented.');
  }

  mapFile(target: Target<MapFileStructure>): this {
    throw new Error('Method not implemented.');
  }

  mapFilePool(target: Target<MapFileStructure>): this {
    throw new Error('Method not implemented.');
  }

  currentMap(target: Target<MapStructure>): this {
    throw new Error('Method not implemented.');
  }
}
