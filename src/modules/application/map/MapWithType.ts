import { MapStructure } from '@/modules/entities/MapStructures';
import { Result } from '@/modules/system/result/Result';
import { Map } from '@/modules/application/map/Map';
import { MapType } from '@/modules/application/mapType/MapType';
import { ResultOf } from '@/modules/system/result/ResultOf';

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
