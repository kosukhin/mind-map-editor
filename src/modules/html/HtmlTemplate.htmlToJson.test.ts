import { expect, test } from 'vitest';
import { Guest } from 'patron-oop';
import { HtmlTemplate } from './HtmlTemplate';
import baseHtmlTemplate from './baseHtmlTemplate';

test('HtmlTemplate.htmlToJson.test', () => {
  const htmlTemplate = new HtmlTemplate(baseHtmlTemplate);

  htmlTemplate.htmlToJson(baseHtmlTemplate, new Guest((html) => {
    expect(html).toBe('{"current":{"progress":0,"settings":{"colored":false,"title":"current"},"objects":{},"types":{},"url":"/current","parent":""}}');
  }));
});
