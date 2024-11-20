import {
  NotificationDocument,
  NotificationType,
} from '@/modules/application/l1/l2/visualisation/notification/NotificationType';
import { GuestObjectType, SourceType, FactoryType } from 'patron-oop';

/**
 * Объект для отображения уведомлений
 */
export class Notification implements NotificationType {
  private messageCache: SourceType<NotificationDocument>;

  private notificationLifetimeDelay = 3500;

  private lastTimerHead: NodeJS.Timeout | null = null;

  public constructor(factories: { sourceEmpty: FactoryType<SourceType<unknown>> }) {
    this.messageCache = factories.sourceEmpty.create();
  }

  public message<R extends GuestObjectType<NotificationDocument>>(guest: R): R {
    this.messageCache.value(guest);
    return guest;
  }

  public give(value: NotificationDocument): this {
    this.messageCache.give(value);
    if (this.lastTimerHead) {
      clearTimeout(this.lastTimerHead);
    }
    this.lastTimerHead = setTimeout(() => {
      this.messageCache.give({
        type: 'success',
        text: 'hide',
      });
    }, this.notificationLifetimeDelay);
    return this;
  }
}
