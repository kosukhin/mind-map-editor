import { RuntimeError } from '@/modules/system/error/RuntimeError';
import { SystemFileType } from '@/modules/system/file/SystemFileType';
import { GuestObjectType } from 'patron-oop';

export class SystemFileFromHandler implements SystemFileType {
  public constructor(private fileHandler: FileSystemFileHandle) {}

  public content(target: GuestObjectType<string>) {
    this.fileHandler
      .getFile()
      .then(async (file) => await new Response(file).text())
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
}
