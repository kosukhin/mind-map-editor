import { BrowserLaunchQueueType } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueueType';
import { GuestObjectType } from 'patron-oop';

export class BrowserLaunchQueueFake implements BrowserLaunchQueueType {
  fileHandler(guest: GuestObjectType<FileSystemFileHandle>): this {
    guest.give({ message: 'fake handler' } as unknown as FileSystemFileHandle);
    return this;
  }
}
