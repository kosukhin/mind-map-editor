import { TextType } from '../types/text/TextType';
import { GuestObjectType, FactoryType } from 'patron-oop';
export declare class TextWithoutHTML implements TextType {
    private baseText;
    private factories;
    constructor(baseText: TextType, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    asString(guest: GuestObjectType<string>): GuestObjectType;
}
