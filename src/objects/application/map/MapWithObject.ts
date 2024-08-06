import { MapStructure } from '@/objects/entities/MapStructures';
import { Result } from '@/objects/system/result/Result';
import { Map } from '@/objects/application/map/Map';
import { MapObject } from '@/objects/application/mapObject/MapObject';
import { ResultOf } from '@/objects/system/result/ResultOf';

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
