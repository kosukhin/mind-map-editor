import { MapFileDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapCurrentIDType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentIDType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType, GuestObjectType } from 'patron-oop';

export class MapRemoved implements GuestObjectType<string> {
  public constructor(
    private mapFile: MapFileType,
    private mapId: MapCurrentIDType,
    private factories: {
      guest: FactoryType<GuestObjectType>
    },
  ) {}

  public give(mapId: string): this {
    const { guest } = this.factories;
    console.log('remove map', mapId);
    this.mapFile.mapFile(
      guest.create((mapFile: MapFileDocument) => {
        delete mapFile[mapId];
        this.mapFile.give(mapFile);
        this.mapId.give('current');
      }),
    );
    return this;
  }
}
