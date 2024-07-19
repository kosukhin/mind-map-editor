import { Optional } from '@/modules/eo/targets/system/Optional';
import { Valueable } from '@/modules/eo/targets/system/Valueable';
import { get } from 'lodash';

export class PropertyPath<T> implements Valueable<Optional<T>> {
  constructor(private path: string, private targetValue: Valueable<Optional<unknown>>) {}

  value(): Optional<T> {
    return this.targetValue.value().filled((realValue) => get(realValue, this.path, null)) as Optional<T>;
  }
}
