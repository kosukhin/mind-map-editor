import { Guest } from '@/modules/system/guest/Guest';
import { ref } from 'vue';

export class VueRefPatron<T> implements Guest<T> {
  private innerRef = ref<T>();

  public ref() {
    return this.innerRef;
  }

  public receive(value: T): this {
    this.innerRef.value = value;
    return this;
  }

  public introduction() {
    return 'patron' as const;
  }
}
