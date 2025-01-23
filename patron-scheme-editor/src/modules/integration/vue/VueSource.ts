import { give, GuestAwareObjectType, GuestType, PatronPool } from 'patron-oop';
// @ts-ignore
import { Ref, watch } from 'vue';

export class VueSource<T> implements GuestAwareObjectType<T> {
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

  public value(guest: GuestType<T>) {
    if (this.refSource.value) {
      give(this.refSource.value, guest);
    }
    this.pool.add(guest);
    return this;
  }
}
