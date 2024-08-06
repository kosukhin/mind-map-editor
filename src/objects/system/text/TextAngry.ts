import { Text } from '@/objects/system/text/Text';

export class TextAngry implements Text {
  public constructor(private baseText: Text) {}

  public value(): string {
    return `${this.baseText.value()}!!!`;
  }
}
