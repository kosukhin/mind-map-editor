import { TextType } from '../types/text/TextType';
import { GuestObjectType } from 'patron-oop';
export declare class TextOf implements TextType {
    private text;
    constructor(text: string);
    asString(guest: GuestObjectType<string>): GuestObjectType;
}
