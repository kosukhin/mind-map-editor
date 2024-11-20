import { Guest, GuestAwareType, PatronPool } from 'patron-oop';
import { Ref, watch } from 'vue';

export class VueSource<T> implements GuestAwareType<T> {
  private pool = new PatronPool<T>(this);

  public constructor(private refSource: Ref<T | undefined>) {
    watch(
      refSource,
      (lastValue) => {
        if (lastValue !== undefined) {
          this.pool.give(lastValue);
        }
      },
      {
        deep: true,
      },
    );
  }

  public value(guest: Guest<T>) {
    if (this.refSource.value) {
      guest.give(this.refSource.value);
    }
    this.pool.add(guest);
    return this;
  }
}
