import { File as AppFile } from '@/modules/system/file/File';
import { Result } from '@/modules/system/result/Result';
import { ResultPromise } from '@/modules/system/result/ResultPromise';

const filesContents = new WeakMap();
export class FileFromHandler implements AppFile {
  public constructor(private fileHandler: FileSystemFileHandle) {}

  public content(): Result<string> {
    return new ResultPromise(
      this.fileHandler.getFile().then(
        (file) => this.readFile(file),
      ),
    );
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
