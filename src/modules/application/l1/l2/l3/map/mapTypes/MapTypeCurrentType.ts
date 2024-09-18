import { GuestType } from '@/modules/system/guest/GuestType';

/**
 * Поведение для выбора типа узла карты
 */
export interface MapTypeCurrentType extends GuestType<string> {
  typeId(guest: GuestType<string>): this;
}
