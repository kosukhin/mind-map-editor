import { RuntimeError } from '@/modules/system/error/RuntimeError';
import { BrowserFileType } from '@/modules/integration/browser/file/BrowserFileType';

export class BrowserFileSaved implements BrowserFileType {
  public constructor(private fileHandler: FileSystemFileHandle) {}

  public save(content: string): this {
    this.fileHandler.createWritable().then((writable) => {
      writable
        .write(content)
        .catch((e) => {
          throw new RuntimeError('Cant save file in browser', { cause: e });
        });
      return writable;
    })
      .then((writable) => {
        writable
          .close()
          .catch((e) => {
            throw new RuntimeError('Cant close written file in browser', { cause: e });
          });
      });
    return this;
  }
}
