import { MapStructure } from '@/entities/MapStructures';
import { BaseResult } from '@/objects/base/BaseResult';
import { Map } from '@/objects/map/Map';
import { MapObject } from '@/objects/mapObject/MapObject';

/**
 * Связь карты и объекта карты
 */
export class MapWithObject implements Map {
  public constructor(private parent: Map, private mapObject: MapObject) {
  }

  public entity(): BaseResult<MapStructure> {
    const mapStructure = this.entity().result();
    const objectStructure = this.mapObject.entity().result();
    const objects = { ...mapStructure.objects, [objectStructure.id]: objectStructure };
    return new BaseResult({
      ...mapStructure,
      objects,
    });
  }
}
