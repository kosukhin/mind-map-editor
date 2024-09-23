import {
  NotificationType,
} from '@/modules/application/l1/l2/visualisation/notification/NotificationType';
import { CheckType } from '@/modules/application/l1/l2/l3/map/checks/CheckType';
import { CheckNotificationType } from '@/modules/application/l1/l2/l3/map/checks/CheckNotificationType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';

export class CheckNotification<T> implements CheckNotificationType<T> {
  public constructor(
    private notification: NotificationType,
    private check: CheckType<T>,
    private factories: {
      guest: FactoryType<GuestType>
    },
  ) {}

  public breakOnFail(value: T, guest: GuestType<true>): this {
    this.check.check(value, this.factories.guest.create((result: true | string) => {
      if (result === true) {
        guest.receive(true);
      } else {
        this.notification.receive({
          type: 'error',
          text: result,
        });
      }
    }));

    return this;
  }

  public continueOnFail(value: T, guest: GuestType<true | string>) {
    this.check.check(value, this.factories.guest.create((result: true | string) => {
      guest.receive(result);
      if (result !== true) {
        this.notification.receive({
          type: 'error',
          text: result,
        });
      }
    }));

    return this;
  }
}
