import { Notification, NotificationDocument } from '@/modules/application/notification/Notification';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { GuestType } from '../../system/guest/GuestType';

let lastTimerHead: NodeJS.Timeout | null = null;
const notificationLifetimeDelay = 4000;

export class NotificationMemory implements Notification {
  private messageDocument: NotificationDocument | null = null;

  private notificationsPool = new PatronPool<NotificationDocument>(this);

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
    if (lastTimerHead) {
      clearTimeout(lastTimerHead);
    }
    lastTimerHead = setTimeout(() => {
      this.notificationsPool.receive(null as unknown as NotificationDocument);
    }, notificationLifetimeDelay);
    return this;
  }
}
