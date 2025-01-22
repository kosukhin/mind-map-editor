import { ShareFileDocument } from '@/modules/share/SharedFile';
import {
  GuestAwareAll,
  GuestAwareObjectType,
  GuestType, Patron, Source,
} from 'patron-oop';

export class ShareConflict implements GuestAwareObjectType<boolean> {
  private conflictSource = new Source(false);

  public constructor(oneSource: GuestAwareObjectType<ShareFileDocument>, anotherSource: GuestAwareObjectType<ShareFileDocument>) {
    const chain = new GuestAwareAll<{ one: any, another: any }>();
    oneSource.value(new Patron(chain.guestKey('one')));
    anotherSource.value(new Patron(chain.guestKey('another')));
    chain.value(new Patron(({ one, another }) => {
      this.conflictSource.give(one.name !== another.name);
    }));
  }

  public value(guest: GuestType<boolean>) {
    this.conflictSource.value(guest);
    return this;
  }
}
