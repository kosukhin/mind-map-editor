import { MapObjectDocument } from '@/modules/entities/MapStructures';
import { GuestType } from '../../system/guest/GuestType';

export interface MapObjectsType {
  objects(guest: GuestType<MapObjectDocument[]>): this;
}

export type MapObjectType = GuestType<MapObjectDocument>
