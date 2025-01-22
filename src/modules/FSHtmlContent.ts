import { HtmlTemplate } from '@/modules/html/HtmlTemplate';
import baseHtmlTemplate from '@/modules/html/baseHtmlTemplate';
import debug from 'debug';
import {
  GuestAwareAll,
  GuestCast,
  GuestObjectType,
} from 'patron-oop';
import { BrowserLaunchQueue, FileSystemContent } from 'patron-scheme-editor';

const localDebug = debug('FSHtmlContent');

export class FSHtmlContent {
  public constructor(
    private fsContent: FileSystemContent,
    private launchQueue: BrowserLaunchQueue,
    private htmlTemplate: HtmlTemplate,
  ) { }

  // html comes - convert it to json
  public content(target: GuestObjectType<string>): this {
    this.fsContent.content(new GuestCast(target, (html) => {
      if (!html) {
        target.give(baseHtmlTemplate);
      } else {
        this.htmlTemplate.htmlToJson(html, target);
      }
    }));
    return this;
  }

  // json comes - convert it to html
  public give(json: string): this {
    this.htmlTemplate.jsonToHtml(json, this.fsContent);
    return this;
  }

  public canBeUsed(guest: GuestObjectType<boolean>) {
    localDebug('check canbe used');
    const chain = new GuestAwareAll<{ fileHandler: FileSystemFileHandle, canBeUsed: boolean }>();
    this.launchQueue.fileHandler(new GuestCast(guest, chain.guestKey('fileHandler')));
    this.fsContent.canBeUsed(new GuestCast(guest, chain.guestKey('canBeUsed')));
    chain.value(({ fileHandler, canBeUsed }) => {
      const isHTML = fileHandler.name.indexOf('.html') > 0;
      localDebug('isHTML', isHTML, canBeUsed);
      guest.give(canBeUsed && isHTML);
    });
    return guest;
  }
}
