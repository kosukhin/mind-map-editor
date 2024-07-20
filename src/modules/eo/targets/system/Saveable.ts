export interface Saveable<T, R> {
  save(value: T): R;
}
