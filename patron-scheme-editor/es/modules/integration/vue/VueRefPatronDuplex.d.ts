import { VueRefPatron } from './VueRefPatron';
import { GuestObjectType } from 'patron-oop';
export declare class VueRefPatronDuplex<T> implements GuestObjectType<T> {
    private basePatron;
    private guest;
    private refWatcherCreated;
    constructor(basePatron: VueRefPatron<T>, guest: GuestObjectType<T>, refWatcherCreated?: boolean);
    ref(): import('vue').Ref<T, T>;
    introduction(): "patron";
    give(value: T): this;
}
