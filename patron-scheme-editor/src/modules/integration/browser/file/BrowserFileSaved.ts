import { RuntimeError } from '@/modules/system/error/RuntimeError';
import { BrowserFileType } from '@/modules/integration/browser/file/BrowserFileType';

export class BrowserFileSaved implements BrowserFileType {
  public constructor(private fileHandler: FileSystemFileHandle) {}

  public save(content: string): this {
    (this.fileHandler as any)
      .createWritable()
      .then((writable: any) => {
        writable.write(content).catch((e: Error) => {
          throw new RuntimeError('Cant save file in browser', { cause: e });
        });
        return writable;
      })
      .then((writable: any) => {
        writable.close().catch((e: Error) => {
          throw new RuntimeError('Cant close written file in browser', { cause: e });
        });
      });
    return this;
  }
}
