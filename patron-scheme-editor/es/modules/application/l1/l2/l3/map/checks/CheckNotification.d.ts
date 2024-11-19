import { NotificationType } from '../../../visualisation/notification/NotificationType';
import { CheckType } from './CheckType';
import { CheckNotificationType } from './CheckNotificationType';
import { GuestObjectType, FactoryType } from 'patron-oop';
export declare class CheckNotification<T> implements CheckNotificationType<T> {
    private notification;
    private check;
    private factories;
    constructor(notification: NotificationType, check: CheckType<T>, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    breakOnFail(value: T, guest: GuestObjectType<true>): this;
    continueOnFail(value: T, guest: GuestObjectType<true | string>): this;
}
