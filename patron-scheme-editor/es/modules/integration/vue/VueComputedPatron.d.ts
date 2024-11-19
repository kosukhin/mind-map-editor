import { Ref } from 'vue';
export declare class VueComputedPatron<T> {
    private executor;
    private readonly innerRef;
    constructor(executor: (theRef: Ref<T>) => void, defaultValue?: T | undefined);
    ref<CT = undefined>(): Ref<CT extends undefined ? T : CT>;
}
