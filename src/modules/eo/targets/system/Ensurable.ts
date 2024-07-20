import { Optional } from '@/modules/eo/targets/system/Optional';

export interface Ensurable<T> {
  ensure(...args: unknown[]): Optional<T>
}
