import { BrowserFileType } from '@/modules/integration/browser/file/BrowserFileType';
import { give, GuestAwareObjectType, GuestObjectType, GuestType } from 'patron-oop';

export class BrowserFileFake implements BrowserFileType, GuestAwareObjectType<string> {
  public constructor(private theContent: string = '') { }

  public save(content: string): this {
    this.theContent = content;
    return this;
  }

  public value(guest: GuestType<string>) {
    give(this.theContent, guest);
    return this;
  }
}
