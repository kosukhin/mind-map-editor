import { Optional } from '@/modules/eo/targets/system/Optional';
import { Procedure, UnaryFn } from '@/modules/eo/TypesFunctions';

export class OptionalCallback<T> implements Optional<T> {
  private value: T | null = null;

  private isPending = true;

  private pendingQueue: any[] = [];

  ;
  public constructor(executor: (resolver: (realValue: T | null) => void) => void) {
    const resolver = (realValue: T | null) => {
      this.value = realValue;
      this.isPending = false;
      this.releasePendingQueue();
    };
    executor(resolver);
  }

  private releasePendingQueue() {
    if (this.isPending === false) {
      this.pendingQueue.forEach((fn) => fn());
      this.pendingQueue = [];
    }
  }

  filled(cb: UnaryFn<Exclude<T, null>>): Optional<T> {
    return new OptionalCallback((resolve) => {
      this.pendingQueue.push(() => {
        this.unwrapOptionalChain((value) => {
          if (value !== null || value !== undefined) {
            const newValue = cb(value as Exclude<T, null>);
            resolve(newValue ?? null);
          }
        }, 'filled');
      });
      this.releasePendingQueue();
    });
  }

  empty(cb: Procedure): Optional<T> {
    return new OptionalCallback((resolve) => {
      this.pendingQueue.push(() => {
        this.unwrapOptionalChain((value) => {
          if (value === null || value === undefined) {
            const newValue = cb() as T | null;
            resolve(newValue ?? null as T);
          }
        }, 'empty');
      });
      this.releasePendingQueue();
    });
  }

  protected unwrapOptionalChain(cb: UnaryFn<T | null>, operationType: 'filled' | 'empty') {
    if (this.value instanceof OptionalCallback) {
      this.value[operationType](cb as any);
    } else {
      cb(this.value);
    }
  }
}
