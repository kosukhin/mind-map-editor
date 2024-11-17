import { expect, test } from 'vitest';
import { Notification } from '@/modules/application/l1/l2/visualisation/notification/Notification';
import { Guest } from 'patron-oop';
import { useFactories } from '@/composables/useFactories';
import {
  NotificationDocument,
} from '@/modules/application/l1/l2/visualisation/notification/NotificationType';

test('notification', () => {
  const factories = useFactories();
  const notification = new Notification(factories);
  notification.receive({
    type: 'success',
    text: 'test',
  });
  notification.message(new Guest((value: NotificationDocument) => {
    expect(value.text).toBe('test');
  }));
  // Ожидаем сброс сообщения через 100мс
  setTimeout(() => {
    notification.message(new Guest((value: NotificationDocument) => {
      expect(value.text).toBe('hide');
    }));
  }, 150);
});
