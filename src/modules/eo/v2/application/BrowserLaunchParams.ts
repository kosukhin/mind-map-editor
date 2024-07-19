import { Optional } from '@/modules/eo/targets/system/Optional';
import { Valueable } from '@/modules/eo/targets/system/Valueable';
import { OptionalAsync } from '@/modules/eo/v2/system/OptionalAsync';

export type LaunchParams = {
  files: FileSystemFileHandle[]
}

declare const window: {
  launchQueue: {
    setConsumer: (cb: (launchParams: LaunchParams) => void) => void
  }
};

export class BrowserLaunchParams implements Valueable<Optional<LaunchParams>> {
  public value(): Optional<LaunchParams> {
    return new OptionalAsync(new Promise((resolve) => {
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
