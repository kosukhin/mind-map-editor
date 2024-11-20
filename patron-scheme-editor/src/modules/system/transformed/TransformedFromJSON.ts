import { Transformed } from '@/modules/system/transformed/Transformed';

export class TransformedFromJSON<To> implements Transformed<To> {
  public constructor(private content: string) {}

  result(): To {
    return JSON.parse(this.content) as To;
  }
}
