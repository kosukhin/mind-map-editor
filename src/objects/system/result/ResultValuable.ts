import { Valuable } from '@/objects/system/valuable/Valuable';
import { Result } from '@/objects/system/result/Result';

export type ResultValuable<T> = Valuable<Result<T>>
export type ResultValuableParam<T> = T extends ResultValuable<infer P> ? P : never;
