import { Guest } from '@/modules/system/guest/Guest';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { watch } from 'vue';

export class VueRefPatronDuplex<T> implements Guest<T> {
  private refWatcherCreated = false;

  public constructor(private basePatron: VueRefPatron<T>, private guest: Guest<T>) {}

  public ref() {
    return this.basePatron.ref();
  }

  public introduction() {
    return this.basePatron.introduction();
  }

  public receive(value: T): this {
    this.basePatron.receive(value);
    if (!this.refWatcherCreated) {
      this.refWatcherCreated = true;
      watch(this.basePatron.ref(), (newValue) => {
        if (newValue) {
          this.guest.receive(newValue);
        }
      }, {
        deep: true,
      });
    }
    return this;
  }
}
