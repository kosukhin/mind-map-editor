import { Guest } from '@/modules/system/guest/Guest';
import { MapObjectDocument } from '@/modules/entities/MapStructures';

export interface MapObjects {
  objects(guest: Guest<MapObjectDocument[]>): this;
}

export type MapObject = Guest<MapObjectDocument>
