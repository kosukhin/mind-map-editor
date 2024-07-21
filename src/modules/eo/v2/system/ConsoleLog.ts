import { Doable } from '@/modules/eo/targets/system/Doable';
import { Optional } from '@/modules/eo/targets/system/Optional';

export class ConsoleLog implements Doable<unknown[], void> {
  constructor(private loggingPossible: Optional<boolean>) {}

  do(input: unknown[]): void {
    this.loggingPossible.filled((value) => {
      console.log('[LOGGER]', ...(input.map((v) => JSON.stringify(v))));
      return value;
    });
  }
}
