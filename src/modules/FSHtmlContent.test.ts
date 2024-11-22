import { Guest, GuestObjectType } from 'patron-oop';
import { expect, test } from 'vitest';
import { FSHtmlContent } from './FSHtmlContent';

test('FSHtmlContent формат .html', () => {
  const htmlContent = new FSHtmlContent(
    {
      content(target: GuestObjectType<string>) {
        target.give('helo world');
        return this;
      },
      canBeUsed(guest: GuestObjectType<boolean>) {
        guest.give(true);
        return guest;
      },
    } as any,
    {
      fileHandler(guest: GuestObjectType<FileSystemFileHandle>) {
        guest.give({
          name: 'hello.html',
        } as any);
      },
    } as any,
  );

  htmlContent.canBeUsed(new Guest((value) => {
    expect(value).toBe(true);
  }));
});
