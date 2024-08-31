import { GuestType } from '../../../system/guest/GuestType';

export class BrowserLaunchQueue {
  fileHandler(guest: GuestType<FileSystemFileHandle>) {
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
