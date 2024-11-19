import { GuestObjectType } from 'patron-oop';

export interface NotificationDocument {
  text: string,
  type: 'error' | 'success',
}

export interface NotificationType extends GuestObjectType<NotificationDocument> {
  message(guest: GuestObjectType<NotificationDocument>): GuestObjectType<NotificationDocument>;
}
