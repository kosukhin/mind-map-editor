import { expect, test } from 'vitest';
import { MapFileContentFS } from '@/modules/application/mapFileContent/MapFIleContentFS';
import {
  BrowserLaunchQueueFake,
} from '@/modules/integration/browser/launchQueue/BrowserLaunchQueueFake';
import { Notification } from '@/modules/application/notification/Notification';
import { BrowserFileFake } from '@/modules/integration/browser/file/BrowserFileFake';
import { Guest } from '@/modules/system/guest/Guest';
import { Patron } from '@/modules/system/guest/Patron';
import { Factory } from '../../system/guest/Factory';
import { SystemFileText } from '../../system/file/SystemFileText';

test('map file content fs', () => {
  const systemFileTextFactory = new Factory(() => new SystemFileText('hello world!'));
  const browserFileFakeFactory = new Factory(() => new BrowserFileFake());
  const queue = new BrowserLaunchQueueFake();
  const notification = new Notification();
  const mapFileContent = new MapFileContentFS(
    queue,
    notification,
    systemFileTextFactory,
    browserFileFakeFactory,
  );

  mapFileContent.content(new Patron(new Guest((value) => {
    expect(value).toBe('hello world!');
  })));

  mapFileContent.receive('new content!');
});
