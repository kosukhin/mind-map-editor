import { Text } from '@/objects/text/Text';

export class TextUppercase implements Text {
  public constructor(private baseText: Text) {}

  clone(str: string): Text {
    return new TextUppercase(this.baseText.clone(str));
  }

  string(): string {
    return this.baseText.string().toUpperCase();
  }
}
