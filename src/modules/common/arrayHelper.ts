import { AnyFn } from '@/entities/Utils';

export const arrayHelper = {
  filter(arr: any[], cb: AnyFn) {
    return arr.filter(cb);
  },
};
