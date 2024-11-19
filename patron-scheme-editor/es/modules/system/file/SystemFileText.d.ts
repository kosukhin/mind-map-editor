import { SystemFileType } from './SystemFileType';
import { GuestObjectType } from 'patron-oop';
export declare class SystemFileText implements SystemFileType {
    private text;
    constructor(text: string);
    content(target: GuestObjectType<string>): this;
}
