import { Hashable } from '@/modules/eo/targets/system/Hashable';
import { Optional } from '@/modules/eo/targets/system/Optional';
import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';

export class MemoryCache<Key extends object, T> implements Hashable<Key, T> {
  private cache = new WeakMap<Key, T>();

  key(key: Key): Optional<T> {
    return new OptionalSync(this.cache.get(key) as T);
  }

  setByKey(key: Key, value: T): this {
    this.cache.set(key, value);
    return this;
  }
}
