import { MapSettingsDocument } from '@/modules/entities/MapStructures';

export interface MapSettings {
  content(): MapSettingsDocument
  save(value: MapSettingsDocument): this;
}
