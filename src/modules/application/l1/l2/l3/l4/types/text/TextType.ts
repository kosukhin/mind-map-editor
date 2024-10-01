import { GuestType } from '@/modules/system/guest/GuestType';

export interface TextType {
  asString(guest: GuestType<string>): GuestType
}
