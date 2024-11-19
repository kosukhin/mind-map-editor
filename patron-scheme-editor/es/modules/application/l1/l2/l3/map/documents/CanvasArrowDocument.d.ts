import { MapTypeDocument } from './MapStructures';
import { PointDocument } from './PointDocument';
/**
 * Данные стрелки связи между объектами
 */
export interface CanvasArrowDocument {
    fromPoint: PointDocument;
    toPoint: PointDocument;
    label: string;
    beginMapType?: MapTypeDocument;
    endMapType?: MapTypeDocument;
}
