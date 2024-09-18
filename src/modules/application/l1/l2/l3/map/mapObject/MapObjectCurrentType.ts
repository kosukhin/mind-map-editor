import { GuestType } from '@/modules/system/guest/GuestType';

export interface MapObjectCurrentType extends GuestType<string> {
  objectId(guest: GuestType<string>): this;
}
