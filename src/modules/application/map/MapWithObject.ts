import { MapStructure } from '@/modules/entities/MapStructures';
import { Result } from '@/modules/system/result/Result';
import { Map } from '@/modules/application/map/Map';
import { MapObject } from '@/modules/application/mapObject/MapObject';
import { ResultOf } from '@/modules/system/result/ResultOf';

/**
 * Связь карты и объекта карты
 */
export class MapWithObject implements Map {
  public constructor(private parent: Map, private mapObject: MapObject) {
  }

  public value(): Result<MapStructure> {
    const mapStructure = this.value().result();
    const objectStructure = this.mapObject.value().result();
    const objects = { ...mapStructure.objects, [objectStructure.id]: objectStructure };
    return new ResultOf({
      ...mapStructure,
      objects,
    });
  }
}
