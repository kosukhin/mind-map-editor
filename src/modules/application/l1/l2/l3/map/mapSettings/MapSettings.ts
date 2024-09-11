import { MapSettingsDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

export interface MapSettings {
  content(): MapSettingsDocument
  save(value: MapSettingsDocument): this;
}
