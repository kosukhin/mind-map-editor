import { MapTypeStructure } from '@/entities/MapStructures';
import { BaseChannel } from '@/objects/base/BaseChannel';
import { BaseChannelOf } from '@/objects/base/BaseChannelOf';
import { MapType } from '@/objects/mapType/MapType';

/**
 * Конвертация структуры типа карты в объект
 */
export class MapTypeNull implements MapType {
  private innerChannel = new BaseChannelOf<MapTypeStructure>()

  private mapTypeStructure: MapTypeStructure | null = null;

  public channel(): BaseChannel<MapTypeStructure> {
    return this.innerChannel;
  }

  public entity(): MapTypeStructure {
    if (!this.mapTypeStructure) {
      throw new Error('MapTypeNull: no map type!');
    }

    return this.mapTypeStructure;
  }
}
