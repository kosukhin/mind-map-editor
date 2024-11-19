import { MapFileContentType } from '../l2/l3/map/mapFile/MapFileContentType';
import { GuestObjectType, SourceType, FactoryType } from 'patron-oop';
import { NotificationType } from '../l2/visualisation/notification/NotificationType';
export declare class UrlContent implements MapFileContentType {
    private notification;
    private factories;
    private contentCache;
    constructor(notification: NotificationType, factories: {
        sourceEmpty: FactoryType<SourceType>;
        guest: FactoryType<GuestObjectType>;
        patronOnce: FactoryType<GuestObjectType>;
    });
    canBeUsed(guest: GuestObjectType<boolean>): GuestObjectType<boolean>;
    content(target: GuestObjectType<string>): this;
    give(): this;
}
