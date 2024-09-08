import { GuestType, ReceiveOptions } from '@/modules/system/guest/GuestType';
import { PoolType } from '@/modules/system/guest/PoolType';

export class PatronOnce<T> implements GuestType<T> {
  private received = false;

  public constructor(private receiver: (value: T, options?: ReceiveOptions) => void) {}

  public introduction() {
    return 'patron' as const;
  }

  public receive(value: T, options?: ReceiveOptions): this {
    if (!this.received) {
      this.receiver(value, options);
    }
    const pool = options?.specificData?.pool as PoolType<T>;
    // Если есть пул, то удаляем себя из него
    if (pool) {
      pool.remove(this);
    }
    return this;
  }
}
