import { OptionalSync } from '@/modules/eo/OptionalSync';

export class FileOpenedCache {
  private filesContents = new WeakMap();

  public cachedContent(file: File) {
    return new OptionalSync(this.filesContents.get(file) ?? null);
  }

  public remember(file: File, content: string) {
    this.filesContents.set(file, content);
    return this;
  }
}
