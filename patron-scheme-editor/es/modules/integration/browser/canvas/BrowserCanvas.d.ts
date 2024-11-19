import { SizeDocument } from './SizeDocument';
import { GuestObjectType, SourceType, FactoryType } from 'patron-oop';
import { BrowserCanvasType } from './BrowserCanvasType';
export declare class BrowserCanvas implements BrowserCanvasType {
    private factories;
    private canvasCache;
    constructor(factories: {
        sourceEmpty: FactoryType<SourceType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    canvas(guest: GuestObjectType<HTMLElement>): this;
    size(guest: GuestObjectType<SizeDocument>): this;
    give(value: HTMLElement): this;
}
