import { MapTypeStructure } from '@/objects/entities/MapStructures';
import { PointStructure } from '@/objects/entities/PointStructure';

export interface CanvasArrowStructure {
  fromPoint: PointStructure,
  toPoint: PointStructure,
  label: string,
  beginMapType?: MapTypeStructure,
  endMapType?: MapTypeStructure,
}
