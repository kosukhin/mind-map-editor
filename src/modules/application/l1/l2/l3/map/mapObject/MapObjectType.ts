import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestType } from '@/modules/system/guest/GuestType';

/**
 * Поведение для получения объектов
 */
export interface MapObjectsType {
  objects(guest: GuestType<MapObjectDocument[]>): this;
}

/**
 * Поведение для сохранения объекта
 */
export type MapObjectType = GuestType<MapObjectDocument>
