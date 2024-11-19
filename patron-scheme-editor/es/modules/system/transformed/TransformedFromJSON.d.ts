import { Transformed } from './Transformed';
export declare class TransformedFromJSON<To> implements Transformed<To> {
    private content;
    constructor(content: string);
    result(): To;
}
