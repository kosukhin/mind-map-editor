import { GuestType } from '@/modules/system/guest/GuestType';

export interface BrowserLaunchQueueType {
  fileHandler(guest: GuestType<FileSystemFileHandle>): this;
}
