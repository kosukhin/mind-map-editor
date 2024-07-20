export interface Doable<T, R> {
  do(input: T): R;
}
