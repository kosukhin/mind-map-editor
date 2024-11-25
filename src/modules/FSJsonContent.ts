import baseJsonTemplate from '@/modules/json/baseJsonTemplate';
import debug from 'debug';
import {
  GuestCast, GuestChain, GuestObjectType,
} from 'patron-oop';
import { BrowserLaunchQueue, FileSystemContent } from 'patron-scheme-editor';

const localDebug = debug('FSJsonContent');

export class FSJsonContent {
  public constructor(
    private fsContent: FileSystemContent,
    private launchQueue: BrowserLaunchQueue,
  ) { }

  public content(target: GuestObjectType<string>): this {
    this.fsContent.content(new GuestCast(target, (value) => {
      if (!value) {
        target.give(baseJsonTemplate);
      } else {
        target.give(value);
      }
    }));
    return this;
  }

  public give(value: string): this {
    this.fsContent.give(value);
    return this;
  }

  public canBeUsed(guest: GuestObjectType<boolean>) {
    localDebug('check canbe used');
    const chain = new GuestChain<{fileHandler: FileSystemFileHandle, canBeUsed: boolean}>();
    this.launchQueue.fileHandler(new GuestCast(guest, chain.receiveKey('fileHandler')));
    this.fsContent.canBeUsed(new GuestCast(guest, chain.receiveKey('canBeUsed')));
    chain.result(({ fileHandler, canBeUsed }) => {
      const isJSON = fileHandler.name.indexOf('.json') > 0;
      localDebug('isJSON', isJSON);
      guest.give(canBeUsed && isJSON);
    });
    return guest;
  }
}
