import { MapFileContent } from "@/modules/application/mapFileContent/MapFileContent";
import { BrowserLaunchQueue } from "@/modules/integration/browser/launchQueue/BrowserLaunchQueue";
import { FileFromHandler } from "@/modules/system/file/FileFromHandler";
import { Target } from "@/modules/system/target/Target";
import { TargetPool } from "@/modules/system/target/TargetPool";

export class MapFileContentFS implements MapFileContent, Target<string> {
  private contentTargets = new TargetPool();
  private fileHandler: FileSystemFileHandle | null = null;

  public content(target: Target<string>): this {
    try {
      new BrowserLaunchQueue().fileHandler().channel().subscribe({
        notify: (fileHandleResult) => {
          new FileFromHandler(fileHandleResult.result())
            .content().channel().subscribe({
              notify: (fileContent) => {
                target.receive(fileContent.result());
                this.contentTargets.receive(fileContent.result());
              },
            });
        },
      });

      return this;
    } catch (e) {
      throw new Error('Cant get content for map file FS', {cause: e});
    }
  }

  public receive(value: string): this {
    try {
      console.log('write to file', this.fileHandler, value);
      return this;
    } catch (e) {
      throw new Error('Cant handle receive for map file FS', {cause: e})
    }
  }

  public contentPool(): TargetPool<string> {
    return this.contentTargets;
  }
}
