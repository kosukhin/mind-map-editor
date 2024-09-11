import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestType } from '@/modules/system/guest/GuestType';

export interface MapObjectsType {
  objects(guest: GuestType<MapObjectDocument[]>): this;
}

export type MapObjectType = GuestType<MapObjectDocument>
