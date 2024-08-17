import { Guest } from '@/modules/system/guest/Guest';

export class BrowserLaunchQueue {
  fileHandler(guest: Guest<FileSystemFileHandle>) {
    if ('launchQueue' in window) {
      (window as any).launchQueue.setConsumer((launchParams: any) => {
        if (launchParams.files && launchParams.files.length) {
          const [fileHandler] = launchParams.files;
          guest.receive(fileHandler);
        }
      });
    }

    return this;
  }
}
