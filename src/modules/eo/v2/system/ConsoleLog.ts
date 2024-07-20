import { Doable } from '@/modules/eo/targets/system/Doable';
import { Optional } from '@/modules/eo/targets/system/Optional';

export class ConsoleLog implements Doable<any[], void> {
  constructor(private loggingPossible: Optional<boolean>) {}

  do(input: any[]): void {
    this.loggingPossible.filled((value) => {
      console.log('[LOGGER]', ...(input.map((v) => JSON.stringify(v))));
      return value;
    });
  }
}
