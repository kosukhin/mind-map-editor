import { GuestObjectType } from 'patron-oop';

export interface CheckNotificationType<T> {
  breakOnFail(value: T, guest: GuestObjectType<true>): this;
  continueOnFail(value: T, guest: GuestObjectType<true | string>): this;
}
