import { Map } from '@/modules/application/map/Map';
import { MapType } from '@/modules/application/mapType/MapType';
import { MapStructure } from '@/modules/entities/MapStructures';
import { Channel } from '@/modules/system/channel/Channel';
import { ResultObservable } from '@/modules/system/result/ResultObservable';

/**
 * Связь карты и типа карты
 */
export class MapWithType implements Map {
  public constructor(private parent: Map, private mapType: MapType) {
  }

  channel(): Channel<ResultObservable<MapStructure>> {
    throw new Error('Method not implemented.');
  }

  exists(): boolean {
    throw new Error('Method not implemented.');
  }

  result(): MapStructure {
    throw new Error('Method not implemented.');
  }

  replaceResult(newResult: MapStructure): this {
    throw new Error('Method not implemented.');
  }
}
