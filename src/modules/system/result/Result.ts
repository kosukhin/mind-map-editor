export interface Result<T> {
  exists(): boolean;
  result(): T;
  replaceResult(newResult: T): this;
}
