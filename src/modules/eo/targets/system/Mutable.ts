export interface Mutable<T> {
  set(value: T): Mutable<T>;
}
