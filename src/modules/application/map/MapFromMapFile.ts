import { MapStructure } from '@/modules/entities/MapStructures';
import { Result } from '@/modules/system/result/Result';
import { Map } from '@/modules/application/map/Map';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { ResultOf } from '@/modules/system/result/ResultOf';

/**
 * Синхронизация MapFile объекта с Map
 */
export class MapFromMapFile implements Map {
  public constructor(private parent: Map, mapFile: MapFile) {
    mapFile.value().channel().subscribe({
      notify: (mapFileValue) => {
        const mapStructure = mapFileValue.result().current;
        parent.value().replace(new ResultOf(mapStructure));
      },
    });
  }

  public value(): Result<MapStructure> {
    return this.parent.value();
  }
}
