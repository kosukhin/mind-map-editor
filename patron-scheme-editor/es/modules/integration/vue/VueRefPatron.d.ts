import { GuestObjectType } from 'patron-oop';
import { Ref } from 'vue';
export declare class VueRefPatron<T> implements GuestObjectType<T> {
    private readonly innerRef;
    constructor(defaultValue?: T | undefined);
    ref<CT = undefined>(): Ref<CT extends undefined ? T : CT>;
    give(value: T): this;
    introduction(): "patron";
}
