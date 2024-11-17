import { GuestObjectType } from 'patron-oop';

/**
 * Поведение для получения контента файла с картами строкой
 */
export interface MapFileContentType extends GuestObjectType<string> {
  content(target: GuestObjectType<string>): this;
  canBeUsed(guest: GuestObjectType<boolean>): GuestObjectType<boolean>;
}
