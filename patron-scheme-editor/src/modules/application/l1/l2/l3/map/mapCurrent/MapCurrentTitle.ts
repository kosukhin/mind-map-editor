import { GuestAwareType, GuestCast, GuestObjectType, GuestType } from 'patron-oop';
import { MapFile } from './../mapFile/MapFile';
import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

export class MapCurrentTitle implements GuestAwareType<string> {
  public constructor(private mapFile: MapFile) {}

  public value(guest: GuestObjectType<string>) {
    this.mapFile.currentMap(
      new GuestCast(guest as GuestType, (map: MapDocument) => {
        guest.give(map.settings.title);
      }),
    );
    return this;
  }
}
