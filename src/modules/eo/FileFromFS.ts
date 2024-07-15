import { BrowserLaunchQueue } from '@/modules/eo/BrowserLaunchQueue';
import { Optional } from '@/modules/eo/Optional';

export class FileFromFS {
  constructor(private launchQueue: BrowserLaunchQueue) {}

  public fileHandler(): Optional<FileSystemFileHandle | null> {
    return this.launchQueue.launchParams().chainFilled((launchParams) => launchParams.files[0] ?? null);
  }
}
