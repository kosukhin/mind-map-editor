import {
  BrowserLaunchQueueType,
} from '@/modules/integration/browser/launchQueue/BrowserLaunchQueueType';
import { GuestType } from '@/modules/system/guest/GuestType';

export class BrowserLaunchQueueFake implements BrowserLaunchQueueType {
  fileHandler(guest: GuestType<FileSystemFileHandle>): this {
    guest.receive({ message: 'fake handler' } as unknown as FileSystemFileHandle);
    return this;
  }
}
