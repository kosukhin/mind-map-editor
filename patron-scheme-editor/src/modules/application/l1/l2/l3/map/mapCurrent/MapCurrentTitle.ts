import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { give, GuestAwareObjectType, GuestCast, GuestType } from 'patron-oop';
import { MapFile } from './../mapFile/MapFile';

export class MapCurrentTitle implements GuestAwareObjectType<string> {
  public constructor(private mapFile: MapFile) { }

  public value(guest: GuestType<string>) {
    this.mapFile.currentMap(
      new GuestCast(guest as GuestType, (map: MapDocument) => {
        give(map.settings.title, guest);
      }),
    );
    return this;
  }
}
