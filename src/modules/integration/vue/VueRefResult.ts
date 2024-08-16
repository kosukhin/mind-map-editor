import { VueRef } from '@/modules/integration/vue/VueRef';
import { ResultObservable } from '@/modules/system/result/ResultObservable';
import {
  ref,
} from 'vue';

export class VueRefResult<T> implements VueRef<T | undefined> {
  private innerRef = ref<T>();

  constructor(private result: ResultObservable<T>) {}

  ref() {
    if (this.result.exists()) {
      this.innerRef.value = this.result.result();
    }

    this.result.channel().subscribe({
      notify: (newValue) => {
        this.innerRef.value = newValue.result();
      },
    });

    return this.innerRef;
  }
}
