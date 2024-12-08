import { GuestObjectType } from 'patron-oop';
import { Ref, ref } from '@vue/runtime-core';

export class VueRefPatron<T> implements GuestObjectType<T> {
  private readonly innerRef: Ref<T | undefined>;

  public constructor(defaultValue: T | undefined = undefined) {
    this.innerRef = ref(defaultValue) as Ref<T>;
  }

  public get value(): T {
    return this.innerRef.value as T;
  }

  public ref<CT = undefined>(): Ref<CT extends undefined ? T : CT> {
    return this.innerRef as Ref<CT extends undefined ? T : CT>;
  }

  public give(value: T): this {
    this.innerRef.value = value;
    return this;
  }

  public introduction() {
    return 'patron' as const;
  }
}
