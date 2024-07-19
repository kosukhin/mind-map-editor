import { MapStructure } from '@/entities/Map';
import { Valueable } from '@/modules/eo/targets/system/Valueable';

export class MapContent implements Valueable<MapStructure> {
  constructor(private readonly realStructure: MapStructure) {}

  value(): MapStructure {
    return this.realStructure;
  }
}
