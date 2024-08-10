import { Transformed } from '@/modules/system/transformed/Transformed';

export class TransformedToJSON<From> implements Transformed<string> {
  public constructor(private content: From) {}

  result(): string {
    return JSON.stringify(this.content);
  }
}
