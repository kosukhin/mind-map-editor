import { expect, test } from 'vitest';
import {
  LaunchParamsType,
  LaunchQueueType,
} from '@/modules/integration/browser/launchQueue/LaunchQueueType';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { Guest } from '@/modules/system/guest/Guest';

test('browser launch queue', () => {
  const launchQueueStub: LaunchQueueType = {
    setConsumer(launchParams: (params: LaunchParamsType) => void) {
      launchParams({
        files: [{ fileHandlerStub: true } as unknown as FileSystemFileHandle],
      });
    },
  };

  const queue = new BrowserLaunchQueue(launchQueueStub, true);

  queue.fileHandler(new Guest((value) => {
    expect((value as any).fileHandlerStub).toBe(true);
  }));
});
