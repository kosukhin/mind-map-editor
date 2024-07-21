import { Optional } from '@/modules/eo/targets/system/Optional';
import { Procedure, UnaryFn } from '@/modules/eo/TypesFunctions';

export class OptionalCallback<T> implements Optional<T> {
  private innerValue: T | null = null;

  private isPending = true;

  private pendingQueue: any[] = [];

  ;
  public constructor(executor: (resolver: (realValue: T | null) => void) => void) {
    const resolver = (realValue: T | null) => {
      this.innerValue = realValue;
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

  public filled(cb: UnaryFn<Exclude<T, null>>): Optional<T> {
    return new OptionalCallback((resolve) => {
      this.pendingQueue.push(() => {
        this.unwrapOptionalChain((value) => {
          if (!this.isValueEmpty(value)) {
            const newValue = cb(value as Exclude<T, null>);
            resolve(newValue ?? null);
          } else {
            resolve(null);
          }
        }, 'filled');
      });
      this.releasePendingQueue();
    });
  }

  public empty(cb: Procedure): Optional<T> {
    return new OptionalCallback((resolve) => {
      this.pendingQueue.push(() => {
        this.unwrapOptionalChain((value) => {
          if (this.isValueEmpty(value)) {
            const newValue = cb() as T | null;
            resolve(newValue ?? null as T);
          } else {
            resolve(value);
          }
        }, 'empty');
      });
      this.releasePendingQueue();
    });
  }

  protected isValueEmpty(value: unknown) {
    return value === null || value === undefined;
  }

  protected unwrapOptionalChain(cb: UnaryFn<T | null>, operationType: 'filled' | 'empty') {
    if (this.innerValue instanceof OptionalCallback) {
      this.innerValue[operationType](cb as any);
    } else {
      cb(this.innerValue);
    }
  }
}
