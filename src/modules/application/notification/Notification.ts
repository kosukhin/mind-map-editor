import { NotificationType, NotificationDocument } from '@/modules/application/notification/NotificationType';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { Cache } from '@/modules/system/guest/Cache';
import { GuestType } from '../../system/guest/GuestType';

export class Notification implements NotificationType {
  public constructor(
    private notificationLifetimeDelay = 4000,
    private messageDocument: NotificationDocument | null = new Cache<NotificationDocument>(),
    private notificationsPool = new PatronPool<NotificationDocument>(this),
    private lastTimerHead: NodeJS.Timeout | null = null,
  ) {}

  public message(guest: GuestType<NotificationDocument>): this {
    if (this.messageDocument) {
      this.notificationsPool.distributeReceivingOnce(this.messageDocument, guest);
    } else {
      this.notificationsPool.add(guest);
    }
    return this;
  }

  public receive(value: NotificationDocument): this {
    this.messageDocument = value;
    this.notificationsPool.receive(value);
    if (this.lastTimerHead) {
      clearTimeout(this.lastTimerHead);
    }
    this.lastTimerHead = setTimeout(() => {
      this.notificationsPool.receive(null as unknown as NotificationDocument);
    }, this.notificationLifetimeDelay);
    return this;
  }
}
