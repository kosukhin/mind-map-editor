import { GuestType } from '../../system/guest/GuestType';

export interface NotificationDocument {
  text: string,
  type: 'error' | 'success',
}

export interface Notification extends GuestType<NotificationDocument> {
  message(guest: GuestType<NotificationDocument>): this;
}
