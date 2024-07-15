import { TruthyAsyncOptional } from '@/modules/eo/TruthyAsyncOptional';

type LaunchParams = {
  files: FileSystemFileHandle[]
}

declare const window: {
  launchQueue: {
    setConsumer: (cb: (launchParams: LaunchParams) => void) => void
  }
};

export class BrowserLaunchQueue {
  launchParams(): TruthyAsyncOptional<LaunchParams | null> {
    return new TruthyAsyncOptional(new Promise((resolve) => {
      if ('launchQueue' in window) {
        window.launchQueue.setConsumer((launchParams: LaunchParams) => {
          if (launchParams.files && launchParams.files.length) {
            resolve(launchParams);
          } else {
            resolve(null);
          }
        });
      } else {
        resolve(null);
      }
    }));
  }
}
