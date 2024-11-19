import { GuestObjectType } from 'patron-oop';
export declare class FakeSource implements GuestObjectType<any> {
    private value;
    private pool;
    constructor(value: any);
    data(guest: GuestObjectType<any>): this;
    give(value: any): this;
}
