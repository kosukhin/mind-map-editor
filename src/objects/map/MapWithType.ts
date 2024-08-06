import { MapStructure } from '@/entities/MapStructures';
import { BaseResult } from '@/objects/base/BaseResult';
import { Map } from '@/objects/map/Map';
import { MapType } from '@/objects/mapType/MapType';

/**
 * Связь карты и типа карты
 */
export class MapWithType implements Map {
  public constructor(private parent: Map, private mapType: MapType) {
  }

  public entity(): BaseResult<MapStructure> {
    const mapStructure = this.entity().result();
    const typeStructure = this.mapType.entity().result();
    const types = { ...mapStructure.types, [typeStructure.name]: typeStructure };
    return new BaseResult({
      ...mapStructure,
      types,
    });
  }
}
