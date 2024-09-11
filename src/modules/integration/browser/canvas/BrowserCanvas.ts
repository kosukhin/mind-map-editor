import { SizeDocument } from '@/modules/integration/browser/canvas/SizeDocument';
import { GuestType } from '@/modules/system/guest/GuestType';
import { BrowserCanvasType } from '@/modules/integration/browser/canvas/BrowserCanvasType';
import { debug } from 'debug';
import { CacheType } from '@/modules/system/guest/CacheType';
import { InstanceType } from '@/modules/system/guest/InstanceType';

const localDebug = debug('app:BrowserCanvas');

export class BrowserCanvas implements BrowserCanvasType {
  private canvasCache: CacheType<HTMLElement>;

  public constructor(
    cache: InstanceType<CacheType<unknown>>,
    private guestMiddle: InstanceType<GuestType<unknown>>,
  ) {
    this.canvasCache = cache.create(this);
  }

  public canvas(guest: GuestType<HTMLElement>): this {
    this.canvasCache.receiving(guest);
    return this;
  }

  public size(guest: GuestType<SizeDocument>): this {
    this.canvasCache.receiving(this.guestMiddle.create(guest, (value: HTMLCanvasElement) => {
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
    this.canvasCache.receive(value);
    return this;
  }
}
