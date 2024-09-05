import { Cache } from '@/modules/system/guest/Cache';
import { SizeDocument } from '@/modules/entities/SizeDocument';
import { GuestInTheMiddle } from '@/modules/system/guest/GuestInTheMiddle';
import { GuestType } from '@/modules/system/guest/GuestType';
import { BrowserCanvasType } from '@/modules/integration/browser/canvas/BrowserCanvasType';

export class BrowserCanvas implements BrowserCanvasType {
  public constructor(
    private canvasCache = new Cache<HTMLElement>(this),
  ) {}

  public canvas(guest: GuestType<HTMLElement>): this {
    this.canvasCache.receiving(guest);
    return this;
  }

  public size(guest: GuestType<SizeDocument>): this {
    this.canvasCache.receiving(new GuestInTheMiddle(guest, (value: HTMLElement) => {
      guest.receive({
        height: value.clientHeight,
        width: value.clientWidth,
      });
    }));
    return this;
  }

  public receive(value: HTMLElement): this {
    this.canvasCache.receive(value);
    return this;
  }
}
