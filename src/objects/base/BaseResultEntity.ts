import { BaseEntity } from '@/objects/base/BaseEntity';
import { BaseResult } from '@/objects/base/BaseResult';

export type BaseResultEntity<T> = BaseEntity<BaseResult<T>>
export type BaseResultParam<T> = T extends BaseResultEntity<infer P> ? P : never;
