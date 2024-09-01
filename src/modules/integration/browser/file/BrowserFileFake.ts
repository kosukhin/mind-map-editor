import { BrowserFileType } from '@/modules/integration/browser/file/BrowserFileType';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { GuestType } from '@/modules/system/guest/GuestType';

export class BrowserFileFake implements BrowserFileType, GuestAwareType<string> {
  public constructor(
    private theContent: string = '',
  ) {}

  save(content: string): this {
    this.theContent = content;
    return this;
  }

  receiving(guest: GuestType<string>) {
    guest.receive(this.theContent);
    return this;
  }
}
