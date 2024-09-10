import { MapFileType } from '@/modules/application/map/mapFile/MapFileType';
import { MapDocument, MapFileDocument } from '@/modules/entities/MapStructures';
import { GuestType } from '../../../system/guest/GuestType';

// TODO сделать позже файл который строит по текущему роуту
export class MapFileOfRoute implements MapFileType {
  currentMapPool(target: GuestType<MapDocument>): this {
    throw new Error('Method not implemented.');
  }

  mapFile(target: GuestType<MapFileDocument>): this {
    throw new Error('Method not implemented.');
  }

  mapFilePool(target: GuestType<MapFileDocument>): this {
    throw new Error('Method not implemented.');
  }

  currentMap(target: GuestType<MapDocument>): this {
    throw new Error('Method not implemented.');
  }

  receive(value: MapFileDocument): this {
    throw new Error('Method not implemented.');
  }

  introduction() {
    return 'guest' as const;
  }
}
