import { MapFileContentType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileContentType';
import { RuntimeError } from '@/modules/system/error/RuntimeError';
import { NotificationType } from '@/modules/application/l1/l2/visualisation/notification/NotificationType';
import { BrowserLaunchQueueType } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueueType';
import { GuestObjectType, FactoryType, PoolType, SourceType } from 'patron-oop';
import { SystemFileType } from '@/modules/system/file/SystemFileType';
import { BrowserFileType } from '@/modules/integration/browser/file/BrowserFileType';
import { debug } from 'debug';
import { FileSystemFileHandle } from '@vueuse/core';

const localDebug = debug('FileSystemContent');

export class FileSystemContent implements MapFileContentType {
  private contentPatrons: PoolType<string>;

  private fileHandler: FileSystemFileHandle | null = null;
  private contentSource: SourceType;

  public constructor(
    private launchQueue: BrowserLaunchQueueType,
    private notification: NotificationType,
    private factories: {
      fileHandlerContent: FactoryType<SystemFileType>;
      browserFileSaved: FactoryType<BrowserFileType>;
      guest: FactoryType<GuestObjectType>;
      pool: FactoryType<PoolType>;
      sourceEmpty: FactoryType<SourceType>;
    },
  ) {
    this.contentPatrons = factories.pool.create(this);
    this.contentSource = factories.sourceEmpty.create();
  }

  public content(target: GuestObjectType<string>): this {
    const fileHandlerGuest = this.factories.guest.create((value: FileSystemFileHandle) => {
      this.fileHandler = value;
      this.factories.fileHandlerContent.create(value).content(
        this.factories.guest.create((content: string) => {
          this.contentPatrons.distribute(content, target);
          this.contentSource.give(content);
        }),
      );
    });

    if (!this.fileHandler) {
      this.launchQueue.fileHandler(fileHandlerGuest);
    }

    this.contentSource.value(target);

    return this;
  }

  public give(value: string): this {
    localDebug('save file as content string', value);
    if (!this.fileHandler) {
      throw new RuntimeError('Cant save file because no fileHandler');
    }
    try {
      this.contentSource.give(value);
      this.factories.browserFileSaved.create(this.fileHandler).save(value);
      this.contentPatrons.give(value);
      return this;
    } catch (e) {
      throw new RuntimeError('Cant handle receive for map file FS', { cause: e });
    } finally {
      this.notification.give({
        type: 'success',
        text: 'Успешно сохранен файл карты!',
      });
    }
  }

  public canBeUsed(guest: GuestObjectType<boolean>) {
    const canBeUsed = 'launchQueue' in window;
    localDebug('can be used', canBeUsed);
    const matches = window && window.matchMedia('(display-mode: standalone)');
    guest.give(canBeUsed && matches.matches);
    return guest;
  }
}
