import { AnyFn } from '@/entities/Utils';

export const doLater = <T extends AnyFn>(fn: T, ...args: Parameters<T>) => () => fn(...args);
