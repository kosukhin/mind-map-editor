import { MapFileContentType } from './MapFileContentType';
import { GuestObjectType, FactoryType } from 'patron-oop';
export declare class FirstPossibleFileContent implements MapFileContentType {
    private firstPossibleFileContent;
    constructor(fileContents: MapFileContentType[], factories: {
        guest: FactoryType<GuestObjectType>;
    });
    canBeUsed<R extends GuestObjectType<boolean>>(guest: R): R;
    content(target: GuestObjectType<string>): this;
    give(value: string): this;
}
