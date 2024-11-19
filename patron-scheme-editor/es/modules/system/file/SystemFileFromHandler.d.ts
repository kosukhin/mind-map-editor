import { SystemFileType } from './SystemFileType';
import { GuestObjectType } from 'patron-oop';
export declare class SystemFileFromHandler implements SystemFileType {
    private fileHandler;
    constructor(fileHandler: FileSystemFileHandle);
    content(target: GuestObjectType<string>): this;
    private readFile;
}
