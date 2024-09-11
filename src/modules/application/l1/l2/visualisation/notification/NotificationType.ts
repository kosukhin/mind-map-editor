import { GuestType } from '@/modules/system/guest/GuestType';

export interface NotificationDocument {
  text: string,
  type: 'error' | 'success',
}

export interface NotificationType extends GuestType<NotificationDocument> {
  message(guest: GuestType<NotificationDocument>): this;
}
