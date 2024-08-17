import { Target } from '@/modules/system/target/Target';

export class BrowserLaunchQueue {
  fileHandler(target: Target<FileSystemFileHandle>) {
    if ('launchQueue' in window) {
      (window as any).launchQueue.setConsumer((launchParams: any) => {
        if (launchParams.files && launchParams.files.length) {
          const [file] = launchParams.files;
          target.receive(file);
        }
      });
    }

    return this;
  }
}
