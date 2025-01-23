import debug from 'debug';
import {
  ActionType,
  GuestAwareObjectType,
  GuestObjectType,
  GuestType, Source,
} from 'patron-oop';

export interface ShareFileDocument {
  name: string,
  content: string,
  mime: string,
}

const localDebug = debug('SharedFile');

export class SharedFile implements GuestAwareObjectType<boolean>, ActionType<void> {
  private loading = new Source(false);

  public constructor(
    private fileSource: GuestAwareObjectType<ShareFileDocument>,
    private sharedLastTimestamp: GuestObjectType<{ name: string, timestamp: number }>,
    private sharingTitle = 'Share file',
  ) { }

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
          this.sharedLastTimestamp.give({
            name: value.name,
            timestamp: Date.now(),
          });
        });
      } catch (e) {
        localDebug(e);
      }
    });
    return this;
  }
}
