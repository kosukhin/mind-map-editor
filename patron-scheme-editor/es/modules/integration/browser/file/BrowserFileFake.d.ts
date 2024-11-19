import { BrowserFileType } from './BrowserFileType';
import { GuestAwareType, GuestObjectType } from 'patron-oop';
export declare class BrowserFileFake implements BrowserFileType, GuestAwareType<string> {
    private theContent;
    constructor(theContent?: string);
    save(content: string): this;
    value(guest: GuestObjectType<string>): this;
}
