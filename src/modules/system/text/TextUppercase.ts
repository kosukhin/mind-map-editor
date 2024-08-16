import { Text } from '@/modules/system/text/Text';

export class TextUppercase implements Text {
  public constructor(private baseText: Text) {}

  exists(): boolean {
    return this.baseText.exists();
  }

  result(): string {
    return this.baseText.result();
  }

  replaceResult(newResult: string): this {
    this.replaceResult(newResult);
    return this;
  }

  public value(): string {
    return this.baseText.result().toUpperCase();
  }
}
