import { Guest, GuestAwareType } from 'patron-oop';
import { Ref } from 'vue';
export declare class VueSource<T> implements GuestAwareType<T> {
    private refSource;
    private pool;
    constructor(refSource: Ref<T | undefined>);
    value(guest: Guest<T>): this;
}
