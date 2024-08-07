import { MapTypeStructure } from '@/modules/entities/MapStructures';
import { PointStructure } from '@/modules/entities/PointStructure';

export interface CanvasArrowStructure {
  fromPoint: PointStructure,
  toPoint: PointStructure,
  label: string,
  beginMapType?: MapTypeStructure,
  endMapType?: MapTypeStructure,
}
