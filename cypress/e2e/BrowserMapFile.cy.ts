import { Logger } from '@/modules/eo/v2/system/Logger';
import { JSONStringFromObject } from '@/modules/eo/v2/application/JSONStringFromObject';
import { JSONObjectFromString } from '@/modules/eo/v2/application/JSONObjectFromString';
import { MemoryCache } from '@/modules/eo/v2/system/MemoryCache';
import { BrowserMapFile } from '@/modules/eo/v2/application/BrowserMapFile';
import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';
import { MapFile } from '@/entities/Map';
import { Factory } from '@/modules/eo/targets/system/Factory';
import { Optional } from '@/modules/eo/targets/system/Optional';
import { PropertyPath } from '../../src/modules/eo/v2/system/PropertyPath';
import { Value } from '../../src/modules/eo/v2/system/Value';

const fakeLaunchParams = new Value(new OptionalSync({
  files: [
    {
      getFile() {
        return Promise.resolve({});
      },
    },
  ],
}));

const fakeFileResponse = new class implements Factory<[File], Optional<string>> {
  create() {
    return new OptionalSync('{"my": "file"}');
  }
}();

const logger = new Logger(new OptionalSync(true));

describe('BrowserMapFile', () => {
  it('mapfile read', () => {
    const mapFile = new BrowserMapFile(
      new PropertyPath('files[0]', fakeLaunchParams),
      new MemoryCache<FileSystemFileHandle, MapFile>(),
      new JSONObjectFromString(),
      new JSONStringFromObject(),
      logger,
      fakeFileResponse,
    );

    mapFile.value().filled((mapFileContent) => {
      console.log(mapFileContent);
    });
    // Второй запрос из кэша
    mapFile.value().filled((mapFileContent) => {
      console.log('second', mapFileContent);
    });
  });

  it('mapfile write', () => {
    console.log('try to write');
  });
});
