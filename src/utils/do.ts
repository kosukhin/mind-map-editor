import { AnyFn } from '@/entities/Utils';

export const dof = (fn: AnyFn, ...args: any[]) => fn(...args);
