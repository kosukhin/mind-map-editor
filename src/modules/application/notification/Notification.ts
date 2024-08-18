import { Guest } from '@/modules/system/guest/Guest';

export interface NotificationDocument {
  text: string,
  type: 'error' | 'success',
}

export interface Notification extends Guest<NotificationDocument> {
  message(guest: Guest<NotificationDocument>): this;
}
