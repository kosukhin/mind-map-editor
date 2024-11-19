import { BrowserFileType } from './BrowserFileType';
export declare class BrowserFileSaved implements BrowserFileType {
    private fileHandler;
    constructor(fileHandler: FileSystemFileHandle);
    save(content: string): this;
}
