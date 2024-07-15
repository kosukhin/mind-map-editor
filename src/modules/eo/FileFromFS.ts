import { BrowserLaunchQueue } from '@/modules/eo/BrowserLaunchQueue';
import { TruthyAsyncOptional } from '@/modules/eo/TruthyAsyncOptional';

export class FileFromFS {
  constructor(private launchQueue: BrowserLaunchQueue) {}

  public fileHandler(): TruthyAsyncOptional<FileSystemFileHandle | null> {
    return this.launchQueue.launchParams().chainFilled((launchParams) => launchParams.files[0] ?? null);
  }
}
