import { MapFile, MapStructure } from '@/entities/Map';
import { Convertable } from '@/modules/eo/targets/system/Convertable';
import { Hashable } from '@/modules/eo/targets/system/Hashable';
import { Optional } from '@/modules/eo/targets/system/Optional';
import { Saveable } from '@/modules/eo/targets/system/Saveable';
import { Valueable } from '@/modules/eo/targets/system/Valueable';
import { OptionalAsync } from '@/modules/eo/v2/system/OptionalAsync';

export class BrowserMapFile implements Saveable<MapStructure>, Valueable<Optional<MapFile>> {
  constructor(
    private fileHandler: Valueable<Optional<FileSystemFileHandle>>,
    private cache: Hashable<FileSystemFileHandle, MapFile>,
    private toMapStructure: Convertable<string, MapFile>,
  ) {}

  value() {
    return this.fileHandler.value().filled((fileHandler) => this.cache.key(fileHandler).empty(() => {
      const file = fileHandler.getFile();
      return new OptionalAsync(
        file
          .then((realFile) => new Response(realFile).text())
          .then((fileText) => {
            this.cache.setByKey(fileHandler, this.toMapStructure.convert(fileText));
          }),
      );
    })) as unknown as Optional<MapFile>;
  }

  save(value: MapStructure): this {
    console.log('save map', value);
    return this;
  }
}
