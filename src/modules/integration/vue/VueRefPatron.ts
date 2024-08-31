import { ref } from 'vue';
import { GuestType } from '../../system/guest/GuestType';

export class VueRefPatron<T> implements GuestType<T> {
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
