export interface InstanceType<T> {
  create(...args: unknown[]): T;
}
