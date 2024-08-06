import { Ref } from 'vue';

export interface VueRef<T> {
  ref(): Ref<T>
}
