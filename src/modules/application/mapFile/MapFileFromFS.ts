import { MapFile } from '@/modules/application/mapFile/MapFile';
import { MapFileStructure } from '@/modules/entities/MapStructures';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { FileFromHandler } from '@/modules/system/file/FileFromHandler';
import { Result } from '@/modules/system/result/Result';
import { ResultOf } from '@/modules/system/result/ResultOf';
import { TransformedFromJSON } from '@/modules/system/transformed/TransformedFromJSON';

/**
 * Считываем файл карты из ФС операционной системы
 */
export class MapFileFromFS implements MapFile {
  public constructor(private parent: MapFile) {}

  public setup(): MapFile {
    new BrowserLaunchQueue().fileHandler().channel().subscribe({
      notify: (fileHandleResult) => {
        new FileFromHandler(fileHandleResult.result())
          .content().channel().subscribe({
            notify: (fileContent) => {
              this.parent.value().replace(new ResultOf(
                new TransformedFromJSON<MapFileStructure>(fileContent.result())
                  .result(),
              ));
            },
          });
      },
    });

    this.parent.value().channel().subscribe({
      notify: (mapFileResult) => {
        console.log('save result to file', mapFileResult.result());
      },
    });

    return this;
  }

  public value(): Result<MapFileStructure> {
    return this.parent.value();
  }
}
