import { MapStructure } from '@/modules/entities/MapStructures';
import { Result } from '@/modules/system/result/Result';
import { Map } from '@/modules/application/map/Map';
import { MapFile } from '@/modules/application/mapFile/MapFile';

/**
 * Синхронизация MapFile объекта с Map
 */
export class MapFromMapFile implements Map {
  public constructor(private parent: Map, mapFile: MapFile) {
    mapFile.value().channel().subscribe({
      notify: (mapFileValue) => {
        console.log('MapFromMapFile', mapFileValue);
      },
    });
  }

  public value(): Result<MapStructure> {
    return this.value();
  }
}
