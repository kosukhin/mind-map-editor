import { FactoryType, PoolType, GuestObjectType } from 'patron-oop';
export declare class Keyboard {
    private pressedPool;
    private combinationsPool;
    constructor(factories: {
        pool: FactoryType<PoolType>;
    });
    pressed(guest: GuestObjectType<string>): this;
    event(guest: GuestObjectType<KeyboardEvent>): this;
}
