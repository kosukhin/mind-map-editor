import { TextType } from '../types/text/TextType';
import { GuestObjectType, Factory } from 'patron-oop';
export declare class TextNlAsBr implements TextType {
    private baseText;
    private factories;
    constructor(baseText: TextType, factories: {
        guestInTheMiddle: Factory<GuestObjectType>;
    });
    asString(guest: GuestObjectType<string>): GuestObjectType;
}
