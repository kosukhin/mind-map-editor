export interface BaseObserver<T> {
  notify(value: T): void;
}
