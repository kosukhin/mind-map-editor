import { give, GuestAwareType, GuestType } from 'patron-oop';

export class SharingPossible implements GuestAwareType<boolean> {
  value(guest: GuestType<boolean>) {
    if (!navigator.share || !navigator.canShare) {
      give(false, guest);
      return this;
    }

    const testFile = new File(['foo'], 'foo.txt', { type: 'text/plain' });
    const data = { files: [testFile] };

    give(navigator.canShare(data), guest);

    return this;
  }
}
