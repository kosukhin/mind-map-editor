import { Text } from '@/objects/text/Text';

export class TextAngry implements Text {
  public constructor(private baseText: Text) {}

  entity(): string {
    return `${this.baseText.entity()}!!!`;
  }
}
