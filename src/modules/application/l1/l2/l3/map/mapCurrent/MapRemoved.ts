import { GuestType } from '@/modules/system/guest/GuestType';
import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

export class MapRemoved implements GuestType<MapDocument> {
  receive(value: MapDocument): this {
    console.log('remove map', value);
    return this;
  }
}
