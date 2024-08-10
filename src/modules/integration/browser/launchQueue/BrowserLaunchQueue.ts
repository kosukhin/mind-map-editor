import { FileHandlerSource } from '@/modules/system/file/FileHandlerSource';
import { Result } from '@/modules/system/result/Result';
import { ResultOf } from '@/modules/system/result/ResultOf';

export class BrowserLaunchQueue implements FileHandlerSource {
  fileHandler(): Result<FileSystemFileHandle> {
    const result = new ResultOf<FileSystemFileHandle>(null);
    if ('launchQueue' in window) {
      (window as any).launchQueue.setConsumer((launchParams: any) => {
        if (launchParams.files && launchParams.files.length) {
          const [file] = launchParams.files;
          result.replace(new ResultOf<FileSystemFileHandle>(file));
        }
      });
    }

    return result;
  }
}
