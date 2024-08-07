import { Text } from '@/modules/system/text/Text';

export class TextOf implements Text {
  public constructor(private str: string) {}

  public value(): string {
    return this.str;
  }
}
