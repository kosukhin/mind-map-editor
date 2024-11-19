import { SvgImageType } from './SvgImageType';
/**
 * Объект для обработки разметки svg
 */
export declare class SvgImage implements SvgImageType {
    private svgContent;
    private width;
    private height;
    constructor(svgContent: string, width?: number, height?: number);
    markup(): string;
}
