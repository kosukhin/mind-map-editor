import { MapTypeStructure } from '@/entities/MapStructures';
import { BaseChannel } from '@/objects/base/BaseChannel';
import { MapType } from '@/objects/mapType/MapType';

/**
 * Конвертация структуры типа карты в объект
 */
export class MapTypeOf implements MapType {
  channel(): BaseChannel<MapTypeStructure> {
    throw new Error('Method not implemented.');
  }

  entity(): MapTypeStructure {
    throw new Error('Method not implemented.');
  }
}
