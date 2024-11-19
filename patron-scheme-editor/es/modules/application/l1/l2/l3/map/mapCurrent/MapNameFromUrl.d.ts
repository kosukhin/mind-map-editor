import { GuestAwareType, GuestObjectType, FactoryType } from 'patron-oop';
export declare class MapNameFromUrl {
    private mapUrl;
    private factories;
    constructor(mapUrl: GuestAwareType<string>, factories: {
        guest: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    name(guest: GuestObjectType<string>): void;
}
