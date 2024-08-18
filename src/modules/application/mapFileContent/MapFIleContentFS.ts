import { MapFileContent } from '@/modules/application/mapFileContent/MapFileContent';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { SystemFileFromHandler } from '@/modules/system/file/SystemFileFromHandler';
import { Guest } from '@/modules/system/guest/Guest';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { RuntimeError } from '@/modules/system/error/RuntimeError';
import { GuestDynamic } from '@/modules/system/guest/GuestDynamic';

export class MapFileContentFS implements MapFileContent {
  private contentPatrons = new PatronPool();

  private fileHandler: FileSystemFileHandle | null = null;

  public constructor(private launchQueue: BrowserLaunchQueue) {}

  public content(target: Guest<string>): this {
    try {
      const fileHandlerGuest = new GuestDynamic((value: FileSystemFileHandle) => {
        this.fileHandler = value;
        new SystemFileFromHandler(value)
          .content(new GuestDynamic((content: string) => {
            this.contentPatrons.distributeReceiving(content, target);
          }));
      });

      if (!this.fileHandler) {
        this.launchQueue.fileHandler(fileHandlerGuest);
      } else {
        fileHandlerGuest.receive(this.fileHandler);
      }

      return this;
    } catch (e) {
      throw new RuntimeError('Cant get content for map file FS', { cause: e });
    }
  }

  public receive(value: string): this {
    try {
      console.log('write value', value);
      return this;
    } catch (e) {
      throw new RuntimeError('Cant handle receive for map file FS', { cause: e });
    }
  }

  public introduction() {
    return 'guest' as const;
  }
}
