import {
  LaunchParamsType,
  LaunchQueueType,
} from '@/modules/integration/browser/launchQueue/LaunchQueueType';
import {
  BrowserLaunchQueueType,
} from '@/modules/integration/browser/launchQueue/BrowserLaunchQueueType';
import { GuestType } from '@/modules/system/guest/GuestType';

export class BrowserLaunchQueue implements BrowserLaunchQueueType {
  public constructor(
    private launchQueue: LaunchQueueType = (window as any).launchQueue,
    private isLaunchQueueSupported = 'launchQueue' in window,
  ) {}

  public fileHandler(guest: GuestType<FileSystemFileHandle>) {
    if (this.isLaunchQueueSupported) {
      this.launchQueue.setConsumer((launchParams: LaunchParamsType) => {
        if (launchParams.files && launchParams.files.length) {
          const [fileHandler] = launchParams.files;
          guest.receive(fileHandler);
        }
      });
    }
    return this;
  }
}
