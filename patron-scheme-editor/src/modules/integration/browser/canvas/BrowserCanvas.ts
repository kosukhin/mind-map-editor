import { SizeDocument } from '@/modules/integration/browser/canvas/SizeDocument';
import { GuestObjectType, SourceType, FactoryType } from 'patron-oop';
import { BrowserCanvasType } from '@/modules/integration/browser/canvas/BrowserCanvasType';
import { debug } from 'debug';

const localDebug = debug('app:BrowserCanvas');

export class BrowserCanvas implements BrowserCanvasType {
  private canvasCache: SourceType<HTMLElement>;

  public constructor(
    private factories: {
      sourceEmpty: FactoryType<SourceType>;
      guestInTheMiddle: FactoryType<GuestObjectType>;
    },
  ) {
    this.canvasCache = factories.sourceEmpty.create();
  }

  public canvas(guest: GuestObjectType<HTMLElement>): this {
    this.canvasCache.value(guest);
    return this;
  }

  public size(guest: GuestObjectType<SizeDocument>): this {
    this.canvasCache.value(
      this.factories.guestInTheMiddle.create(guest, (value: HTMLCanvasElement) => {
        const width = value.width || value.clientWidth;
        const height = value.height || value.clientHeight;
        localDebug('canvas size', width, height);
        guest.give({
          height,
          width,
        });
      }),
    );
    return this;
  }

  public give(value: HTMLElement): this {
    localDebug('receive new canvas', value);
    this.canvasCache.give(value);
    return this;
  }
}
