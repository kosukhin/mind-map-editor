import {
  LaunchParamsType,
  LaunchQueueType,
} from '@/modules/integration/browser/launchQueue/LaunchQueueType';
import { BrowserLaunchQueueType } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueueType';
import { GuestObjectType, SourceEmpty } from 'patron-oop';

export class BrowserLaunchQueue implements BrowserLaunchQueueType {
  private fileHandle = new SourceEmpty();
  private isCalculated = false;

  public constructor(
    private launchQueue: LaunchQueueType = (window as any).launchQueue,
    private isLaunchQueueSupported = 'launchQueue' in window,
  ) {}

  public fileHandler(guest: GuestObjectType<FileSystemFileHandle>) {
    if (this.isLaunchQueueSupported && !this.isCalculated) {
      this.isCalculated = true;
      this.launchQueue.setConsumer((launchParams: LaunchParamsType) => {
        if (launchParams.files && launchParams.files.length) {
          console.log('launch queue filled');
          const [fileHandler] = launchParams.files;
          this.fileHandle.give(fileHandler);
        }
      });
    }

    this.fileHandle.value(guest);

    return this;
  }
}
