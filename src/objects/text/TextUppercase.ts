import { Text } from '@/objects/text/Text';

export class TextUppercase implements Text {
  public constructor(private baseText: Text) {}

  public entity(): string {
    return this.baseText.entity().toUpperCase();
  }
}
