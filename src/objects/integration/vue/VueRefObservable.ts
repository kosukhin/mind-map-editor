import { VueRef } from '@/objects/integration/vue/VueRef';
import { Observable } from '@/objects/system/observable/Observable';
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
