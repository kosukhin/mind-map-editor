import { ShareFileDocument } from '@/modules/share/SharedFile';
import {
  GuestAwareType, GuestChain, GuestType, Patron, Source,
} from 'patron-oop';

export class ShareConflict implements GuestAwareType<boolean> {
  private conflictSource = new Source(false);

  public constructor(oneSource: GuestAwareType<ShareFileDocument>, anotherSource: GuestAwareType<ShareFileDocument>) {
    const chain = new GuestChain<{ one: any, another: any }>();
    oneSource.value(new Patron(chain.receiveKey('one')));
    anotherSource.value(new Patron(chain.receiveKey('another')));
    chain.result(new Patron(({ one, another }) => {
      this.conflictSource.give(one.name !== another.name);
    }));
  }

  public value(guest: GuestType<boolean>) {
    this.conflictSource.value(guest);
    return this;
  }
}
