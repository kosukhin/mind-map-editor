import {
  NotificationDocument,
  NotificationType,
} from '@/modules/application/l1/l2/visualisation/notification/NotificationType';
import { GuestType, SourceType, FactoryType } from 'patron-oop';

/**
 * Объект для отображения уведомлений
 */
export class Notification implements NotificationType {
  private messageCache: SourceType<NotificationDocument>;

  private notificationLifetimeDelay = 3500;

  private lastTimerHead: NodeJS.Timeout | null = null;

  public constructor(
    factories: {
      cache: FactoryType<SourceType<unknown>>,
    },
  ) {
    this.messageCache = factories.cache.create(this);
  }

  public message<R extends GuestType<NotificationDocument>>(guest: R): R {
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
