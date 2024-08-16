import { Map } from '@/modules/application/map/Map';
import { MapObject } from '@/modules/application/mapObject/MapObject';
import { MapStructure } from '@/modules/entities/MapStructures';
import { Channel } from '@/modules/system/channel/Channel';
import { ResultObservable } from '@/modules/system/result/ResultObservable';

/**
 * Связь карты и объекта карты
 */
export class MapWithObject implements Map {
  public constructor(private parent: Map, private mapObject: MapObject) {
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
