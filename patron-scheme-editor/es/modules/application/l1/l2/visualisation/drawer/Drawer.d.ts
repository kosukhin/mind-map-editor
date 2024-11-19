import { GuestObjectType, FactoryType, SourceType, GuestAwareType } from 'patron-oop';
import { Keyboard } from '../../../../../integration/browser/keyboard/Keyboard';
export declare class Drawer implements GuestObjectType<string> {
    private keyboard;
    private factories;
    private drawerNameCache;
    constructor(keyboard: Keyboard, factories: {
        cache: FactoryType<SourceType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        guestAware: FactoryType<GuestAwareType>;
    });
    isOpenedByName<R extends GuestObjectType<boolean>>(name: string, guest: R): R;
    openedByName(name: string): GuestAwareType<boolean>;
    give(value: string): this;
}
