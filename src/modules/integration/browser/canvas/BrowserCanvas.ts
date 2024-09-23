import { SizeDocument } from '@/modules/integration/browser/canvas/SizeDocument';
import { GuestType } from '@/modules/system/guest/GuestType';
import { BrowserCanvasType } from '@/modules/integration/browser/canvas/BrowserCanvasType';
import { debug } from 'debug';
import { CacheType } from '@/modules/system/guest/CacheType';
import { FactoryType } from '@/modules/system/guest/FactoryType';

const localDebug = debug('app:BrowserCanvas');

export class BrowserCanvas implements BrowserCanvasType {
  private canvasCache: CacheType<HTMLElement>;

  public constructor(
    private factories: {
      cache: FactoryType<CacheType>,
      guestInTheMiddle: FactoryType<GuestType>,
    },
  ) {
    this.canvasCache = factories.cache.create(this);
  }

  public canvas(guest: GuestType<HTMLElement>): this {
    this.canvasCache.receiving(guest);
    return this;
  }

  public size(guest: GuestType<SizeDocument>): this {
    this.canvasCache.receiving(this.factories.guestInTheMiddle.create(guest, (value: HTMLCanvasElement) => {
      const width = value.width || value.clientWidth;
      const height = value.height || value.clientHeight;
      localDebug('canvas size', width, height);
      guest.receive({
        height,
        width,
      });
    }));
    return this;
  }

  public receive(value: HTMLElement): this {
    localDebug('receive new canvas', value);
    this.canvasCache.receive(value);
    return this;
  }
}
