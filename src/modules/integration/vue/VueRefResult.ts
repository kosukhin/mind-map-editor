import { VueRef } from '@/modules/integration/vue/VueRef';
import { Result } from '@/modules/system/result/Result';
import {
  ref,
} from 'vue';

export class VueRefResult<T> implements VueRef<T | undefined> {
  private innerRef = ref<T>();

  constructor(private result: Result<T>) {}

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
