import { MapStructure } from '@/entities/MapStructures';
import { BaseResult } from '@/objects/base/BaseResult';
import { Map } from '@/objects/map/Map';
import { MapFile } from '@/objects/mapFile/MapFile';

/**
 * Синхронизация MapFile объекта с Map
 */
export class MapFromMapFile implements Map {
  public constructor(private parent: Map, mapFile: MapFile) {
    mapFile.entity().channel().subscribe({
      notify: (mapFileValue) => {
        console.log('MapFromMapFile', mapFileValue);
      },
    });
  }

  public entity(): BaseResult<MapStructure> {
    return this.entity();
  }
}
