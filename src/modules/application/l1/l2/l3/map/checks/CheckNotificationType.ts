import { GuestType } from '@/modules/system/guest/GuestType';

export interface CheckNotificationType<T> {
  breakOnFail(value: T, guest: GuestType<true>): this;
  continueOnFail(value: T, guest: GuestType<true | string>): this;
}
