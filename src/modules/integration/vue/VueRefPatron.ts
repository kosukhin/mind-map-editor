import { Ref, ref } from 'vue';
import { GuestType } from '@/modules/system/guest/GuestType';

export class VueRefPatron<T> implements GuestType<T> {
  private readonly innerRef: Ref<T | undefined>;

  public constructor(defaultValue: T | undefined = undefined) {
    this.innerRef = ref(defaultValue) as Ref<T>;
  }

  public ref<CT = undefined>(): Ref<CT extends undefined ? T : CT> {
    return this.innerRef as Ref<CT extends undefined ? T : CT>;
  }

  public receive(value: T): this {
    this.innerRef.value = value;
    return this;
  }

  public introduction() {
    return 'patron' as const;
  }
}
