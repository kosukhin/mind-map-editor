import { createMap } from '@/utils/map';
import { MapFile } from '@/entities/Map';
import { Factory } from '@/modules/eo/targets/system/Factory';
import { Optional } from '@/modules/eo/targets/system/Optional';
import { BrowserMapFile } from '@/modules/eo/v2/application/BrowserMapFile';
import { ConsoleLog } from '@/modules/eo/v2/system/ConsoleLog';
import { MemoryCache } from '@/modules/eo/v2/system/MemoryCache';
import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';
import { JSONString } from '../../src/modules/eo/v2/application/JSONString';
import { PropertyPath } from '../../src/modules/eo/v2/system/PropertyPath';
import { Value } from '../../src/modules/eo/v2/system/Value';

const log = new ConsoleLog(new OptionalSync(true));
const fileHandler = { fileHandler: true };
const fakeLaunchParams = new Value(new OptionalSync({
  files: [
    {
      toJSON() {
        return '{"name": "fake handler"}';
      },
      getFile() {
        return Promise.resolve(fileHandler);
      },
      createWritable() {
        return Promise.resolve({
          write(content: any) {
            log.do(['write content', content]);
          },
        });
      },
    },
  ],
}));

const fakeFileResponse = new class implements Factory<[File], Optional<string>> {
  create() {
    log.do(['fakeFileResponse', 'called']);
    return new OptionalSync('{"my": "file"}');
  }
}();
const handlerValue = new PropertyPath<FileSystemFileHandle>('files[0]', fakeLaunchParams);

describe('BrowserMapFile', () => {
  it('check file handler receive', () => {
    handlerValue.value().filled((fh) => {
      console.log('handler is', fh);
      handlerValue.value().filled((fh2) => {
        console.log('seocnd handler is', fh2, 'they equals', fh === fh2);
      });
    });
  });

  it('mapfile read', () => {
    handlerValue.value().filled((fh2) => {
      console.log('mapfile handler is', fh2);
    });

    const mapFile = new BrowserMapFile(
      handlerValue,
      new MemoryCache<FileSystemFileHandle, MapFile>(log),
      new JSONString(),
      log,
      fakeFileResponse,
    );

    mapFile.value().filled((mapFileContent) => {
      console.log(mapFileContent);
    });
    // Второй запрос из кэша
    setTimeout(() => {
      mapFile.value().filled((mapFileContent) => {
        console.log('second', mapFileContent);
      });
    }, 1000);
  });

  it('mapfile write', () => {
    console.log('try to write');
    const mapFile = new BrowserMapFile(
      handlerValue,
      new MemoryCache<FileSystemFileHandle, MapFile>(log),
      new JSONString(),
      log,
      fakeFileResponse,
    );

    mapFile.save({
      now: {
        ...createMap('name'),
      },
    });
  });
});
