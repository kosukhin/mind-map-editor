import { GuestType } from '@/modules/system/guest/GuestType';

export interface GuestValueType<T = unknown> extends GuestType<T> {
  value(): T;
}
