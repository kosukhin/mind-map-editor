import { MapFileContentType } from '../l2/l3/map/mapFile/MapFileContentType';
import { NotificationType } from '../l2/visualisation/notification/NotificationType';
import { BrowserLaunchQueueType } from '../../../integration/browser/launchQueue/BrowserLaunchQueueType';
import { GuestObjectType, FactoryType, PoolType } from 'patron-oop';
import { SystemFileType } from '../../../system/file/SystemFileType';
import { BrowserFileType } from '../../../integration/browser/file/BrowserFileType';
export declare class FileSystemContent implements MapFileContentType {
    private launchQueue;
    private notification;
    private factories;
    private contentPatrons;
    private fileHandler;
    constructor(launchQueue: BrowserLaunchQueueType, notification: NotificationType, factories: {
        fileHandlerContent: FactoryType<SystemFileType>;
        browserFileSaved: FactoryType<BrowserFileType>;
        guest: FactoryType<GuestObjectType>;
        pool: FactoryType<PoolType>;
    });
    content(target: GuestObjectType<string>): this;
    give(value: string): this;
    canBeUsed(guest: GuestObjectType<boolean>): GuestObjectType<boolean>;
}
