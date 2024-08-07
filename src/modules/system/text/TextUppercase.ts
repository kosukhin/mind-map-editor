import { Text } from '@/modules/system/text/Text';

export class TextUppercase implements Text {
  public constructor(private baseText: Text) {}

  public value(): string {
    return this.baseText.value().toUpperCase();
  }
}
