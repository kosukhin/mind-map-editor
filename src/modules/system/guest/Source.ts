import { GuestType } from '@/modules/system/guest/GuestType';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';

export class Source<T> implements GuestAwareType<T>, GuestType<T> {
  private pool = new PatronPool(this);

  public constructor(private sourceDocument: T) {}

  public receive(value: T): this {
    this.sourceDocument = value;
    this.pool.receive(this.sourceDocument);
    return this;
  }

  public receiving(guest: GuestType<T>): this {
    this.pool.distribute(this.sourceDocument, guest);
    return this;
  }
}
