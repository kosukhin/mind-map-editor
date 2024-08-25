import { Guest } from '@/modules/system/guest/Guest';
import { PatronPool } from '@/modules/system/guest/PatronPool';

export class BrowserCanvas implements Guest<HTMLElement> {
  private theCanvas: HTMLElement | null = null;

  private canvasPool = new PatronPool<HTMLElement>(this);

  public canvas(guest: Guest<HTMLElement>): this {
    if (this.theCanvas) {
      this.canvasPool.distributeReceivingOnce(this.theCanvas, guest);
    } else {
      this.canvasPool.add(guest);
    }
    return this;
  }

  receive(value: HTMLElement): this {
    this.theCanvas = value;
    this.canvasPool.receive(value);
    return this;
  }
}
