import { ReceiveOptions } from '@/modules/system/guest/GuestType';

export type GuestExecutorType<T> = (value: T, options?: ReceiveOptions) => void;
