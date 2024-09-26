import { GuestType } from '@/modules/system/guest/GuestType';

export interface JSONPType {
  content(guest: GuestType): GuestType
}
