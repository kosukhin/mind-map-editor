import { MapFileContentType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileContentType';
import { RuntimeError } from '@/modules/system/error/RuntimeError';
import {
  NotificationType,
} from '@/modules/application/l1/l2/visualisation/notification/NotificationType';
import {
  BrowserLaunchQueueType,
} from '@/modules/integration/browser/launchQueue/BrowserLaunchQueueType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { SystemFileType } from '@/modules/system/file/SystemFileType';
import { BrowserFileType } from '@/modules/integration/browser/file/BrowserFileType';
import { InstanceType } from '@/modules/system/guest/InstanceType';
import { PoolType } from '@/modules/system/guest/PoolType';
import { debug } from 'debug';

const localDebug = debug('FileSystemContent');

export class FileSystemContent implements MapFileContentType {
  private contentPatrons: PoolType<string>;

  public constructor(
    private launchQueue: BrowserLaunchQueueType,
    private notification: NotificationType,
    private fileHandlerReadFactory: InstanceType<SystemFileType>,
    private browserFileFactory: InstanceType<BrowserFileType>,
    private guest: InstanceType<GuestType<unknown>>,
    pool: InstanceType<PoolType<string>>,
    private fileHandler: FileSystemFileHandle | null = null,
  ) {
    this.contentPatrons = pool.create(this);
  }

  public content(target: GuestType<string>): this {
    const fileHandlerGuest = this.guest.create((value: FileSystemFileHandle) => {
      this.fileHandler = value;
      this
        .fileHandlerReadFactory
        .create(value)
        .content(this.guest.create((content: string) => {
          this.contentPatrons.distribute(content, target);
        }));
    });

    if (!this.fileHandler) {
      this.launchQueue.fileHandler(fileHandlerGuest);
    } else {
      fileHandlerGuest.receive(this.fileHandler);
    }

    return this;
  }

  public receive(value: string): this {
    localDebug('save file as content string', value);
    if (!this.fileHandler) {
      throw new RuntimeError('Cant save file because no fileHandler');
    }
    try {
      this.browserFileFactory.create(this.fileHandler).save(value);
      this.contentPatrons.receive(value);
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
