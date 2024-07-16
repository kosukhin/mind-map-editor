import { MapFile } from '@/entities/Map';
import { FileOpened } from '@/modules/eo/FileOpened';
import { JSONContent } from '@/modules/eo/JSONContent';

export class Editor {
  public constructor(private file: FileOpened) {}

  public currentMap() {
    return this.file.content().chainFilled<MapFile>((content) => new JSONContent(content).parse());
  }
}
