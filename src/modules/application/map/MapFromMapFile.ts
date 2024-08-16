import { Map } from '@/modules/application/map/Map';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { MapStructure } from '@/modules/entities/MapStructures';
import { Channel } from '@/modules/system/channel/Channel';
import { ResultObservable } from '@/modules/system/result/ResultObservable';

/**
 * Синхронизация MapFile объекта с Map
 */
export class MapFromMapFile implements Map {
  public constructor(private parent: Map, mapFile: MapFile) {
    mapFile.channel().subscribe({
      notify: (mapFileValue) => {
        const mapStructure = mapFileValue.result().current;
        parent.replaceResult(mapStructure);
      },
    });
  }

  channel(): Channel<ResultObservable<MapStructure>> {
    return this.parent.channel();
  }

  exists(): boolean {
    return this.parent.exists();
  }

  result(): MapStructure {
    return this.parent.result();
  }

  replaceResult(newResult: MapStructure): this {
    this.parent.replaceResult(newResult);
    return this;
  }
}
