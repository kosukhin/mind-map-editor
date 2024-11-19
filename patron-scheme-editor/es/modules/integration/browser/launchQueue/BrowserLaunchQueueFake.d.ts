import { BrowserLaunchQueueType } from './BrowserLaunchQueueType';
import { GuestObjectType } from 'patron-oop';
export declare class BrowserLaunchQueueFake implements BrowserLaunchQueueType {
    fileHandler(guest: GuestObjectType<FileSystemFileHandle>): this;
}
