import { Target } from '@/modules/system/target/Target';
import { ref } from 'vue';

export class VueRefTarget<T> implements Target<T> {
  private innerRef = ref<T>();

  ref() {
    return this.innerRef;
  }

  receive(value: T): this {
    this.innerRef.value = value;
    return this;
  }
}
