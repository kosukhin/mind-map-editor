import { Transformed } from './Transformed';
export declare class TransformedToJSON<From> implements Transformed<string> {
    private content;
    constructor(content: From);
    result(): string;
}
