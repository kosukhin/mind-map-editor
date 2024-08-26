import { Guest } from '@/modules/system/guest/Guest';
import { Cache } from '@/modules/system/guest/Cache';
import { SizeDocument } from '@/modules/entities/SizeDocument';
import { GuestInTheMiddle } from '@/modules/system/guest/GuestInTheMiddle';

export class BrowserCanvas implements Guest<HTMLElement> {
  private canvasCache = new Cache<HTMLElement>(this);

  public canvas(guest: Guest<HTMLElement>): this {
    this.canvasCache.receiving(guest);
    return this;
  }

  public size(guest: Guest<SizeDocument>): this {
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
