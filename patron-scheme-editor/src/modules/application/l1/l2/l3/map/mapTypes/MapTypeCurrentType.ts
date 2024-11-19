import { GuestObjectType } from 'patron-oop';

/**
 * Поведение для выбора типа узла карты
 */
export interface MapTypeCurrentType extends GuestObjectType<string> {
  typeId(guest: GuestObjectType<string>): GuestObjectType<string>;
}
