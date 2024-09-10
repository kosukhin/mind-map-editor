import { NotificationType, NotificationDocument } from '@/modules/application/visualisation/notification/NotificationType';
import { Cache } from '@/modules/system/guest/Cache';
import { GuestType } from '../../../system/guest/GuestType';

export class Notification implements NotificationType {
  private messageCache = new Cache<NotificationDocument>(this);

  public constructor(
    private notificationLifetimeDelay = 4000,
    private lastTimerHead: NodeJS.Timeout | null = null,
  ) {}

  public message(guest: GuestType<NotificationDocument>): this {
    this.messageCache.receiving(guest);
    return this;
  }

  public receive(value: NotificationDocument): this {
    this.messageCache.receive(value);
    if (this.lastTimerHead) {
      clearTimeout(this.lastTimerHead);
    }
    this.lastTimerHead = setTimeout(() => {
      this.messageCache.receive({
        type: 'success',
        text: 'hide',
      });
    }, this.notificationLifetimeDelay);
    return this;
  }
}
