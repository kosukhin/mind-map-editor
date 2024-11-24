import {
  LaunchParamsType,
  LaunchQueueType,
} from '@/modules/integration/browser/launchQueue/LaunchQueueType';
import { BrowserLaunchQueueType } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueueType';
import { GuestObjectType, SourceEmpty } from 'patron-oop';

const fileHandle = new SourceEmpty();

export class BrowserLaunchQueue implements BrowserLaunchQueueType {
  private isCalculated = false;

  public constructor(
    private launchQueue: LaunchQueueType = (window as any).launchQueue,
    private isLaunchQueueSupported = 'launchQueue' in window,
  ) {}

  public fileHandler(guest: GuestObjectType<FileSystemFileHandle>) {
    if (this.isLaunchQueueSupported && !this.isCalculated) {
      this.isCalculated = true;
      this.launchQueue.setConsumer((launchParams: LaunchParamsType) => {
        console.log('require file handler');
        if (launchParams.files && launchParams.files.length) {
          const [fileHandler] = launchParams.files;
          fileHandle.give(fileHandler);
        }
      });
    }

    fileHandle.value(guest);

    return this;
  }
}
