import { GuestType } from '@/modules/system/guest/GuestType';

export interface MapTypeCurrentType extends GuestType<string> {
  typeId(guest: GuestType<string>): this;
}
