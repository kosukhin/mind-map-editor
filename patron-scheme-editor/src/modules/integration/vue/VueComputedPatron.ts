// @ts-ignore
import { ref, Ref } from 'vue';

export class VueComputedPatron<T> {
  private readonly innerRef: Ref<T | undefined>;

  public constructor(
    private executor: (theRef: Ref<T>) => void,
    defaultValue: T | undefined = undefined,
  ) {
    this.innerRef = ref(defaultValue) as Ref<T>;
  }

  public ref<CT = undefined>(): Ref<CT extends undefined ? T : CT> {
    this.executor(this.innerRef as Ref<T>);
    return this.innerRef as Ref<CT extends undefined ? T : CT>;
  }
}
