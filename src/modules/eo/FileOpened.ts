import { OptionalAsync } from '@/modules/eo/OptionalAsync';
import { FileOpenedCache } from '@/modules/eo/FileOpenedCache';

export class FileOpened {
  public constructor(private fileHandler: FileSystemFileHandle, private cache: FileOpenedCache) {}

  public content(): OptionalAsync<string> {
    const file = this.fileHandler.getFile();
    const promise: Promise<string> = new Promise((resolve, reject) => {
      file.then((realFile) => {
        this.cache.cachedContent(realFile).filled((realContent) => {
          resolve(realContent);
        }).empty(() => {
          new Response(realFile).text().then((content) => {
            this.cache.remember(realFile, content);
            resolve(content);
          }).catch(reject);
        });
      }).catch(reject);
    });
    return new OptionalAsync(promise);
  }
}
