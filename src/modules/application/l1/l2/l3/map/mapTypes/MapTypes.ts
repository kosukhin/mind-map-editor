import { GuestType } from '@/modules/system/guest/GuestType';
import {
  MapDocument,
  MapTypeDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';

/**
 * Объект для сохранения типов узлов карты
 */
export class MapTypes implements GuestType<MapTypeDocument> {
  public constructor(
    private map: MapType,
    private mapFile: MapFileType,
    private factories: {
      guest: FactoryType<GuestType>,
    },
  ) {}

  receive(value: MapTypeDocument): this {
    this.mapFile.currentMap(this.factories.guest.create((latestMap: MapDocument) => {
      this.map.receive({
        ...latestMap,
        types: {
          ...latestMap.types,
          [value.name]: value,
        },
      });
    }));
    return this;
  }
}
