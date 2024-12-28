import { ActionType } from "@/modules/system/source/ActionType";
import { GuestAwareType, GuestObjectType, GuestType, Source } from "patron-oop";

export interface ShareFileDocument {
  name: string,
  content: string,
  mime: string,
}

export class SharedFile implements GuestAwareType<boolean>, ActionType<void> {
  private loading = new Source(false);

  public constructor(private fileSource: GuestAwareType<ShareFileDocument>, private sharingTitle = 'Share file') { }

  public value(guest: GuestType<boolean>) {
    this.loading.value(guest);
    return this;
  }

  public do(): this {
    this.fileSource.value((value) => {

      const fielToShare = new File(
        [value.content],
        value.name.replace('.json', '.txt'),
        { type: 'text/plain' }
      );
      console.log('try to share file', value, fielToShare, {
        title: this.sharingTitle,
        url: 'https://share.file',
        text: 'Sharing from pwa',
        files: [fielToShare],
      });
      this.loading.give(true);
      navigator.share({
        title: this.sharingTitle,
        files: [fielToShare],
      }).finally(() => {
        this.loading.give(false);
      });
    });
    return this;
  }
}
