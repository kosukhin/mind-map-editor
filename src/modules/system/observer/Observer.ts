export interface Observer<T> {
  notify(value: T): void;
}
