import { expect, test } from 'vitest';
import { Guest } from 'patron-oop';
import { HtmlTemplate } from './HtmlTemplate';
import baseHtmlTemplate from './baseHtmlTemplate';

test('HtmlTemplate.jsonToHtml.test', () => {
  const htmlTemplate = new HtmlTemplate(baseHtmlTemplate);

  htmlTemplate.jsonToHtml('{"json": "hello"}', new Guest((html) => {
    expect(html).toContain("window.content = '{\"json\": \"hello\"}';");
  }));
});
