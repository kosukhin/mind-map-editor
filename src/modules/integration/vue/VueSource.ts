import { Guest } from '@/modules/system/guest/Guest';
import { Ref, watch } from 'vue';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';

export class VueSource<T> implements GuestAwareType<T> {
  private pool = new PatronPool<T>(this);

  public constructor(
    private refSource: Ref<T | undefined>,
  ) {
    watch(refSource, (lastValue) => {
      if (lastValue !== undefined) {
        this.pool.receive(lastValue);
      }
    }, {
      deep: true,
    });
  }

  public receiving(guest: Guest<T>) {
    if (this.refSource.value) {
      guest.receive(this.refSource.value);
    }
    this.pool.add(guest);
    return this;
  }
}
