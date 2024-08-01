import { Text } from '@/objects/text/Text';

export class TextOf implements Text {
  public constructor(private str: string) {}

  clone(str: string): Text {
    return new TextOf(str);
  }

  string(): string {
    return this.str;
  }
}
