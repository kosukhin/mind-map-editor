import { MapFile } from '@/modules/application/mapFile/MapFile';
import { MapDocument, MapFileDocument } from '@/modules/entities/MapStructures';
import { Target } from '@/modules/system/target/Target';

// TODO сделать позже файл который строит по текущему роуту
export class MapFileOfRoute implements MapFile {
  currentMapPool(target: Target<MapDocument>): this {
    throw new Error('Method not implemented.');
  }

  mapFile(target: Target<MapFileDocument>): this {
    throw new Error('Method not implemented.');
  }

  mapFilePool(target: Target<MapFileDocument>): this {
    throw new Error('Method not implemented.');
  }

  currentMap(target: Target<MapDocument>): this {
    throw new Error('Method not implemented.');
  }
}
