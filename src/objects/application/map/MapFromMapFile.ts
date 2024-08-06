import { MapStructure } from '@/objects/entities/MapStructures';
import { Result } from '@/objects/system/result/Result';
import { Map } from '@/objects/application/map/Map';
import { MapFile } from '@/objects/application/mapFile/MapFile';

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
