import { Ensurable } from '@/modules/eo/targets/system/Ensurable';
import { Optional } from '@/modules/eo/targets/system/Optional';
import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';

export class Condition implements Ensurable<boolean> {
  constructor(private executor: () => boolean) {}

  ensure(): Optional<boolean> {
    return new OptionalSync(this.executor() === false ? null : true);
  }
}
