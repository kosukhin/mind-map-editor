import { MapTypeDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

export interface EditorSettings {
  readonly: boolean;
  presets: Record<string, MapTypeDocument[]>;
}
