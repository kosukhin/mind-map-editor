import { MapFileContent } from '@/modules/application/mapFileContent/MapFileContent';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { SystemFileFromHandler } from '@/modules/system/file/SystemFileFromHandler';
import { Guest } from '@/modules/system/guest/Guest';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { RuntimeError } from '@/modules/system/error/RuntimeError';
import { Visitant } from '@/modules/system/guest/Visitant';
import { BrowserFileSaved } from '@/modules/integration/browser/file/BrowserFileSaved';
import { Notification } from '@/modules/application/notification/Notification';

export class MapFileContentFS implements MapFileContent {
  private contentPatrons = new PatronPool();

  private fileHandler: FileSystemFileHandle | null = null;

  public constructor(
    private launchQueue: BrowserLaunchQueue,
    private notiffication: Notification,
  ) {}

  public content(target: Guest<string>): this {
    try {
      const fileHandlerGuest = new Visitant((value: FileSystemFileHandle) => {
        this.fileHandler = value;
        new SystemFileFromHandler(value)
          .content(new Visitant((content: string) => {
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
    if (!this.fileHandler) {
      throw new RuntimeError('Cant save file because no fileHandler', {});
    }
    try {
      new BrowserFileSaved(this.fileHandler).save(value);
      return this;
    } catch (e) {
      throw new RuntimeError('Cant handle receive for map file FS', { cause: e });
    } finally {
      this.notiffication.receive({
        type: 'success',
        text: 'Успешно сохранен файл карты!',
      });
    }
  }

  public introduction() {
    return 'guest' as const;
  }
}
