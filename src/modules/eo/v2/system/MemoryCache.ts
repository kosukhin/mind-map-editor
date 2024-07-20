import { Doable } from '@/modules/eo/targets/system/Doable';
import { Hashable } from '@/modules/eo/targets/system/Hashable';
import { Optional } from '@/modules/eo/targets/system/Optional';
import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';

export class MemoryCache<Key extends object, T> implements Hashable<Key, T> {
  private cache = new WeakMap<Key, T>();

  constructor(private log: Doable<unknown[], void>) {}

  key(key: Key): Optional<T> {
    return new OptionalSync(this.cache.get(key) ?? null as T).filled((value) => {
      this.log.do(['MemoryCache', 'value found in cache by key', key, value]);
      return value;
    });
  }

  setByKey(key: Key, value: T): this {
    this.log.do(['MemoryCache', 'set value in cache by key', key]);
    this.cache.set(key, value);
    return this;
  }
}
