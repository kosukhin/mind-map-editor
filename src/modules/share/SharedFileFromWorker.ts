import { ShareFileDocument } from '@/modules/share/ShareContent';
import {
  ActionType,
  GuestAwareType,
  GuestType,
  SourceEmpty,
} from 'patron-oop';

export class SharedFileFromWorker implements GuestAwareType<ShareFileDocument>, ActionType<void> {
  private source = new SourceEmpty<ShareFileDocument>()

  public do(): this {
    fetch('/share-file-content')
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.data) {
          this.source.give(resp.data);
        }
      });
    return this;
  }

  public value(guest: GuestType<ShareFileDocument>) {
    this.source.value(guest);
    return this;
  }
}
