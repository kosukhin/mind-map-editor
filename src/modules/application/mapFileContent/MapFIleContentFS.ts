import { MapFileContent } from '@/modules/application/mapFileContent/MapFileContent';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { SystemFileFromHandler } from '@/modules/system/file/SystemFileFromHandler';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { RuntimeError } from '@/modules/system/error/RuntimeError';
import { Guest } from '@/modules/system/guest/Guest';
import { BrowserFileSaved } from '@/modules/integration/browser/file/BrowserFileSaved';
import { NotificationType } from '@/modules/application/notification/NotificationType';
import { GuestType } from '../../system/guest/GuestType';

export class MapFileContentFS implements MapFileContent {
  private contentPatrons = new PatronPool(this);

  private fileHandler: FileSystemFileHandle | null = null;

  public constructor(
    private launchQueue: BrowserLaunchQueue,
    private notiffication: NotificationType,
  ) {}

  public content(target: GuestType<string>): this {
    try {
      const fileHandlerGuest = new Guest((value: FileSystemFileHandle) => {
        this.fileHandler = value;
        new SystemFileFromHandler(value)
          .content(new Guest((content: string) => {
            this.contentPatrons.distributeReceivingOnce(content, target);
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
      console.log('save string', value);
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
}
