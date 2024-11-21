import { GuestCast, GuestObjectType } from 'patron-oop';
import { FileSystemContent } from 'patron-scheme-editor';

export class FSHtmlContent {
  public constructor(
    private fsContent: FileSystemContent,
  ) { }

  public content(target: GuestObjectType<string>): this {
    this.fsContent.content(new GuestCast(target, (value) => {
      console.log('val', value);

      target.give(value);
    }));
    return this;
  }

  public give(value: string): this {
    this.fsContent.give(value);
    return this;
  }

  public canBeUsed(guest: GuestObjectType<boolean>) {
    this.fsContent.canBeUsed(guest);
    return guest;
  }
}
