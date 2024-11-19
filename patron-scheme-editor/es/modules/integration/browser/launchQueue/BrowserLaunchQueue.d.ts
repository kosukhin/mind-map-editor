import { LaunchQueueType } from './LaunchQueueType';
import { BrowserLaunchQueueType } from './BrowserLaunchQueueType';
import { GuestObjectType } from 'patron-oop';
export declare class BrowserLaunchQueue implements BrowserLaunchQueueType {
    private launchQueue;
    private isLaunchQueueSupported;
    constructor(launchQueue?: LaunchQueueType, isLaunchQueueSupported?: boolean);
    fileHandler(guest: GuestObjectType<FileSystemFileHandle>): this;
}
