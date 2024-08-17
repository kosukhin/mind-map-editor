import { MapFile } from '@/modules/application/mapFile/MapFile';
import { MapDocument, MapFileDocument } from '@/modules/entities/MapStructures';
import { Guest } from '@/modules/system/guest/Guest';

// TODO сделать позже файл который строит по текущему роуту
export class MapFileOfRoute implements MapFile {
  currentMapPool(target: Guest<MapDocument>): this {
    throw new Error('Method not implemented.');
  }

  mapFile(target: Guest<MapFileDocument>): this {
    throw new Error('Method not implemented.');
  }

  mapFilePool(target: Guest<MapFileDocument>): this {
    throw new Error('Method not implemented.');
  }

  currentMap(target: Guest<MapDocument>): this {
    throw new Error('Method not implemented.');
  }

  receive(value: MapFileDocument): this {
    throw new Error('Method not implemented.');
  }

  introduction() {
    return 'guest' as const;
  }
}
