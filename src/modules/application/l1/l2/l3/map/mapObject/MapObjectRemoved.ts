import { GuestType } from '@/modules/system/guest/GuestType';
import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType } from '@/modules/system/guest/FactoryType';

export class MapObjectRemoved implements GuestType<MapObjectDocument> {
  public constructor(
    private map: MapType,
    private mapFile: MapFileType,
    private factories: {
      guest: FactoryType<GuestType>,
    },
  ) {}

  receive(value: MapObjectDocument): this {
    this.mapFile.currentMap(this.factories.guest.create((latestMap: MapDocument) => {
      delete latestMap.objects[value.id];
      this.map.receive(latestMap);
    }));
    return this;
  }
}
