export interface MapPart<T> {
  content(): T;
  save(value: T): this;
}
