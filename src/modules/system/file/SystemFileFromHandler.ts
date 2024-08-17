import { SystemFile as AppFile } from '@/modules/system/file/SystemFile';
import { Guest } from '@/modules/system/guest/Guest';
import { RuntimeError } from '@/modules/system/error/RuntimeError';

const filesContents = new WeakMap();
export class SystemFileFromHandler implements AppFile {
  public constructor(private fileHandler: FileSystemFileHandle) {}

  public content(target: Guest<string>) {
    this.fileHandler.getFile()
      .then(
        (file) => this.readFile(file),
      )
      .then((content) => {
        target.receive(content);
      })
      .catch((error) => {
        throw new RuntimeError('Problem when reading file in SystemFileFromHandler', { cause: error });
      });
    return this;
  }

  public save(content: string): this {
    throw new Error('Method not implemented.');
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
