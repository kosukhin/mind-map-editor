import { Optional } from '@/modules/eo/targets/system/Optional';
import { Valueable } from '@/modules/eo/targets/system/Valueable';
import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';

export class ValueOpitonal<T> implements Valueable<Optional<T>> {
  constructor(private innerValue: Valueable<T>) {}

  value(): Optional<T> {
    return new OptionalSync(this.innerValue.value());
  }
}
