import { Valuable } from '@/modules/system/valuable/Valuable';
import { Result } from '@/modules/system/result/Result';

export type ResultValuable<T> = Valuable<Result<T>>
export type ResultValuableParam<T> = T extends ResultValuable<infer P> ? P : never;
