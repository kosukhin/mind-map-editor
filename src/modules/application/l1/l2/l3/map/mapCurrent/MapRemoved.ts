import { GuestType } from '@/modules/system/guest/GuestType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { MapFileDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapCurrentIDType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentIDType';

export class MapRemoved implements GuestType<string> {
  public constructor(
    private mapFile: MapFileType,
    private mapId: MapCurrentIDType,
    private factories: {
      guest: FactoryType<GuestType>
    },
  ) {
  }

  public receive(mapId: string): this {
    const { guest } = this.factories;
    console.log('remove map', mapId);
    this.mapFile.mapFile(
      guest.create((mapFile: MapFileDocument) => {
        delete mapFile[mapId];
        this.mapFile.receive(mapFile);
        this.mapId.receive('current');
      }),
    );
    return this;
  }
}
