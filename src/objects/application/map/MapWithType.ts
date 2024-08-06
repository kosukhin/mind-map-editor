import { MapStructure } from '@/objects/entities/MapStructures';
import { Result } from '@/objects/system/result/Result';
import { Map } from '@/objects/application/map/Map';
import { MapType } from '@/objects/application/mapType/MapType';
import { ResultOf } from '@/objects/system/result/ResultOf';

/**
 * Связь карты и типа карты
 */
export class MapWithType implements Map {
  public constructor(private parent: Map, private mapType: MapType) {
  }

  public value(): Result<MapStructure> {
    const mapStructure = this.value().result();
    const typeStructure = this.mapType.value().result();
    const types = { ...mapStructure.types, [typeStructure.name]: typeStructure };
    return new ResultOf({
      ...mapStructure,
      types,
    });
  }
}
