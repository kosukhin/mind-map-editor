import { BrowserFileType } from '@/modules/integration/browser/file/BrowserFileType';
import { GuestAwareType, GuestObjectType } from 'patron-oop';

export class BrowserFileFake implements BrowserFileType, GuestAwareType<string> {
  public constructor(
    private theContent: string = '',
  ) {}

  save(content: string): this {
    this.theContent = content;
    return this;
  }

  value(guest: GuestObjectType<string>) {
    guest.give(this.theContent);
    return this;
  }
}
