import { MapTypeStructure } from '@/entities/MapStructures';
import { PointStructure } from '@/entities/PointStructure';

export interface CanvasArrowStructure {
  fromPoint: PointStructure,
  toPoint: PointStructure,
  label: string,
  beginMapType?: MapTypeStructure,
  endMapType?: MapTypeStructure,
}
