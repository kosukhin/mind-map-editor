import { MapObjectDocument } from '@/modules/entities/MapStructures';
import { GuestType } from '../../system/guest/GuestType';

export interface MapObjects {
  objects(guest: GuestType<MapObjectDocument[]>): this;
}

export type MapObject = GuestType<MapObjectDocument>
