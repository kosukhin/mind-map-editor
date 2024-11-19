import { GuestObjectType } from 'patron-oop';
export interface BrowserLaunchQueueType {
    fileHandler(guest: GuestObjectType<FileSystemFileHandle>): this;
}
