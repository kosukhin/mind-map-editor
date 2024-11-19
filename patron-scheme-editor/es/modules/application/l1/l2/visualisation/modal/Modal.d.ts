import { Keyboard } from '../../../../../integration/browser/keyboard/Keyboard';
import { FactoryType, GuestAwareType, GuestObjectType, SourceType } from 'patron-oop';
export declare class Modal implements GuestObjectType<string> {
    private keyboard;
    private factories;
    private modalNameCache;
    constructor(keyboard: Keyboard, factories: {
        cache: FactoryType<SourceType>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        guestAware: FactoryType<GuestAwareType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    isOpenedByName<R extends GuestObjectType<boolean>>(name: string, guest: R): R;
    openedByName(name: string): GuestAwareType<boolean>;
    give(value: string): this;
}
