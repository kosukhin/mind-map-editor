import { GuestType } from '@/modules/system/guest/GuestType';

export interface MapObjectParentNamesType {
  names(guest: GuestType<string[]>): GuestType<string[]>
}
