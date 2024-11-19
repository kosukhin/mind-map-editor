import { SvgImageType } from './SvgImageType';
import { MapTypeDocument } from '../../l3/map/documents/MapStructures';
import { FactoryType } from 'patron-oop';
/**
 * Объект для обработки изображения типа карты
 */
export declare class SvgMapTypeImage implements SvgImageType {
    private type;
    private factories;
    constructor(type: MapTypeDocument, factories: {
        svgImage: FactoryType<SvgImageType>;
    });
    markup(): string;
}
