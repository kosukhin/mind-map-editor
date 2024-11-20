import { NotificationType } from '@/modules/application/l1/l2/visualisation/notification/NotificationType';
import { CheckType } from '@/modules/application/l1/l2/l3/map/checks/CheckType';
import { CheckNotificationType } from '@/modules/application/l1/l2/l3/map/checks/CheckNotificationType';
import { GuestObjectType, FactoryType } from 'patron-oop';

export class CheckNotification<T> implements CheckNotificationType<T> {
  public constructor(
    private notification: NotificationType,
    private check: CheckType<T>,
    private factories: {
      guest: FactoryType<GuestObjectType>;
    },
  ) {}

  public breakOnFail(value: T, guest: GuestObjectType<true>): this {
    this.check.check(
      value,
      this.factories.guest.create((result: true | string) => {
        if (result === true) {
          guest.give(true);
        } else {
          this.notification.give({
            type: 'error',
            text: result,
          });
        }
      }),
    );

    return this;
  }

  public continueOnFail(value: T, guest: GuestObjectType<true | string>) {
    this.check.check(
      value,
      this.factories.guest.create((result: true | string) => {
        guest.give(result);
        if (result !== true) {
          this.notification.give({
            type: 'error',
            text: result,
          });
        }
      }),
    );

    return this;
  }
}
