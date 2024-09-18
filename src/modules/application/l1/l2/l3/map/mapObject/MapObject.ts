import { MapObjectType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';

/**
 * Сохранение объекта
 */
export class MapObject implements MapObjectType {
  public constructor(
    private map: MapType,
    private mapFile: MapFileType,
    private factories: {
       guest: FactoryType<GuestType>,
    },
  ) {}

  receive(value: MapObjectDocument): this {
    this.mapFile.currentMap(this.factories.guest.create((latestMap: MapDocument) => {
      this.map.receive({
        ...latestMap,
        objects: {
          ...latestMap.objects,
          [value.id]: value,
        },
      });
    }));
    return this;
  }
}
