import { Optional } from '@/modules/eo/targets/system/Optional';
import { Valueable } from '@/modules/eo/targets/system/Valueable';
import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';
import { get } from 'lodash';

export class PropertyPath<T> implements Valueable<Optional<T>> {
  constructor(private path: string, private targetValue: Valueable<unknown>) {}

  value(): Optional<T> {
    return new OptionalSync(get(this.targetValue.value(), this.path, null));
  }
}
