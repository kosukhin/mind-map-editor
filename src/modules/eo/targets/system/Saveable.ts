export interface Saveable<T> {
  save(value: T): this;
}
