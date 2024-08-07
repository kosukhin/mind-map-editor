import { VueRef } from '@/modules/integration/vue/VueRef';
import { Observable } from '@/modules/system/observable/Observable';
import {
  ref,
} from 'vue';

export class VueRefObservable<T> implements VueRef<T | undefined> {
  private innerRef = ref<T>();

  constructor(private observable: Observable<T>) {}

  ref() {
    this.observable.subscribe({
      notify: (value: T) => {
        this.innerRef.value = value;
      },
    });

    return this.innerRef;
  }
}
