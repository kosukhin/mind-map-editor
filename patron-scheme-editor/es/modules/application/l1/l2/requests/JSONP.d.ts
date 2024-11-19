import { GuestObjectType, FactoryType, SourceType } from 'patron-oop';
import { JSONPType } from './JSONPType';
export declare class JSONP implements JSONPType {
    private callbackName;
    private url;
    private emptyValue;
    private factories;
    private loadingCache;
    constructor(callbackName: string, url: string, emptyValue: unknown, factories: {
        guest: FactoryType<GuestObjectType>;
        sourceEmpty: FactoryType<SourceType>;
    });
    content<R extends GuestObjectType>(guest: R): R;
    loading<R extends GuestObjectType<boolean>>(guest: R): R;
}
