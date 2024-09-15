import { GuestType, ReceiveOptions } from '@/modules/system/guest/GuestType';
import { PoolType } from '@/modules/system/guest/PoolType';

type PoolAware = {
  pool?: PoolType
}

export class PatronOnce<T> implements GuestType<T> {
  private received = false;

  public constructor(private baseGuest: GuestType<T>) {}

  public introduction() {
    return 'patron' as const;
  }

  public receive(value: T, options?: ReceiveOptions): this {
    if (!this.received) {
      this.baseGuest.receive(value, options);
    }

    const data = options?.data as PoolAware;
    // Если есть пул, то удаляем себя из пула
    if (data?.pool) {
      data.pool.remove(this);
    }

    return this;
  }
}
