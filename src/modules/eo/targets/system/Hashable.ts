import { Optional } from '@/modules/eo/targets/system/Optional';

export interface Hashable<Key, Value> {
  key(keyName: Key): Optional<Value>;
  setByKey(keyName: Key, value: Value): this;
}
