import { GuestObjectType } from 'patron-oop';
/**
 * Поведения для получения выбранного id объекта
 */
export interface MapObjectCurrentType extends GuestObjectType<string> {
    objectId(guest: GuestObjectType<string>): GuestObjectType<string>;
}
