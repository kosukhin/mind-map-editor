import { GuestType } from '@/modules/system/guest/GuestType';

export interface MapCurrentIDType extends GuestType<string> {
  id(guest: GuestType<string>): GuestType<string>;
}
