import { GuestObjectType, GuestAwareType, FactoryType } from 'patron-oop';
export declare class NumberChunks {
    private chunksCount;
    private baseNumber;
    private factories;
    constructor(chunksCount: number, baseNumber: GuestAwareType<number>, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    chunks<R extends GuestObjectType<number[]>>(guest: R): R;
}
