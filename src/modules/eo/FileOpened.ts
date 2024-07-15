import { TruthyAsyncOptional } from '@/modules/eo/TruthyAsyncOptional';

export class FileOpened {
  private filesContents = new WeakMap();

  constructor(private fileHandler: FileSystemFileHandle) {}

  public content(): TruthyAsyncOptional<string> {
    const file = this.fileHandler.getFile();
    const promise = file.then((realFile) => {
      const cachedContent = this.filesContents.get(realFile);
      return cachedContent || new Response(realFile).text().then((content) => {
        this.filesContents.set(realFile, content);
        return content;
      });
    });

    return new TruthyAsyncOptional(promise);
  }
}
