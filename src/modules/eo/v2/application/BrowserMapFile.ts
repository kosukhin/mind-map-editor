import { MapFile } from '@/entities/Map';
import { Convertable } from '@/modules/eo/targets/system/Convertable';
import { Doable } from '@/modules/eo/targets/system/Doable';
import { Factory } from '@/modules/eo/targets/system/Factory';
import { Hashable } from '@/modules/eo/targets/system/Hashable';
import { Optional } from '@/modules/eo/targets/system/Optional';
import { Saveable } from '@/modules/eo/targets/system/Saveable';
import { Valueable } from '@/modules/eo/targets/system/Valueable';
import { OptionalAsync } from '@/modules/eo/v2/system/OptionalAsync';

export class BrowserMapFile implements Saveable<MapFile, Optional<boolean>>, Valueable<Optional<MapFile>> {
  constructor(
    private fileHandler: Valueable<Optional<FileSystemFileHandle>>,
    private cache: Hashable<FileSystemFileHandle, MapFile>,
    private toMapStructure: Convertable<string, MapFile>,
    private toMapFileText: Convertable<MapFile, string>,
    private logger: Doable<unknown[], void>,
    private responseFactory: Factory<[File], Optional<string>>,
  ) {}

  value() {
    return this.fileHandler.value().filled((fileHandler) => {
      this.logger.do(['BrowserMapFile', 'fileHandler=', fileHandler]);
      return this.cache.key(fileHandler).empty(() => new OptionalAsync(
        fileHandler.getFile()
          .then((realFile) => this.responseFactory.create(realFile))
          .then((fileText) => fileText.filled((realFileText) => {
            this.logger.do(['BrowserMapFile', 'map as text received']);
            const object = this.toMapStructure.convert(realFileText);
            this.cache.setByKey(fileHandler, object);
            return object;
          })),
      ));
    }) as unknown as Optional<MapFile>;
  }

  save(value: MapFile) {
    this.logger.do(['BrowserMapFile', 'inside save']);
    return this.fileHandler.value()
      .filled((fileHandler) => new OptionalAsync(fileHandler.createWritable()
        .then((writable) => {
          this.logger.do(['BrowserMapFile', 'writable ready!']);
          writable.write(this.toMapFileText.convert(value)).finally(() => writable.close());
          return true;
        }).catch(() => false))) as unknown as Optional<boolean>;
  }
}
