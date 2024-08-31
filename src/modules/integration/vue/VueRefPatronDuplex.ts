import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { GuestType } from '@/modules/system/guest/GuestType';
import { watch } from 'vue';

export class VueRefPatronDuplex<T> implements GuestType<T> {
  public constructor(
    private basePatron: VueRefPatron<T>,
    private guest: GuestType<T>,
    private refWatcherCreated = false,
  ) {}

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
