import { Optional } from '@/modules/eo/targets/system/Optional';
import { OptionalCallback } from '@/modules/eo/v2/system/OptionalCallback';

export class OptionalSync<T> extends OptionalCallback<T> implements Optional<T> {
  public constructor(value: T | null) {
    super((resolve) => {
      resolve(value);
    });
  }
}
