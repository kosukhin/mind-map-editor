import { TruthyOptional } from '@/modules/eo/TruthyOptional';

declare const window: any;

export class BrowserFsFile {
  public fileHandler(): Promise<TruthyOptional<FileSystemFileHandle | null>> {
    return new Promise((resolve) => {
      if ('launchQueue' in window) {
        window.launchQueue.setConsumer((launchParams: any) => {
          if (launchParams.files && launchParams.files.length) {
            const [file] = launchParams.files;
            resolve(new TruthyOptional(file));
          } else {
            resolve(new TruthyOptional(null));
          }
        });
      } else {
        resolve(new TruthyOptional(null));
      }
    });
  }
}
