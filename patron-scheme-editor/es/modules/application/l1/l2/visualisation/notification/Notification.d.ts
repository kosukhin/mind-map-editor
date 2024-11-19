import { NotificationDocument, NotificationType } from './NotificationType';
import { GuestObjectType, SourceType, FactoryType } from 'patron-oop';
/**
 * Объект для отображения уведомлений
 */
export declare class Notification implements NotificationType {
    private messageCache;
    private notificationLifetimeDelay;
    private lastTimerHead;
    constructor(factories: {
        sourceEmpty: FactoryType<SourceType<unknown>>;
    });
    message<R extends GuestObjectType<NotificationDocument>>(guest: R): R;
    give(value: NotificationDocument): this;
}
