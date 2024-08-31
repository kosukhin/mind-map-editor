export interface FactoryType<T> {
  create(value: unknown): T;
}
