import { FactoryType, SourceType, GuestObjectType } from 'patron-oop';
type FnType = () => void;
export declare class Zindex implements GuestObjectType<FnType> {
    private factories;
    private fnsCache;
    constructor(factories: {
        cache: FactoryType<SourceType>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
    });
    give(value: () => void): this;
}
export {};
