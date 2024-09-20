import { GuestType } from '@/modules/system/guest/GuestType';
import {
  MapDocument,
  MapTypeDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType } from '@/modules/system/guest/FactoryType';

export class MapTypeRemoved implements GuestType<MapTypeDocument> {
  public constructor(
    private map: MapType,
    private mapFile: MapFileType,
    private factories: {
      guest: FactoryType<GuestType>,
    },
  ) {}

  receive(value: MapTypeDocument): this {
    this.mapFile.currentMap(this.factories.guest.create((latestMap: MapDocument) => {
      delete latestMap.types[value.name];
      this.map.receive(latestMap);
    }));
    return this;
  }
}
