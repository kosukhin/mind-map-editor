import { GuestType } from '@/modules/system/guest/GuestType';

/**
 * Поведения для получения выбранного id объекта
 */
export interface MapObjectCurrentType extends GuestType<string> {
  objectId(guest: GuestType<string>): GuestType<string>;
}
