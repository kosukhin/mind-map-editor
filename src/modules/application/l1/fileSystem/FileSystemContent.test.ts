import { expect, test } from 'vitest';
import { FileSystemContent } from '@/modules/application/l1/fileSystem/FileSystemContent';
import {
  BrowserLaunchQueueFake,
} from '@/modules/integration/browser/launchQueue/BrowserLaunchQueueFake';
import { Notification } from '@/modules/application/l1/l2/visualisation/notification/Notification';
import { BrowserFileFake } from '@/modules/integration/browser/file/BrowserFileFake';
import { Guest } from '@/modules/system/guest/Guest';
import { Patron } from '@/modules/system/guest/Patron';
import { Instance } from '@/modules/system/guest/Instance';
import { SystemFileText } from '@/modules/system/file/SystemFileText';
import { Cache } from '@/modules/system/guest/Cache';

test('map file content fs', () => {
  const systemFileTextFactory = new Instance(() => new SystemFileText('hello world!'));
  const browserFileFakeFactory = new Instance(() => new BrowserFileFake());
  const queue = new BrowserLaunchQueueFake();
  const cache = new Instance((initiator) => new Cache(initiator));
  const notification = new Notification(cache);
  const mapFileContent = new FileSystemContent(
    queue,
    notification,
    systemFileTextFactory,
    browserFileFakeFactory,
  );

  const matches: Record<string, number> = {
    'hello world!': 0,
    'new content!': 0,
  };

  mapFileContent.content(new Patron(new Guest((value: string) => {
    matches[value] += 1;
  })));

  mapFileContent.receive('new content!');

  queueMicrotask(() => {
    expect(Object.values(matches).join()).toBe('1,1');
  });
});
