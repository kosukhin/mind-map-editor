export interface Target<T> {
  receive(value: T): this;
}
