import { Guest, GuestAwareType, PatronPool } from 'patron-oop';
// @ts-ignore
import { Ref, watch } from 'vue';

export class VueSource<T> implements GuestAwareType<T> {
  private pool = new PatronPool<T>(this);

  public constructor(private refSource: Ref<T | undefined>) {
    watch(
      refSource,
      (lastValue: any) => {
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
