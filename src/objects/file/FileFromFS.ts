import { File } from '@/objects/file/File';

export class FileFromFS implements File {
  content(): string {
    throw new Error('Method not implemented.');
  }
}
