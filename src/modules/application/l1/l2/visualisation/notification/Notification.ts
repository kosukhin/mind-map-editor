import {
  NotificationDocument,
  NotificationType,
} from '@/modules/application/l1/l2/visualisation/notification/NotificationType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { CacheType } from '@/modules/system/guest/CacheType';
import { InstanceType } from '@/modules/system/guest/InstanceType';

export class Notification implements NotificationType {
  private messageCache: CacheType<NotificationDocument>;

  public constructor(
    cache: InstanceType<CacheType<NotificationDocument>>,
    private notificationLifetimeDelay = 4000,
    private lastTimerHead: NodeJS.Timeout | null = null,
  ) {
    this.messageCache = cache.create(this);
  }

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
