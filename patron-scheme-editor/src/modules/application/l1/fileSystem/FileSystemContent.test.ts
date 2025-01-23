import { expect, test } from 'vitest';
import { FileSystemContent } from '@/modules/application/l1/fileSystem/FileSystemContent';
import { BrowserLaunchQueueFake } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueueFake';
import { Notification } from '@/modules/application/l1/l2/visualisation/notification/Notification';
import { Guest, Patron, Factory, Module } from 'patron-oop';
import { useFactories } from '@/composables/useFactories';
import { BrowserFileFake } from '@/modules/integration/browser/file/BrowserFileFake';
import { SystemFileText } from '@/modules/system/file/SystemFileText';

test('map file content fs', () => {
  const factories = useFactories();

  const systemFileTextFactory = new Module(() => new SystemFileText('hello world!'));
  const browserFileFakeFactory = new Factory(BrowserFileFake);

  const queue = new BrowserLaunchQueueFake();
  const notification = new Notification(factories);
  const mapFileContent = new FileSystemContent(queue, notification, {
    ...factories,
    fileHandlerContent: systemFileTextFactory,
    browserFileSaved: browserFileFakeFactory,
  });

  const matches: Record<string, number> = {
    'hello world!': 0,
    'new content!': 0,
  };

  mapFileContent.content(
    new Patron(
      new Guest((value: string) => {
        matches[value] += 1;
      }),
    ),
  );

  mapFileContent.give('new content!');

  queueMicrotask(() => {
    expect(Object.values(matches).join()).toBe('1,1');
  });
});
