import debug from 'debug';
import {
  GuestAwareType, ActionType, GuestType, Source,
} from 'patron-oop';

export interface ShareFileDocument {
  name: string,
  content: string,
  mime: string,
}

const localDebug = debug('SharedFile');

export class SharedFile implements GuestAwareType<boolean>, ActionType<void> {
  private loading = new Source(false);

  public constructor(private fileSource: GuestAwareType<ShareFileDocument>, private sharingTitle = 'Share file') { }

  public value(guest: GuestType<boolean>) {
    this.loading.value(guest);
    return this;
  }

  public do(): this {
    this.fileSource.value((value) => {
      try {
        const fielToShare = new File(
          [value.content],
          value.name.replace('.json', '.txt'),
          { type: 'text/plain' },
        );

        this.loading.give(true);
        navigator.share({
          title: `${this.sharingTitle} ${value.name}`,
          files: [fielToShare],
        }).finally(() => {
          this.loading.give(false);
        });
      } catch (e) {
        localDebug(e);
      }
    });
    return this;
  }
}
