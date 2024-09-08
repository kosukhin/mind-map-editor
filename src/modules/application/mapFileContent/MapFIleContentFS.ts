import { MapFileContentType } from '@/modules/application/mapFileContent/MapFileContentType';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { RuntimeError } from '@/modules/system/error/RuntimeError';
import { Guest } from '@/modules/system/guest/Guest';
import { NotificationType } from '@/modules/application/notification/NotificationType';
import {
  BrowserLaunchQueueType,
} from '@/modules/integration/browser/launchQueue/BrowserLaunchQueueType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { SystemFileType } from '@/modules/system/file/SystemFileType';
import { BrowserFileType } from '@/modules/integration/browser/file/BrowserFileType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { PoolType } from '@/modules/system/guest/PoolType';
import { debug } from 'debug';

const localDebug = debug('MapFileContentFS');

export class MapFileContentFS implements MapFileContentType {
  private contentPatrons: PoolType<string> = new PatronPool(this);

  public constructor(
    private launchQueue: BrowserLaunchQueueType,
    private notification: NotificationType,
    private fileHandlerReadFactory: FactoryType<SystemFileType>,
    private browserFileFactory: FactoryType<BrowserFileType>,
    private fileHandler: FileSystemFileHandle | null = null,
  ) {}

  public content(target: GuestType<string>): this {
    try {
      const fileHandlerGuest = new Guest((value: FileSystemFileHandle) => {
        this.fileHandler = value;
        this
          .fileHandlerReadFactory
          .create(value)
          .content(new Guest((content: string) => {
            this.contentPatrons.distribute(content, target);
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
    localDebug('save file as content string', value);
    if (!this.fileHandler) {
      throw new RuntimeError('Cant save file because no fileHandler');
    }
    try {
      this.browserFileFactory.create(this.fileHandler).save(value);
      return this;
    } catch (e) {
      throw new RuntimeError('Cant handle receive for map file FS', { cause: e });
    } finally {
      this.notification.receive({
        type: 'success',
        text: 'Успешно сохранен файл карты!',
      });
    }
  }
}
