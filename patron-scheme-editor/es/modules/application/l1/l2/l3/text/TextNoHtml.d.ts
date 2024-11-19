import { GuestObjectType, GuestAwareType, FactoryType } from 'patron-oop';
export declare class TextNoHtml {
    private text;
    private factories;
    constructor(text: GuestAwareType<string>, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    noHtml(guest: GuestObjectType<string>): GuestObjectType<string>;
}
