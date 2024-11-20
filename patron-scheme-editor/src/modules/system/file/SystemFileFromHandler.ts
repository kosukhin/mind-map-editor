import { SystemFileType } from '@/modules/system/file/SystemFileType';
import { RuntimeError } from '@/modules/system/error/RuntimeError';
import { GuestObjectType } from 'patron-oop';

const filesContents = new WeakMap();
export class SystemFileFromHandler implements SystemFileType {
  public constructor(private fileHandler: FileSystemFileHandle) {}

  public content(target: GuestObjectType<string>) {
    this.fileHandler
      .getFile()
      .then((file) => this.readFile(file))
      .then((content) => {
        target.give(content);
      })
      .catch((error) => {
        throw new RuntimeError('Problem when reading file in SystemFileFromHandler', {
          cause: error,
        });
      });
    return this;
  }

  private async readFile(blob: File) {
    let result = '';
    if (!filesContents.has(blob)) {
      result = await new Response(blob as any).text();
      filesContents.set(blob, result);
    } else {
      result = filesContents.get(blob);
    }
    return result;
  }
}
