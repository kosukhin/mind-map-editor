import { MapObjectDocument } from '../documents/MapStructures';
import { GuestObjectType } from 'patron-oop';
/**
 * Поведение для получения объектов
 */
export interface MapObjectsType {
    objects(guest: GuestObjectType<MapObjectDocument[]>): this;
}
/**
 * Поведение для сохранения объекта
 */
export type MapObjectType = GuestObjectType<MapObjectDocument>;
