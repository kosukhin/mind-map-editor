import { Text } from '@/objects/system/text/Text';

export class TextOf implements Text {
  public constructor(private str: string) {}

  public value(): string {
    return this.str;
  }
}
