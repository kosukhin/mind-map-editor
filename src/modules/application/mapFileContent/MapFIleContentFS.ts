import { MapFileContent } from '@/modules/application/mapFileContent/MapFileContent';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { SystemFileFromHandler } from '@/modules/system/file/SystemFileFromHandler';
import { Target } from '@/modules/system/target/Target';
import { TargetPool } from '@/modules/system/target/TargetPool';
import { RuntimeError } from '@/modules/system/error/RuntimeError';
import { TargetDynamic } from '@/modules/system/target/TargetDynamic';

export class MapFileContentFS implements MapFileContent, Target<string> {
  private contentTargets = new TargetPool();

  private fileHandler: FileSystemFileHandle | null = null;

  public content(target: Target<string>): this {
    try {
      new BrowserLaunchQueue().fileHandler(
        new TargetDynamic((value: FileSystemFileHandle) => {
          new SystemFileFromHandler(value)
            .content(new TargetDynamic((content: string) => {
              target.receive(content);
              this.contentTargets.receive(content);
            }));
        }),
      );

      return this;
    } catch (e) {
      throw new RuntimeError('Cant get content for map file FS', { cause: e });
    }
  }

  public receive(value: string): this {
    try {
      console.log('write to file', this.fileHandler, value);
      return this;
    } catch (e) {
      throw new RuntimeError('Cant handle receive for map file FS', { cause: e });
    }
  }

  public contentPool(): TargetPool<string> {
    return this.contentTargets;
  }
}
