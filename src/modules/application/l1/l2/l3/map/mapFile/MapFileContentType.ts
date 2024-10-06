import { GuestType } from '@/modules/system/guest/GuestType';

/**
 * Поведение для получения контента файла с картами строкой
 */
export interface MapFileContentType extends GuestType<string> {
  content(target: GuestType<string>): this;
  canBeUsed(guest: GuestType<boolean>): this;
}
