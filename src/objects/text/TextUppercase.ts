import { Text } from '@/objects/text/Text';

export class TextUppercase implements Text {
  public constructor(private baseText: Text) {}

  entity(): string {
    return this.baseText.entity().toUpperCase();
  }
}
