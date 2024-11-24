import { Guest, GuestObjectType } from 'patron-oop';
import { expect, test } from 'vitest';
import { HtmlTemplate } from '@/modules/html/HtmlTemplate';
import baseHtmlTemplate from '@/modules/html/baseHtmlTemplate';
import { FSHtmlContent } from './FSHtmlContent';

test('FSHtmlContent.notCanBeUsed', () => {
  const htmlTemplate = new HtmlTemplate(baseHtmlTemplate);
  const htmlContent = new FSHtmlContent(
    {
      content(target: GuestObjectType<string>) {
        target.give('helo world');
        return this;
      },
      canBeUsed(guest: GuestObjectType<boolean>) {
        guest.give(false);
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
    htmlTemplate,
  );

  htmlContent.canBeUsed(new Guest((value) => {
    expect(value).toBe(false);
  }));
});
