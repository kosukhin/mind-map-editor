import { MapFile } from '@/entities/Map';
import { ConvertableRevertable } from '@/modules/eo/targets/system/ConvertableRevertable';
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
    private mapFileToString: ConvertableRevertable<MapFile, string>,
    private log: Doable<unknown[], void>,
    private responseFactory: Factory<[File], Optional<string>>,
  ) {}

  value() {
    return this.fileHandler.value().filled((fileHandler) => {
      this.log.do(['BrowserMapFile', 'fileHandler=', fileHandler]);
      const cacheResult = this.cache.key(fileHandler);
      return cacheResult.empty(() => new OptionalAsync(
        fileHandler.getFile()
          .then((realFile) => this.responseFactory.create(realFile))
          .then((fileText) => fileText.filled((realFileText) => {
            this.log.do(['BrowserMapFile', 'map as text received']);
            const object = this.mapFileToString.revert(realFileText);
            this.cache.setByKey(fileHandler, object);
            return object;
          })),
      ));
    }) as unknown as Optional<MapFile>;
  }

  save(value: MapFile) {
    this.log.do(['BrowserMapFile', 'inside save']);
    return this.fileHandler.value()
      .filled((fileHandler) => new OptionalAsync(fileHandler.createWritable()
        .then((writable) => {
          this.log.do(['BrowserMapFile', 'writable ready!']);
          writable.write(this.mapFileToString.convert(value)).finally(() => writable.close());
          return true;
        }).catch(() => false))) as unknown as Optional<boolean>;
  }
}
