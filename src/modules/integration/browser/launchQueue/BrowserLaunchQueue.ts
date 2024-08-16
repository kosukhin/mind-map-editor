import { FileHandlerSource } from '@/modules/system/file/FileHandlerSource';
import { ResultObservableOf } from '@/modules/system/result/ResultObservableOf';

export class BrowserLaunchQueue implements FileHandlerSource {
  fileHandler() {
    const result = new ResultObservableOf<FileSystemFileHandle>(null);
    if ('launchQueue' in window) {
      (window as any).launchQueue.setConsumer((launchParams: any) => {
        if (launchParams.files && launchParams.files.length) {
          const [file] = launchParams.files;
          result.replaceResult(file);
        }
      });
    }

    return result;
  }
}
