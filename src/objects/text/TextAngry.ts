import { Text } from '@/objects/text/Text';

export class TextAngry implements Text {
  public constructor(private baseText: Text) {}

  clone(str: string): Text {
    return new TextAngry(this.baseText.clone(str));
  }

  string(): string {
    return `${this.baseText.string()}!!!`;
  }
}
