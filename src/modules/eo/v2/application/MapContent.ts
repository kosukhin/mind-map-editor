import { Valueable } from '@/modules/eo/targets/system/Valueable';
import { MapStructure } from '@/entities/Map';
lueable';

export class MapContent implements Valueable<MapStructure> {
  constructor(private readonly realStructure: MapStructure) {}

  value(): MapStructure {
    return this.realStructure;
  }
}
